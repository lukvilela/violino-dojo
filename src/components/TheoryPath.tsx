"use client";

// Trilha de estudo: lista as 16 Fases da teoria com o progresso (fase concluída quando
// todas as suas perguntas já foram acertadas ao menos uma vez).

import Link from "next/link";
import { useApp } from "@/lib/store";
import { PHASES, phaseKey } from "@/lib/theory/msa";

export default function TheoryPath() {
  const { progress } = useApp();

  const phaseDone = (phaseId: number, nQuestions: number) => {
    for (let i = 0; i < nQuestions; i++) {
      if ((progress.stats[phaseKey(phaseId, i)]?.correct ?? 0) === 0) return false;
    }
    return true;
  };

  const doneCount = PHASES.filter((p) => phaseDone(p.id, p.questions.length)).length;

  return (
    <div>
      <div className="mb-4 text-center text-sm text-muted">
        {doneCount} de {PHASES.length} fases concluídas
      </div>
      <div className="flex flex-col gap-2.5">
        {PHASES.map((p) => {
          const done = phaseDone(p.id, p.questions.length);
          return (
            <Link key={p.id} href={`/teoria/${p.id}`} className="card group flex items-center gap-4 p-4 transition hover:-translate-y-0.5">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${done ? "bg-emerald-100 text-emerald-700" : "bg-accent-tint text-accent"}`}>
                {done ? "✓" : p.id}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-ink">{p.title}</div>
                <div className="truncate text-sm text-muted">{p.subtitle}</div>
              </div>
              <span className="hidden text-xs text-faint sm:block">{p.questions.length} questões →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
