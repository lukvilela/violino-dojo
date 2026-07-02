// Conjunto de ícones de linha, desenhados à mão (currentColor, traço consistente).
// Substituem os emojis pra dar um acabamento mais profissional.

import { ModeId } from "@/lib/modes";

type IconProps = { className?: string };

function Base({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className ?? "h-5 w-5"} aria-hidden>
      {children}
    </svg>
  );
}

// alvo — "ache a nota"
export const TargetIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </Base>
);

// colcheia — "explorar o braço"
export const NoteIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="7.5" cy="17" r="2.4" fill="currentColor" stroke="none" />
    <path d="M9.9 17V5l7 2.2" />
    <path d="M16.9 7.2v4" />
  </Base>
);

// pauta com nota — "ler partitura"
export const StaffIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" opacity="0.5" />
    <circle cx="9" cy="16" r="1.9" fill="currentColor" stroke="none" />
    <path d="M10.9 16V7l5 1.5" />
  </Base>
);

// orelha — "treino de ouvido"
export const EarIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 3-2.5 3.6-2.5 5.6a2.6 2.6 0 0 1-5.2 0" />
    <path d="M9.5 10a2.5 2.5 0 0 1 5 0c0 1.3-1 1.8-1 2.8" />
  </Base>
);

// duas notas + setas de distância — "intervalos"
export const IntervalIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="7.5" cy="7" r="2" fill="currentColor" stroke="none" />
    <circle cx="16.5" cy="17" r="2" fill="currentColor" stroke="none" />
    <path d="M12 5.5v13" />
    <path d="M10 8l2-2.5L14 8" />
    <path d="M10 16l2 2.5 2-2.5" />
  </Base>
);

// metrônomo — "ditado rítmico"
export const MetronomeIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8.5 4.5h7l2 15H6.5z" />
    <path d="M6.8 15.5h10.4" />
    <path d="M12 18.5V9.5l3-2" />
  </Base>
);

// microfone — "toque de verdade"
export const MicIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M6 11a6 6 0 0 0 12 0" />
    <path d="M12 17v4M9 21h6" />
  </Base>
);

// livro aberto — "teoria"
export const BookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 6.5C10.4 5.3 8 4.5 5.5 4.5A1.5 1.5 0 0 0 4 6v11.5A1.5 1.5 0 0 0 5.5 19c2.5 0 4.9.8 6.5 2 1.6-1.2 4-2 6.5-2A1.5 1.5 0 0 0 20 17.5V6a1.5 1.5 0 0 0-1.5-1.5C16 4.5 13.6 5.3 12 6.5z" />
    <path d="M12 6.5V21" />
  </Base>
);

// alto-falante — botões "ouvir"
export const SpeakerIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5v5h3.5L13 19V5L7.5 9.5z" />
    <path d="M16 9a4 4 0 0 1 0 6" />
    <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" />
  </Base>
);

// play — demos
export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 5l12 7-12 7z" fill="currentColor" stroke="none" />
  </Base>
);

export const BackspaceIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M20 5H9.5L3 12l6.5 7H20a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z" />
    <path d="M12 9.5l5 5M17 9.5l-5 5" />
  </Base>
);

export const MoonIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8z" />
  </Base>
);

export const SunIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Base>
);

const MODE_ICONS: Record<ModeId, (p: IconProps) => React.ReactElement> = {
  explorar: NoteIcon,
  find: TargetIcon,
  ler: StaffIcon,
  ouvido: EarIcon,
  intervalos: IntervalIcon,
  ditado: MetronomeIcon,
  tocar: MicIcon,
};

export function ModeIcon({ id, className }: { id: ModeId; className?: string }) {
  const Icon = MODE_ICONS[id] ?? NoteIcon;
  return <Icon className={className} />;
}
