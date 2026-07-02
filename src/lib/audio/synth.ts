// Síntese simples pra tocar uma nota (modo treino de ouvido). Timbre "cordas" leve:
// duas ondas (triângulo + serra suave) com um envelope de ataque/decay curto.

import { midiToFreq } from "../music/notes";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function playMidi(midi: number, duration = 1.1): void {
  const ac = getCtx();
  const now = ac.currentTime;
  const freq = midiToFreq(midi);

  const master = ac.createGain();
  master.connect(ac.destination);
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.28, now + 0.04);
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  // Leve vibrato pra soar mais "de cordas".
  const vibrato = ac.createOscillator();
  const vibGain = ac.createGain();
  vibrato.frequency.value = 5;
  vibGain.gain.value = freq * 0.006;
  vibrato.connect(vibGain);

  (["triangle", "sawtooth"] as OscillatorType[]).forEach((type, i) => {
    const osc = ac.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    const g = ac.createGain();
    g.gain.value = i === 0 ? 0.8 : 0.18;
    vibGain.connect(osc.frequency);
    osc.connect(g);
    g.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.05);
  });

  vibrato.start(now);
  vibrato.stop(now + duration + 0.05);
}

/** Toca uma sequência ascendente/qualquer (arpejo de acerto etc). */
export function playSequence(midis: number[], gap = 0.12): void {
  midis.forEach((m, i) => {
    setTimeout(() => playMidi(m, 0.35), i * gap * 1000);
  });
}
