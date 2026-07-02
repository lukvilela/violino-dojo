// Motor de áudio: usa amostras REAIS de violino/viola/cello (smplr + soundfonts do
// Gleitzman, sem hospedar nada). Se falhar (offline), cai no sintetizador do synth.ts.

import { playMidi as synthPlay } from "./synth";

// nosso id de instrumento -> nome GM do soundfont
const GM: Record<string, string> = { violin: "violin", viola: "viola", cello: "cello" };

export type SamplerStatus = "idle" | "loading" | "ready" | "error";

interface Entry {
  // instância do smplr (tipada como unknown; API: start/stop/ready/output.volume)
  inst: { start: (o: { note: number; duration?: number; velocity?: number }) => void; output: { volume: number } } | null;
  status: SamplerStatus;
}

let ctx: AudioContext | null = null;
const cache = new Map<string, Entry>();
const listeners = new Map<string, Set<(s: SamplerStatus) => void>>();

function gmName(instrumentId: string): string {
  return GM[instrumentId] ?? "violin";
}

function ac(): AudioContext {
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AC();
  }
  return ctx;
}

/** Retoma o contexto — chamar dentro de um gesto do usuário (clique). */
export function resumeAudio(): void {
  if (ctx?.state === "suspended") void ctx.resume();
}

function emit(gm: string, s: SamplerStatus): void {
  listeners.get(gm)?.forEach((cb) => cb(s));
}

export function samplerStatus(instrumentId: string): SamplerStatus {
  return cache.get(gmName(instrumentId))?.status ?? "idle";
}

export function subscribe(instrumentId: string, cb: (s: SamplerStatus) => void): () => void {
  const gm = gmName(instrumentId);
  if (!listeners.has(gm)) listeners.set(gm, new Set());
  listeners.get(gm)!.add(cb);
  cb(samplerStatus(instrumentId)); // estado atual imediato
  return () => listeners.get(gm)?.delete(cb);
}

/** Baixa as amostras do instrumento (idempotente). Não precisa de gesto do usuário. */
export function preload(instrumentId: string): void {
  const gm = gmName(instrumentId);
  if (cache.has(gm)) return;
  const entry: Entry = { inst: null, status: "loading" };
  cache.set(gm, entry);
  emit(gm, "loading");

  // import dinâmico -> smplr só roda no cliente, nunca no SSR
  import("smplr")
    .then(({ Soundfont }) => {
      const inst = Soundfont(ac(), { instrument: gm }) as unknown as Entry["inst"];
      entry.inst = inst;
      const anyInst = inst as unknown as { ready: Promise<unknown> };
      anyInst.ready
        .then(() => {
          entry.status = "ready";
          emit(gm, "ready");
        })
        .catch(() => {
          entry.status = "error";
          emit(gm, "error");
        });
    })
    .catch(() => {
      entry.status = "error";
      emit(gm, "error");
    });
}

/** Toca uma nota (MIDI) com timbre real; cai no sintetizador se as amostras não estiverem prontas. */
export function playNote(instrumentId: string, midi: number, duration = 1.5): void {
  resumeAudio();
  const gm = gmName(instrumentId);
  const entry = cache.get(gm);
  if (entry?.status === "ready" && entry.inst) {
    entry.inst.start({ note: midi, duration });
    return;
  }
  if (!entry) preload(instrumentId);
  synthPlay(midi, Math.min(duration, 1.1)); // fallback imediato
}

/** Arpejo curto de acerto (tônica-terça-quinta) com o som do instrumento. */
export function playArpeggio(instrumentId: string, root: number): void {
  [0, 4, 7].forEach((iv, i) => setTimeout(() => playNote(instrumentId, root + iv, 0.6), i * 130));
}
