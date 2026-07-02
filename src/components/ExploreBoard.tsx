"use client";

// Modo livre de familiarização: clique em qualquer nota do braço e ouça o som REAL
// do instrumento. Sem pontuação — só ouvido, olho e memória de posição.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fingerboard from "./Fingerboard";
import SampleBanner from "./SampleBanner";
import { useApp } from "@/lib/store";
import { INSTRUMENTS, Cell, cellKey, getPosition } from "@/lib/music/instruments";
import { midiToName } from "@/lib/music/notes";
import { playNote } from "@/lib/audio/player";

export default function ExploreBoard() {
  const { settings } = useApp();
  const instrument = INSTRUMENTS[settings.instrumentId] ?? INSTRUMENTS.violin;
  const [positionId, setPositionId] = useState(instrument.positions[0].id);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [lastMidi, setLastMidi] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => setPositionId(instrument.positions[0].id), [instrument]);

  getPosition(instrument, positionId);

  const hit = (cell: Cell) => {
    playNote(settings.instrumentId, cell.midi, 1.6);
    setLastKey(cellKey(cell));
    setLastMidi(cell.midi);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setLastKey(null), 500);
  };

  const playOpenStrings = () => {
    instrument.strings.forEach((s, i) => setTimeout(() => playNote(settings.instrumentId, s.midi, 1), i * 550));
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <SampleBanner instrumentId={settings.instrumentId} />

      <div className="flex flex-wrap items-center justify-center gap-2">
        <div className="inline-flex overflow-hidden rounded-lg border border-line">
          {instrument.positions.map((p) => (
            <button key={p.id} onClick={() => setPositionId(p.id)} className={`seg ${positionId === p.id ? "seg-on" : ""}`}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={playOpenStrings} className="btn px-3 py-1.5 text-sm">
          ▶ Cordas soltas
        </button>
      </div>

      <div className="h-9 font-display text-3xl text-accent">
        {lastMidi !== null ? midiToName(lastMidi, { naming: settings.naming, showOctave: true }) : ""}
      </div>

      <Fingerboard instrument={instrument} positionId={positionId} naming={settings.naming} showNames onPick={hit} selectedKey={lastKey} status={lastKey ? "correct" : "idle"} />

      <p className="max-w-sm text-center text-sm text-muted">
        Clique nas notas pra ouvir o som real do {instrument.name.toLowerCase()}. Repare como cada dedo muda a altura — depois teste nos outros modos.
      </p>

      <Link href="/" className="text-sm text-faint hover:text-ink">
        ← voltar aos modos
      </Link>
    </div>
  );
}
