"use client";

// Quiz de uma Fase da teoria: uma pergunta por vez, feedback imediato + explicação,
// e placar final. Cada acerto gera XP via recordEvent (chave "msa:<fase>:<q>").

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApp } from "@/lib/store";
import { Phase, phaseKey } from "@/lib/theory/msa";

export default function TheoryQuiz({ phase }: { phase: Phase }) {
  const { recordEvent } = useApp();
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);

  const total = phase.questions.length;
  const q = phase.questions[idx];
  const answered = chosen !== null;

  const choose = (i: number) => {
    if (answered) return;
    const ok = i === q.answer;
    const newStreak = ok ? streak + 1 : 0;
    setChosen(i);
    setStreak(newStreak);
    if (ok) setCorrect((c) => c + 1);
    recordEvent(phaseKey(phase.id, idx), ok, newStreak);
  };

  const next = () => {
    if (idx + 1 >= total) return setDone(true);
    setIdx(idx + 1);
    setChosen(null);
  };

  const restart = () => {
    setIdx(0);
    setChosen(null);
    setCorrect(0);
    setStreak(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((correct / total) * 100);
    return (
      <div className="card p-6 text-center">
        <div className="text-4xl">{pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "📚"}</div>
        <h3 className="mt-2 font-display text-2xl text-ink">
          {correct} de {total} certas ({pct}%)
        </h3>
        <p className="mt-1 text-sm text-muted">{pct >= 80 ? "Fase dominada — pode seguir para a próxima." : "Revise a lição e tente de novo. Repetir é o método."}</p>
        <button onClick={restart} className="btn mt-4">
          Refazer o quiz
        </button>
      </div>
    );
  }

  return (
    <div className="card p-5">
      <div className="mb-2 flex items-center justify-between text-xs text-faint">
        <span>Pergunta {idx + 1} de {total}</span>
        <span>Acertos: {correct}</span>
      </div>
      <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full bg-accent transition-all" style={{ width: `${(idx / total) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
          <p className="mb-4 mt-2 text-lg font-semibold text-ink">{q.q}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answer;
              const isChosen = i === chosen;
              let cls = "border-line bg-surface text-ink hover:border-accent";
              if (answered && isAnswer) cls = "border-emerald-300 bg-emerald-50 text-emerald-700";
              else if (answered && isChosen) cls = "border-rose-300 bg-rose-50 text-rose-700";
              else if (answered) cls = "border-line bg-surface text-faint";
              return (
                <button key={i} onClick={() => choose(i)} disabled={answered} className={`rounded-xl border px-4 py-2.5 text-left transition ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 rounded-xl bg-accent-tint p-3 text-sm text-ink/80">
              <span className={chosen === q.answer ? "font-semibold text-emerald-700" : "font-semibold text-rose-700"}>{chosen === q.answer ? "Certo! " : "Não é essa. "}</span>
              {q.explain}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {answered && (
        <div className="mt-4 text-right">
          <button onClick={next} className="btn-accent">
            {idx + 1 >= total ? "Ver resultado" : "Próxima →"}
          </button>
        </div>
      )}
    </div>
  );
}
