import Link from "next/link";
import { notFound } from "next/navigation";
import TrainerGame from "@/components/TrainerGame";
import ExploreBoard from "@/components/ExploreBoard";
import IntervalTrainer from "@/components/IntervalTrainer";
import RhythmDictation from "@/components/RhythmDictation";
import { MODES, modeById } from "@/lib/modes";

export function generateStaticParams() {
  return MODES.map((m) => ({ modo: m.id }));
}

export default async function TreinoPage({ params }: { params: Promise<{ modo: string }> }) {
  const { modo } = await params;
  if (!MODES.some((m) => m.id === modo)) notFound();
  const mode = modeById(modo);

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="mb-4 text-sm">
        <Link href="/" className="text-faint hover:text-ink">
          ← início
        </Link>
      </div>
      <header className="mb-7 text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-tint text-2xl">{mode.icon}</div>
        <h1 className="font-display text-3xl text-ink">{mode.name}</h1>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted">{mode.desc}</p>
      </header>
      {mode.free ? (
        <ExploreBoard />
      ) : mode.id === "intervalos" ? (
        <IntervalTrainer />
      ) : mode.id === "ditado" ? (
        <RhythmDictation />
      ) : (
        <TrainerGame mode={mode} />
      )}
    </main>
  );
}
