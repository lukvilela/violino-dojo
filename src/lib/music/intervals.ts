// Treino de intervalos (ear training funcional): reconhecer a distância entre 2 notas.

export interface Interval {
  semitones: number;
  name: string; // nome completo pt
  short: string; // rótulo curto
  ref?: string; // música-âncora (mnemônico clássico)
}

export const INTERVALS: Interval[] = [
  { semitones: 0, name: "Uníssono", short: "1J" },
  { semitones: 1, name: "2ª menor", short: "2m", ref: "Tubarão" },
  { semitones: 2, name: "2ª maior", short: "2M", ref: "Parabéns a você" },
  { semitones: 3, name: "3ª menor", short: "3m", ref: "Hey Jude" },
  { semitones: 4, name: "3ª maior", short: "3M", ref: "Oh When the Saints" },
  { semitones: 5, name: "4ª justa", short: "4J", ref: "Hino / Casamento" },
  { semitones: 6, name: "Trítono", short: "TT", ref: "The Simpsons" },
  { semitones: 7, name: "5ª justa", short: "5J", ref: "Star Wars" },
  { semitones: 8, name: "6ª menor", short: "6m" },
  { semitones: 9, name: "6ª maior", short: "6M", ref: "NBC" },
  { semitones: 10, name: "7ª menor", short: "7m" },
  { semitones: 11, name: "7ª maior", short: "7M" },
  { semitones: 12, name: "Oitava", short: "8J", ref: "Somewhere Over the Rainbow" },
];

export type IntervalDir = "asc" | "desc" | "harm";

export const DIRECTIONS: { id: IntervalDir; label: string }[] = [
  { id: "asc", label: "↑ Ascendente" },
  { id: "desc", label: "↓ Descendente" },
  { id: "harm", label: "⇊ Harmônico" },
];

export interface IntervalLevel {
  id: string;
  name: string;
  semis: number[];
}

export const INTERVAL_LEVELS: IntervalLevel[] = [
  { id: "basico", name: "Básico", semis: [2, 4, 7, 12] },
  { id: "intermediario", name: "Intermediário", semis: [1, 2, 3, 4, 5, 7, 9, 12] },
  { id: "avancado", name: "Avançado", semis: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
];

export function intervalsFor(semis: number[]): Interval[] {
  return INTERVALS.filter((i) => semis.includes(i.semitones));
}

export function intervalBySemis(semi: number): Interval {
  return INTERVALS.find((i) => i.semitones === semi) ?? INTERVALS[0];
}

export function intervalKey(semi: number): string {
  return `int:${semi}`;
}

export function levelById(id: string): IntervalLevel {
  return INTERVAL_LEVELS.find((l) => l.id === id) ?? INTERVAL_LEVELS[0];
}
