// Progressão inspirada no Suzuki/Sassmannshaus: começa em poucas cordas/dedos e expande.
// Cada nível define quais casas entram no "pool" de perguntas.

import { Cell, cellsForPosition, Instrument } from "./instruments";

export interface Level {
  id: string;
  name: string;
  hint: string;
  /** Filtro sobre as casas do instrumento. */
  filter: (c: Cell) => boolean;
  positionId: string;
  xpToUnlock: number;
}

// Índices de corda no violino: 0=Sol 1=Ré 2=Lá 3=Mi
export const LEVELS: Level[] = [
  {
    id: "iniciante",
    name: "Primeiros passos",
    hint: "As duas cordas do meio, dedos 0 a 3 — o começo do método Suzuki.",
    positionId: "pos1",
    filter: (c) => (c.stringIndex === 1 || c.stringIndex === 2) && c.finger <= 3,
    xpToUnlock: 0,
  },
  {
    id: "quatro-cordas",
    name: "Todas as cordas",
    hint: "As 4 cordas, dedos 0 a 3 — incluindo as extremas.",
    positionId: "pos1",
    filter: (c) => c.finger <= 3,
    xpToUnlock: 150,
  },
  {
    id: "pinky",
    name: "Entra o 4º dedo",
    hint: "Todas as cordas com o mindinho (4º dedo).",
    positionId: "pos1",
    filter: () => true,
    xpToUnlock: 400,
  },
  {
    id: "terceira",
    name: "Posição alta",
    hint: "Sobe a mão pra região mais aguda (3ª posição no violino/viola).",
    positionId: "pos3",
    filter: (c) => c.finger >= 1,
    xpToUnlock: 800,
  },
];

export function levelPool(inst: Instrument, level: Level): Cell[] {
  return cellsForPosition(inst, level.positionId).filter(level.filter);
}

export function levelById(id: string): Level {
  return LEVELS.find((l) => l.id === id) ?? LEVELS[0];
}

export function unlockedLevels(xp: number): Level[] {
  return LEVELS.filter((l) => xp >= l.xpToUnlock);
}
