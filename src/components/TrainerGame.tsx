"use client";

// Loop de treino genérico. O mesmo motor serve os modos com alvo único — muda só o
// "prompt" (o que pedimos) e a forma de responder (braço clicável ou microfone).

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Fingerboard, { CellStatus } from "./Fingerboard";
import StaffView from "./StaffView";
import MicPanel from "./MicPanel";
import { useApp } from "@/lib/store";
import { INSTRUMENTS, Cell, cellKey } from "@/lib/music/instruments";
import { levelById, levelPool } from "@/lib/music/curriculum";
import { pickNext } from "@/lib/music/srs";
import { shortName, pitchClass } from "@/lib/music/notes";
import { playNote, playArpeggio } from "@/lib/audio/player";
import SampleBanner from "./SampleBanner";
import { Mode } from "@/lib/modes";

interface Feedback {
  status: Exclude<CellStatus, "idle">;
  selectedKey: string;
  revealKey: string | null;
}

export default function TrainerGame({ mode }: { mode: Mode }) {
  const { settings, progress, recordResult, ready } = useApp();
  const instrument = INSTRUMENTS[settings.instrumentId] ?? INSTRUMENTS.violin;
  const level = levelById(settings.levelId);
  const pool = levelPool(instrument, level);
  const poolKeys = new Set(pool.map(cellKey));

  const [target, setTarget] = useState<Cell | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const nextTarget = useCallback(
    (avoid?: string) => {
      const t = pickNext(pool, progress.stats, progress.totalAttempts, avoid);
      setTarget(t);
      setFeedback(null);
      setRound((r) => r + 1);
      if (mode.id === "ouvido") setTimeout(() => playNote(settings.instrumentId, t.midi), 140);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pool, progress.stats, progress.totalAttempts, mode.id, settings.instrumentId]
  );

  useEffect(() => {
    if (!ready) return;
    clearTimer();
    nextTarget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, settings.levelId, settings.instrumentId, mode.id]);

  useEffect(() => () => clearTimer(), []);

  const advance = (delay: number, avoid?: string) => {
    clearTimer();
    timer.current = setTimeout(() => nextTarget(avoid), delay);
  };

  const handlePick = (cell: Cell) => {
    if (!target || feedback) return;
    // No modo "achar", o nome não traz oitava — então qualquer oitava da nota vale
    // (ex.: Ré na corda solta ou no 3º dedo da corda Lá). Nos demais modos a
    // oitava é conhecida (pauta/som), então exigimos a nota exata.
    const ok = mode.id === "find" ? pitchClass(cell.midi) === pitchClass(target.midi) : cell.midi === target.midi;
    const newStreak = ok ? streak + 1 : 0;
    setStreak(newStreak);
    recordResult(target, ok, newStreak);
    setFeedback({ status: ok ? "correct" : "wrong", selectedKey: cellKey(cell), revealKey: ok ? null : cellKey(target) });
    if (ok) {
      playArpeggio(settings.instrumentId, cell.midi);
      advance(850, cellKey(target));
    } else {
      playNote(settings.instrumentId, target.midi, 1.1);
      advance(1700, cellKey(target));
    }
  };

  const handleMic = () => {
    if (!target || feedback) return;
    const newStreak = streak + 1;
    setStreak(newStreak);
    recordResult(target, true, newStreak);
    setFeedback({ status: "correct", selectedKey: cellKey(target), revealKey: cellKey(target) });
    playArpeggio(settings.instrumentId, target.midi);
    advance(900, cellKey(target));
  };

  if (!ready || !target) return <div className="py-24 text-center text-faint">carregando…</div>;

  const targetName = shortName(target.midi, settings.naming);
  const isMic = mode.id === "tocar";

  return (
    <div className="flex flex-col items-center gap-6">
      <SampleBanner instrumentId={settings.instrumentId} />

      <div className="flex w-full max-w-md items-center justify-between text-sm">
        <span className="text-muted">
          Sequência <span className="font-semibold text-accent">{streak}</span>
        </span>
        <button onClick={() => { clearTimer(); nextTarget(target ? cellKey(target) : undefined); }} className="btn px-3 py-1.5 text-sm">
          Pular →
        </button>
      </div>

      {/* PROMPT */}
      <div className="min-h-[150px] w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="flex flex-col items-center">
            {mode.id === "find" && (
              <>
                <p className="mb-2 text-sm text-muted">Ache esta nota no braço</p>
                <div className="card px-10 py-5 font-display text-5xl text-accent">{targetName}</div>
              </>
            )}

            {(mode.id === "ler" || isMic) && (
              <div className="card p-3">
                <StaffView midi={target.midi} clef={instrument.clef} />
              </div>
            )}

            {mode.id === "ouvido" && (
              <button onClick={() => playNote(settings.instrumentId, target.midi)} className="card px-8 py-6 text-2xl text-ink transition hover:border-accent">
                🔊 Ouvir de novo
              </button>
            )}

            {isMic && (
              <div className="mt-3 flex flex-col items-center gap-2">
                <p className="text-center text-lg text-muted">
                  Toque <span className="font-semibold text-ink">{targetName}</span>
                </p>
                <button onClick={() => playNote(settings.instrumentId, target.midi)} className="btn px-4 py-1.5 text-sm">
                  🔊 ouvir como é
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RESPOSTA */}
      {isMic ? (
        <div className="w-full max-w-md space-y-5">
          <MicPanel targetMidi={target.midi} naming={settings.naming} onCorrect={handleMic} />
          <div className="opacity-90">
            <Fingerboard instrument={instrument} positionId={level.positionId} naming={settings.naming} showNames poolKeys={poolKeys} revealKey={cellKey(target)} status="wrong" disabled />
            <p className="mt-1 text-center text-xs text-faint">dica: é aqui que fica a nota</p>
          </div>
        </div>
      ) : (
        <Fingerboard
          instrument={instrument}
          positionId={level.positionId}
          naming={settings.naming}
          showNames={settings.showNames || feedback?.status === "wrong"}
          poolKeys={poolKeys}
          onPick={handlePick}
          selectedKey={feedback?.selectedKey}
          status={feedback?.status ?? "idle"}
          revealKey={feedback?.revealKey}
          disabled={!!feedback}
        />
      )}

      <div className="h-8">
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className={`text-lg font-semibold ${feedback.status === "correct" ? "text-emerald-600" : "text-rose-600"}`}>
              {feedback.status === "correct" ? "Isso!" : `Era ${targetName} — veja onde fica`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Link href="/" className="text-sm text-faint hover:text-ink">
        ← voltar aos modos
      </Link>
    </div>
  );
}
