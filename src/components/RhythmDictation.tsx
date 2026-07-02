"use client";

// Ditado rítmico: o app toca um compasso (com o som real + clique de pulso) e o aluno
// remonta o ritmo escolhendo as células. Confere tempo a tempo e revela a notação real.

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Renderer, Stave, StaveNote, Beam, Voice, Formatter } from "vexflow";
import SampleBanner from "./SampleBanner";
import { useApp } from "@/lib/store";
import { INSTRUMENTS } from "@/lib/music/instruments";
import { playNote } from "@/lib/audio/player";
import { playMidi } from "@/lib/audio/synth";
import { BEATS, CELLS, RHYTHM_LEVELS, levelById, randomPattern } from "@/lib/music/rhythm";

const BEAT_MS = 600;

// --- notação do compasso rítmico (VexFlow) ---
function RhythmStaff({ cells }: { cells: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const width = 380;
    const renderer = new Renderer(el, Renderer.Backends.SVG);
    renderer.resize(width, 110);
    const ctx = renderer.getContext();
    const stave = new Stave(6, 12, width - 16);
    stave.addClef("percussion").addTimeSignature("4/4");
    stave.setContext(ctx).draw();

    const notes: StaveNote[] = [];
    const beams: Beam[] = [];
    cells.forEach((id) => {
      const cell = CELLS[id];
      const start = notes.length;
      cell.vf.forEach((d) => notes.push(new StaveNote({ keys: ["b/4"], duration: d })));
      const group = notes.slice(start);
      if (group.length > 1 && !cell.rest) beams.push(new Beam(group));
    });

    const voice = new Voice({ numBeats: BEATS, beatValue: 4 }).addTickables(notes);
    new Formatter().joinVoices([voice]).format([voice], width - 60);
    voice.draw(ctx, stave);
    beams.forEach((b) => b.setContext(ctx).draw());
  }, [cells]);
  return <div ref={ref} className="vf-staff mx-auto" aria-label="Compasso rítmico" />;
}

export default function RhythmDictation() {
  const { settings, recordEvent, ready } = useApp();
  const instrument = INSTRUMENTS[settings.instrumentId] ?? INSTRUMENTS.violin;
  const pitch = instrument.strings[2]?.midi ?? 69;

  const [levelId, setLevelId] = useState("facil");
  const [target, setTarget] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [result, setResult] = useState<boolean[] | null>(null);
  const [streak, setStreak] = useState(0);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const level = levelById(levelId);
  const checked = result !== null;

  const clearTimers = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const play = useCallback(
    (pattern: string[]) => {
      clearTimers();
      const t: ReturnType<typeof setTimeout>[] = [];
      const click = (at: number) => t.push(setTimeout(() => playMidi(90, 0.06), at));
      const note = (at: number) => t.push(setTimeout(() => playNote(settings.instrumentId, pitch, 0.2), at));
      click(0);
      click(BEAT_MS); // 2 tempos de count-in
      const start = 2 * BEAT_MS;
      pattern.forEach((id, b) => {
        click(start + b * BEAT_MS);
        CELLS[id].onsets.forEach((on) => note(start + (b + on) * BEAT_MS));
      });
      timeouts.current = t;
    },
    [settings.instrumentId, pitch]
  );

  const newRound = useCallback(() => {
    const p = randomPattern(level);
    setTarget(p);
    setAnswer([]);
    setResult(null);
    setTimeout(() => play(p), 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, play]);

  useEffect(() => {
    if (!ready) return;
    newRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, levelId, settings.instrumentId]);

  useEffect(() => () => clearTimers(), []);

  const append = (id: string) => {
    if (checked || answer.length >= BEATS) return;
    setAnswer((a) => [...a, id]);
  };

  const check = () => {
    if (answer.length !== BEATS || checked) return;
    const res = target.map((id, i) => id === answer[i]);
    const allOk = res.every(Boolean);
    const newStreak = allOk ? streak + 1 : 0;
    setStreak(newStreak);
    setResult(res);
    recordEvent(`ritmo:${levelId}`, allOk, newStreak);
  };

  if (!ready) return <div className="py-24 text-center text-faint">carregando…</div>;

  const palette = level.cellIds.map((id) => CELLS[id]);

  return (
    <div className="flex flex-col items-center gap-5">
      <SampleBanner instrumentId={settings.instrumentId} />

      <div className="flex items-center gap-3">
        <div className="inline-flex overflow-hidden rounded-lg border border-line text-sm">
          {RHYTHM_LEVELS.map((l) => (
            <button key={l.id} onClick={() => setLevelId(l.id)} className={`seg ${levelId === l.id ? "seg-on" : ""}`}>
              {l.name}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted">
          Sequência <span className="font-semibold text-accent">{streak}</span>
        </span>
      </div>

      <button onClick={() => play(target)} className="card px-8 py-6 text-xl text-ink transition hover:border-accent">
        🔊 Ouvir o ritmo
      </button>

      {/* montagem do compasso — 4 tempos */}
      <div className="flex w-full max-w-md items-stretch gap-2">
        {Array.from({ length: BEATS }).map((_, i) => {
          const id = answer[i];
          const cell = id ? CELLS[id] : null;
          const ok = result?.[i];
          let cls = "border-dashed border-line text-faint";
          if (cell && !checked) cls = "border-solid border-accent/40 bg-accent-tint text-ink";
          else if (checked && ok) cls = "border-solid border-emerald-300 bg-emerald-50 text-emerald-700";
          else if (checked && ok === false) cls = "border-solid border-rose-300 bg-rose-50 text-rose-700";
          return (
            <div key={i} className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-xl border py-3 ${cls}`}>
              <span className="text-2xl leading-none">{cell ? cell.glyph : "·"}</span>
              <span className="text-[11px]">{cell ? cell.syllable : `t.${i + 1}`}</span>
            </div>
          );
        })}
      </div>

      {/* paleta */}
      {!checked && (
        <>
          <div className="flex flex-wrap justify-center gap-2">
            {palette.map((c) => (
              <button key={c.id} onClick={() => append(c.id)} className="btn flex-col gap-0.5 px-4 py-2">
                <span className="text-2xl leading-none">{c.glyph}</span>
                <span className="text-[11px] text-muted">{c.syllable}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAnswer((a) => a.slice(0, -1))} className="btn px-3 py-1.5 text-sm" disabled={!answer.length}>
              ⌫ apagar
            </button>
            <button onClick={() => setAnswer([])} className="btn px-3 py-1.5 text-sm" disabled={!answer.length}>
              limpar
            </button>
            <button onClick={check} className="btn-accent px-5 py-1.5 text-sm" disabled={answer.length !== BEATS}>
              Conferir
            </button>
          </div>
        </>
      )}

      {/* resultado + notação real */}
      {checked && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3">
          <div className={`text-lg font-semibold ${result!.every(Boolean) ? "text-emerald-600" : "text-rose-600"}`}>
            {result!.every(Boolean) ? "Perfeito! Ritmo certo." : "Quase — compare com a resposta:"}
          </div>
          <div className="card p-3">
            <RhythmStaff cells={target} />
          </div>
          <button onClick={newRound} className="btn-accent">
            Próximo →
          </button>
        </motion.div>
      )}

      <Link href="/" className="text-sm text-faint hover:text-ink">
        ← voltar aos modos
      </Link>
    </div>
  );
}
