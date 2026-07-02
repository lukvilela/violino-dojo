// Detecção de altura pelo microfone (modo "tocar de verdade"), usando a lib pitchy
// (McLeod Pitch Method). Roda um loop de rAF e reporta frequência + clareza.

import { PitchDetector } from "pitchy";

export interface PitchReading {
  freq: number;
  clarity: number;
}

export class PitchMic {
  private ctx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private raf = 0;
  private running = false;

  async start(onReading: (r: PitchReading) => void): Promise<void> {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AC();
    this.stream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
    });
    const source = this.ctx.createMediaStreamSource(this.stream);
    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    const detector = PitchDetector.forFloat32Array(analyser.fftSize);
    const input = new Float32Array(detector.inputLength);
    this.running = true;

    const tick = () => {
      if (!this.running || !this.ctx) return;
      analyser.getFloatTimeDomainData(input);
      const [freq, clarity] = detector.findPitch(input, this.ctx.sampleRate);
      onReading({ freq, clarity });
      this.raf = requestAnimationFrame(tick);
    };
    tick();
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.stream?.getTracks().forEach((t) => t.stop());
    void this.ctx?.close();
    this.ctx = null;
    this.stream = null;
  }
}
