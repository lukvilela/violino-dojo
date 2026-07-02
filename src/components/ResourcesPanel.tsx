"use client";

// Recursos & Dicas: método oficial da CCB, dicas por tópico com atalho pra aulas no
// YouTube (adaptado ao instrumento selecionado) e canais recomendados.

import { useApp } from "@/lib/store";
import { INSTRUMENTS } from "@/lib/music/instruments";
import { channelsFor, featuredFor, OFFICIAL, TIPS, instrumentWord, youtubeSearch } from "@/lib/resources";
import { VideoIcon, ExternalIcon } from "./icons";

function ExtLink({ name, url, note }: { name: string; url: string; note: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="card group flex items-center gap-3 p-4 transition hover:-translate-y-0.5">
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-ink">{name}</div>
        <div className="text-sm text-muted">{note}</div>
      </div>
      <ExternalIcon className="h-4 w-4 shrink-0 text-faint transition group-hover:text-accent" />
    </a>
  );
}

export default function ResourcesPanel() {
  const { settings } = useApp();
  const instrument = INSTRUMENTS[settings.instrumentId] ?? INSTRUMENTS.violin;
  const word = instrumentWord(settings.instrumentId);
  const videos = featuredFor(settings.instrumentId);

  return (
    <div className="space-y-8">
      <div className="rounded-xl bg-accent-tint px-4 py-2 text-sm text-accent-ink">
        Mostrando dicas para <span className="font-semibold">{instrument.name}</span>. Troque o instrumento na tela inicial
        e os vídeos se ajustam.
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-faint">Vídeo-aulas em destaque</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {videos.map((v) => (
            <div key={v.id} className="card overflow-hidden">
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                  title={v.title}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-accent">{v.topic}</div>
                <div className="mt-0.5 text-sm text-ink">{v.title}</div>
                <a
                  href={`https://www.youtube.com/watch?v=${v.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted hover:text-accent"
                >
                  <ExternalIcon className="h-3.5 w-3.5" /> abrir no YouTube
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-faint">Vídeo-aulas de {instrument.name.toLowerCase()}. Troque o instrumento na tela inicial para ver as do seu.</p>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-faint">Método oficial da CCB</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {OFFICIAL.map((l) => (
            <ExtLink key={l.url} {...l} />
          ))}
        </div>
        <p className="mt-2 text-xs text-faint">Conteúdo oficial; alguns recursos podem exigir acesso pelo seu GEM.</p>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-faint">Dicas de técnica</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TIPS.map((t) => (
            <div key={t.id} className="card flex flex-col p-4">
              <div className="font-semibold text-ink">{t.title}</div>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{t.tip}</p>
              <a
                href={youtubeSearch(settings.instrumentId, t.query)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-ink"
              >
                <VideoIcon className="h-4 w-4" /> aulas de {word} no YouTube
              </a>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-faint">Canais recomendados</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {channelsFor(settings.instrumentId).map((l) => (
            <ExtLink key={l.url} {...l} />
          ))}
        </div>
      </section>
    </div>
  );
}
