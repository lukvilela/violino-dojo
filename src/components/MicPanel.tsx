"use client";

// Painel do modo microfone: escuta o instrumento e vira "afinador" que valida a nota-alvo.

import { useEffect, useRef, useState } from "react";
import { PitchMic } from "@/lib/audio/pitch";
import { freqToMidi, shortName, Naming } from "@/lib/music/notes";

interface Reading {
  note: string;
  cents: number;
  clarity: number;
  inTune: boolean;
}

const HOLD_FRAMES = 8;
const CENTS_TOL = 35;

export default function MicPanel({ targetMidi, naming, onCorrect }: { targetMidi: number; naming: Naming; onCorrect: () => void }) {
  const [status, setStatus] = useState<"idle" | "listening" | "error">("idle");
  const [reading, setReading] = useState<Reading | null>(null);
  const micRef = useRef<PitchMic | null>(null);
  const holdRef = useRef(0);
  const doneRef = useRef(false);
  const targetRef = useRef(targetMidi);
  const onCorrectRef = useRef(onCorrect);
  targetRef.current = targetMidi;
  onCorrectRef.current = onCorrect;

  useEffect(() => {
    holdRef.current = 0;
    doneRef.current = false;
    setReading(null);
  }, [targetMidi]);

  useEffect(() => {
    const mic = new PitchMic();
    micRef.current = mic;
    mic
      .start(({ freq, clarity }) => {
        if (clarity < 0.85 || freq < 100 || freq > 2600) {
          holdRef.current = 0;
          setReading((r) => (r ? { ...r, clarity } : null));
          return;
        }
        const detected = freqToMidi(freq);
        const nearest = Math.round(detected);
        const cents = (detected - nearest) * 100;
        const pcMatch = (((nearest - targetRef.current) % 12) + 12) % 12 === 0;
        const inTune = pcMatch && Math.abs(cents) < CENTS_TOL;
        setReading({ note: shortName(nearest, naming), cents, clarity, inTune });

        if (inTune) {
          holdRef.current += 1;
          if (holdRef.current >= HOLD_FRAMES && !doneRef.current) {
            doneRef.current = true;
            onCorrectRef.current();
          }
        } else {
          holdRef.current = 0;
        }
      })
      .then(() => setStatus("listening"))
      .catch(() => setStatus("error"));

    return () => mic.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === "error") {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
        Não consegui acessar o microfone. Verifique a permissão do navegador e recarregue.
      </div>
    );
  }

  const cents = reading?.cents ?? 0;
  const needle = Math.max(-50, Math.min(50, cents));

  return (
    <div className="card p-6">
      <div className="mb-2 text-center text-sm text-muted">{status === "listening" ? "ouvindo… toque a nota" : "iniciando microfone…"}</div>

      <div className="mb-4 text-center">
        <span className={`font-display text-5xl ${reading?.inTune ? "text-emerald-600" : reading ? "text-ink" : "text-faint"}`}>{reading?.note ?? "—"}</span>
      </div>

      <div className="relative mx-auto h-8 w-full max-w-sm rounded-full bg-line">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-faint/60" />
        <div
          className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full shadow transition-all duration-75 ${reading?.inTune ? "bg-emerald-500" : "bg-accent"}`}
          style={{ left: `calc(50% + ${needle}%)` }}
        />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-faint">
        <span>♭ grave</span>
        <span>{reading ? `${cents > 0 ? "+" : ""}${Math.round(cents)} cents` : ""}</span>
        <span>agudo ♯</span>
      </div>
    </div>
  );
}
