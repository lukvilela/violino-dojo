import Link from "next/link";
import { notFound } from "next/navigation";
import TheoryQuiz from "@/components/TheoryQuiz";
import { PHASES, phaseById } from "@/lib/theory/msa";

export function generateStaticParams() {
  return PHASES.map((p) => ({ fase: String(p.id) }));
}

export default async function FasePage({ params }: { params: Promise<{ fase: string }> }) {
  const { fase } = await params;
  const phase = phaseById(Number(fase));
  if (!phase) notFound();

  const prev = phaseById(phase.id - 1);
  const next = phaseById(phase.id + 1);

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <div className="mb-4 text-sm">
        <Link href="/teoria" className="text-faint hover:text-ink">
          ← Teoria
        </Link>
      </div>

      <header className="mb-6">
        <h1 className="font-display text-3xl text-ink">{phase.title}</h1>
        <p className="mt-1 text-muted">{phase.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {phase.topics.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
      </header>

      <article className="space-y-4">
        {phase.sections.map((s) => (
          <section key={s.title} className="card p-5">
            <h2 className="mb-2 font-display text-xl text-ink">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mb-2 leading-relaxed text-ink/75">
                {p}
              </p>
            ))}
          </section>
        ))}
      </article>

      <div className="mt-8">
        <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-faint">Quiz da {phase.title.split(" — ")[0]}</h2>
        <TheoryQuiz phase={phase} />
      </div>

      <nav className="mt-8 flex items-center justify-between text-sm">
        {prev ? (
          <Link href={`/teoria/${prev.id}`} className="text-muted hover:text-ink">
            ← {prev.title.split(" — ")[0]}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/teoria/${next.id}`} className="font-medium text-accent hover:text-accent-ink">
            {next.title.split(" — ")[0]} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
