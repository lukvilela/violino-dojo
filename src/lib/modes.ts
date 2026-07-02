// Definição dos modos de treino. Um game genérico consome esses metadados.

export type ModeId = "explorar" | "find" | "ler" | "ouvido" | "intervalos" | "ditado" | "tocar";

export interface Mode {
  id: ModeId;
  name: string;
  short: string;
  desc: string;
  icon: string;
  beta?: boolean;
  /** Modo livre (sem pontuação) — usado só pra familiarizar com o som. */
  free?: boolean;
}

export const MODES: Mode[] = [
  {
    id: "explorar",
    name: "Explorar o braço",
    short: "Toque qualquer nota e ouça o som real.",
    desc: "Modo livre: clique nas notas do braço pra ouvir o instrumento de verdade e decorar onde cada uma fica.",
    icon: "🎶",
    free: true,
  },
  {
    id: "find",
    name: "Ache a nota",
    short: "Você sabe a nota — agora ache ela no braço.",
    desc: "Mostramos o nome da nota. Toque na corda e no dedo certos.",
    icon: "🎯",
  },
  {
    id: "ler",
    name: "Leia a partitura",
    short: "Nota na pauta → ache no braço.",
    desc: "Treina leitura à primeira vista na clave de sol.",
    icon: "🎼",
  },
  {
    id: "ouvido",
    name: "Treino de ouvido",
    short: "Ouça a nota e ache no braço.",
    desc: "Desenvolve a relação som ↔ posição no instrumento.",
    icon: "👂",
  },
  {
    id: "intervalos",
    name: "Treino de intervalos",
    short: "Ouça duas notas e diga a distância.",
    desc: "Ear training funcional: reconheça 2ªs, 3ªs, 5ªs, oitavas… só de ouvido.",
    icon: "📏",
  },
  {
    id: "ditado",
    name: "Ditado rítmico",
    short: "Ouça o ritmo e escreva o que ouviu.",
    desc: "Reproduza o compasso montando as figuras rítmicas que escutou.",
    icon: "🥁",
  },
  {
    id: "tocar",
    name: "Toque de verdade",
    short: "Toque no seu violino — a gente escuta.",
    desc: "Usa o microfone pra avaliar afinação em tempo real.",
    icon: "🎤",
    beta: true,
  },
];

export function modeById(id: string): Mode {
  return MODES.find((m) => m.id === id) ?? MODES[0];
}
