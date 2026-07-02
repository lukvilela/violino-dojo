"use client";

// Treino de intervalos. Toca duas notas (reais) e o aluno identifica a distância.
// Reaproveita XP/streak/SRS via recordEvent + pickWeightedKey (chave "int:<semitons>").

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import SampleBanner from "./SampleBanner";
import { useApp } from "@/lib/store";
import { INSTRUMENTS } from "@/lib/music/instruments";
import { midiToName } from "@/lib/music/notes";
import { pickWeightedKey } from "@/lib/music/srs";
import { playNote } from "@/lib/audio/player";
import { DIRECTIONS, Interval, IntervalDir, INTERVAL_LEVELS, intervalKey, intervalsFor, levelById } from "@/lib/music/intervals";

const rand = (n: number) => Math.floor(Math.random() * (n + 1));

export default function IntervalTrainer() {
  const { settings, progress, recordEvent, ready } = useApp();
  const instrument = INSTRUMENTS[settings.instrumentId] ?? INSTRUMENTS.violin;

  const [levelId, setLevelId] = useState("basico");
  const [dir, setDir] = useState<IntervalDir>("asc");
  const [target, setTarget] = useState<Interval | null>(null);
  const [root, setRoot] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const level = levelById(levelId);
  const pool = intervalsFor(level.semis);

  const secondOf = (r: number, semi: number, d: IntervalDir) => (d === "desc" ? r - semi : r + semi);

  const play = useCallback(
    (iv: Interval, r: number, d: IntervalDir) => {
      const second = secondOf(r, iv.semitones, d);
      if (d === "harm") {
        playNote(settings.instrumentId, r, 1.6);
        playNote(settings.instrumentId, second, 1.6);
      } else {
        playNote(settings.instrumentId, r, 0.9);
        setTimeout(() => playNote(settings.instrumentId, second, 1.3), 640);
      }
    },
    [settings.instrumentId]
  );

  const newRound = useCallback(
    (avoid?: string) => {
      const iv = pickWeightedKey(pool, (i) => intervalKey(i.semitones), progress.stats, progress.totalAttempts, avoid);
      const base = instrument.strings[1].midi;
      const r = dir === "desc" ? base + 12 + rand(3) : base + rand(5);
      setTarget(iv);
      setRoot(r);
      setChosen(null);
      setFeedback(null);
      setRound((n) => n + 1);
      setTimeout(() => play(iv, r, dir), 220);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pool, progress.stats, progress.totalAttempts, dir, instrument, play]
  );

  useEffect(() => {
    if (!ready) return;
    if (timer.current) clearTimeout(timer.current);
    newRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, levelId, dir, settings.instrumentId]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const answer = (semi: number) => {
    if (!target || feedback) return;
    const ok = semi === target.semitones;
    const newStreak = ok ? streak + 1 : 0;
    setStreak(newStreak);
    setChosen(semi);
    setFeedback(ok ? "correct" : "wrong");
    recordEvent(intervalKey(target.semitones), ok, newStreak);
    if (!ok) setTimeout(() => play(target, root, dir), 250);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => newRound(intervalKey(target.semitones)), ok ? 900 : 1900);
  };

  if (!ready || !target) return <div className="py-24 text-center text-faint">carregando…</div>;

  const second = secondOf(root, target.semitones, dir);

  return (
    <div className="flex flex-col items-center gap-5">
      <SampleBanner instrumentId={settings.instrumentId} />

      <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
        <div className="inline-flex overflow-hidden rounded-lg border border-line">
          {INTERVAL_LEVELS.map((l) => (
            <button key={l.id} onClick={() => setLevelId(l.id)} className={`seg ${levelId === l.id ? "seg-on" : ""}`}>
              {l.name}
            </button>
          ))}
        </div>
        <div className="inline-flex overflow-hidden rounded-lg border border-line">
          {DIRECTIONS.map((d) => (
            <button key={d.id} onClick={() => setDir(d.id)} className={`seg ${dir === d.id ? "seg-on" : ""}`}>
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <span className="text-sm text-muted">
        Sequência <span className="font-semibold text-accent">{streak}</span>
      </span>

      <button onClick={() => play(target, root, dir)} className="card px-10 py-7 text-3xl text-ink transition hover:border-accent">
        🔊 Ouvir o intervalo
      </button>

      <div className="grid w-full max-w-md grid-cols-2 gap-2 sm:grid-cols-3">
        {pool.map((iv) => {
          const isTarget = feedback && iv.semitones === target.semitones;
          const isWrongPick = feedback === "wrong" && chosen === iv.semitones;
          let cls = "border-line bg-surface text-ink hover:border-accent";
          if (isTarget) cls = "border-emerald-300 bg-emerald-50 text-emerald-700";
          else if (isWrongPick) cls = "border-rose-300 bg-rose-50 text-rose-700";
          return (
            <button key={iv.semitones} onClick={() => answer(iv.semitones)} disabled={!!feedback} className={`rounded-xl border px-3 py-2 text-left transition ${cls}`}>
              <span className="font-semibold">{iv.name}</span>
              <span className="ml-1 text-xs text-faint">{iv.short}</span>
            </button>
          );
        })}
      </div>

      <div className="h-14 text-center">
        <AnimatePresence>
          {feedback && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className={`text-lg font-semibold ${feedback === "correct" ? "text-emerald-600" : "text-rose-600"}`}>
                {feedback === "correct" ? "Isso!" : `Era ${target.name}`}
              </div>
              <div className="text-sm text-muted">
                {midiToName(root, { naming: settings.naming, showOctave: true })} → {midiToName(second, { naming: settings.naming, showOctave: true })}
                {target.ref && <span className="text-faint"> · lembra de “{target.ref}”</span>}
              </div>
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
