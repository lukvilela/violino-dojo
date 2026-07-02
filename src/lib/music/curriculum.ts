// Progressão: primeiro só notas naturais (sem sustenidos/bemóis) nas cordas do meio,
// depois todas as cordas, depois entram as alteradas, e por fim a posição alta.

import { Cell, cellsForPosition, Instrument } from "./instruments";
import { isAccidental } from "./notes";

export interface Level {
  id: string;
  name: string;
  hint: string;
  filter: (c: Cell) => boolean;
  positionId: string;
  xpToUnlock: number;
}

export const LEVELS: Level[] = [
  {
    id: "iniciante",
    name: "Naturais (cordas do meio)",
    hint: "Só notas naturais nas duas cordas do meio — sem sustenidos nem bemóis.",
    positionId: "pos1",
    filter: (c) => (c.stringIndex === 1 || c.stringIndex === 2) && !isAccidental(c.midi),
    xpToUnlock: 0,
  },
  {
    id: "quatro-cordas",
    name: "Naturais (todas as cordas)",
    hint: "Todas as notas naturais da 1ª posição, nas 4 cordas.",
    positionId: "pos1",
    filter: (c) => !isAccidental(c.midi),
    xpToUnlock: 150,
  },
  {
    id: "acidentes",
    name: "Com sustenidos e bemóis",
    hint: "Agora entram as alteradas: diferencie Fá de Fá♯, Mi de Mi♭, etc.",
    positionId: "pos1",
    filter: () => true,
    xpToUnlock: 400,
  },
  {
    id: "posicao-alta",
    name: "Posição alta",
    hint: "Sobe a mão para a região mais aguda (3ª posição no violino/viola).",
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
