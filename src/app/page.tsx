import Link from "next/link";
import Hud from "@/components/Hud";
import SettingsBar from "@/components/SettingsBar";
import ResetButton from "@/components/ResetButton";
import { ModeIcon, BookIcon, VideoIcon } from "@/components/icons";
import { MODES } from "@/lib/modes";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <header className="mb-9">
        <p className="mb-1 text-sm font-medium tracking-wide text-accent">estudo de instrumentos de corda</p>
        <h1 className="font-display text-5xl leading-none text-ink sm:text-6xl">Violino Dojo</h1>
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
          Ache as notas no braço, leia partitura, treine o ouvido e o ritmo — com o som real do instrumento.
        </p>
      </header>

      <div className="mb-4">
        <Hud />
      </div>

      <div className="mb-8">
        <SettingsBar />
      </div>

      <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-faint">Praticar</h2>
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MODES.map((m) => (
          <Link key={m.id} href={`/treino/${m.id}`} className="card group relative flex items-start gap-4 p-4 transition hover:-translate-y-0.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-tint text-accent">
              <ModeIcon id={m.id} className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="font-semibold text-ink">{m.name}</div>
              <div className="text-sm leading-snug text-muted">{m.short}</div>
            </div>
            {m.beta && <span className="absolute right-3 top-3 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-white">beta</span>}
          </Link>
        ))}
      </section>

      <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-faint">Estudar</h2>
      <Link href="/teoria" className="card group flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-tint text-accent">
          <BookIcon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <div className="font-semibold text-ink">Teoria musical — 16 fases</div>
          <div className="text-sm text-muted">Trilha do som à interpretação, com lição e quiz por nível.</div>
        </div>
        <span className="text-faint transition group-hover:translate-x-0.5 group-hover:text-accent">→</span>
      </Link>

      <Link href="/recursos" className="card group mt-3 flex items-center gap-4 p-5 transition hover:-translate-y-0.5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-tint text-accent">
          <VideoIcon className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <div className="font-semibold text-ink">Recursos &amp; Dicas</div>
          <div className="text-sm text-muted">Método da CCB, vídeos e técnica: postura, arco, afinação, vibrato…</div>
        </div>
        <span className="text-faint transition group-hover:translate-x-0.5 group-hover:text-accent">→</span>
      </Link>

      <footer className="mt-12 flex items-center justify-between border-t border-line pt-5 text-xs text-faint">
        <span>Progressão inspirada nos métodos Suzuki, Sassmannshaus e MSA.</span>
        <ResetButton />
      </footer>
    </main>
  );
}
