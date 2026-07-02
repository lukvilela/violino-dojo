"use client";

// Banner sutil sobre as amostras reais: carregando / fallback.

import { useSampler } from "@/lib/audio/useSampler";

export default function SampleBanner({ instrumentId }: { instrumentId: string }) {
  const status = useSampler(instrumentId);
  if (status === "ready" || status === "idle") return null;

  return (
    <div className={`w-full max-w-md rounded-xl border px-3 py-1.5 text-center text-xs ${status === "error" ? "border-line bg-surface text-muted" : "border-accent/20 bg-accent-tint text-accent-ink"}`}>
      {status === "loading" ? "carregando o som real do instrumento…" : "som real indisponível — usando timbre sintético"}
    </div>
  );
}
