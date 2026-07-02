import Link from "next/link";
import TheoryPath from "@/components/TheoryPath";

export const metadata = {
  title: "Teoria musical — trilha de 16 fases | Violino Dojo",
};

export default function TeoriaHome() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-12">
      <div className="mb-6 text-sm">
        <Link href="/" className="text-faint hover:text-ink">
          ← início
        </Link>
      </div>

      <header className="mb-7">
        <p className="mb-1 text-sm font-medium tracking-wide text-accent">estudar</p>
        <h1 className="font-display text-4xl text-ink">Teoria musical</h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-muted">
          Uma trilha em 16 fases — do som e das notas até a interpretação — com uma lição e um quiz em cada nível.
          Avance para a próxima fase só quando dominar a atual.
        </p>
      </header>

      <TheoryPath />

      <p className="mx-auto mt-8 max-w-lg text-center text-xs text-faint">
        Sequência de estudo inspirada na estrutura de fases do MSA (Congregação Cristã no Brasil). Conteúdo e questões
        originais, escritos como material de apoio — não substitui o método oficial nem os Grupos de Estudos Musicais.
      </p>
    </main>
  );
}
