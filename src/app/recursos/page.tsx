import Link from "next/link";
import ResourcesPanel from "@/components/ResourcesPanel";

export const metadata = {
  title: "Recursos & Dicas — vídeos e técnica | Violino Dojo",
};

export default function RecursosPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-6 text-sm">
        <Link href="/" className="text-faint hover:text-ink">
          ← início
        </Link>
      </div>

      <header className="mb-7">
        <p className="mb-1 text-sm font-medium tracking-wide text-accent">estudar</p>
        <h1 className="font-display text-4xl text-ink">Recursos &amp; Dicas</h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">
          O método oficial da CCB, dicas de técnica (postura, arco, afinação, vibrato…) e os melhores canais em
          português — com atalho pra aulas em vídeo do seu instrumento.
        </p>
      </header>

      <ResourcesPanel />

      <p className="mt-8 text-center text-xs text-faint">
        Links para conteúdo de terceiros e da CCB. Este app é um material de apoio independente.
      </p>
    </main>
  );
}
