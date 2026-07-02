// Motor data-driven de instrumentos. Um instrumento é cordas + posições + clave.
// O braço é CROMÁTICO: cada posição lista as notas por semitom (offset da corda solta)
// com o dedo correspondente — inclui naturais E alteradas (Fá natural, Mi♭, etc.).

export type Clef = "treble" | "alto" | "bass";

export interface StringDef {
  name: string; // nome da corda solta (ex.: "Sol")
  midi: number; // MIDI da corda solta
}

/** Uma nota da posição: offset em semitons da corda solta + dedo usado. */
export interface FingerNote {
  semitone: number;
  finger: number; // 0 = corda solta
}

export interface Position {
  id: string;
  label: string;
  notes: FingerNote[];
}

export interface Instrument {
  id: string;
  name: string;
  strings: StringDef[]; // da mais grave para a mais aguda
  positions: Position[];
  clef: Clef;
}

/** Uma casa tocável: cruzamento de corda + semitom em uma posição. */
export interface Cell {
  stringIndex: number;
  semitone: number;
  finger: number;
  positionId: string;
  midi: number;
}

// Padrão cromático da 1ª posição do violino/viola (afinação em quintas):
// dedos 1,2,3 têm versão baixa e alta (meio-tom e tom); 4º dedo = quinta justa.
const VIOLIN_POS1: FingerNote[] = [
  { semitone: 0, finger: 0 },
  { semitone: 1, finger: 1 },
  { semitone: 2, finger: 1 },
  { semitone: 3, finger: 2 },
  { semitone: 4, finger: 2 },
  { semitone: 5, finger: 3 },
  { semitone: 6, finger: 3 },
  { semitone: 7, finger: 4 },
];
const VIOLIN_POS3: FingerNote[] = [
  { semitone: 0, finger: 0 },
  { semitone: 5, finger: 1 },
  { semitone: 6, finger: 1 },
  { semitone: 7, finger: 2 },
  { semitone: 8, finger: 2 },
  { semitone: 9, finger: 3 },
  { semitone: 10, finger: 3 },
  { semitone: 12, finger: 4 },
];

export const VIOLIN: Instrument = {
  id: "violin",
  name: "Violino",
  clef: "treble",
  strings: [
    { name: "Sol", midi: 55 },
    { name: "Ré", midi: 62 },
    { name: "Lá", midi: 69 },
    { name: "Mi", midi: 76 },
  ],
  positions: [
    { id: "pos1", label: "1ª posição", notes: VIOLIN_POS1 },
    { id: "pos3", label: "3ª posição", notes: VIOLIN_POS3 },
  ],
};

export const VIOLA: Instrument = {
  id: "viola",
  name: "Viola de arco",
  clef: "alto",
  strings: [
    { name: "Dó", midi: 48 },
    { name: "Sol", midi: 55 },
    { name: "Ré", midi: 62 },
    { name: "Lá", midi: 69 },
  ],
  positions: [
    { id: "pos1", label: "1ª posição", notes: VIOLIN_POS1 },
    { id: "pos3", label: "3ª posição", notes: VIOLIN_POS3 },
  ],
};

// Cello: 1ª posição cobre uma quarta justa; 1º dedo tem versão recuada (meio-tom).
const CELLO_POS1: FingerNote[] = [
  { semitone: 0, finger: 0 },
  { semitone: 1, finger: 1 },
  { semitone: 2, finger: 1 },
  { semitone: 3, finger: 2 },
  { semitone: 4, finger: 3 },
  { semitone: 5, finger: 4 },
];
const CELLO_POS_HIGH: FingerNote[] = [
  { semitone: 0, finger: 0 },
  { semitone: 5, finger: 1 },
  { semitone: 6, finger: 1 },
  { semitone: 7, finger: 2 },
  { semitone: 8, finger: 3 },
  { semitone: 9, finger: 4 },
];

export const CELLO: Instrument = {
  id: "cello",
  name: "Violoncelo",
  clef: "bass",
  strings: [
    { name: "Dó", midi: 36 },
    { name: "Sol", midi: 43 },
    { name: "Ré", midi: 50 },
    { name: "Lá", midi: 57 },
  ],
  positions: [
    { id: "pos1", label: "1ª posição", notes: CELLO_POS1 },
    { id: "pos3", label: "posição alta", notes: CELLO_POS_HIGH },
  ],
};

export const INSTRUMENTS: Record<string, Instrument> = { violin: VIOLIN, viola: VIOLA, cello: CELLO };
export const INSTRUMENT_LIST: Instrument[] = [VIOLIN, VIOLA, CELLO];

export function getPosition(inst: Instrument, positionId: string): Position {
  return inst.positions.find((p) => p.id === positionId) ?? inst.positions[0];
}

export function cellsForPosition(inst: Instrument, positionId: string): Cell[] {
  const pos = getPosition(inst, positionId);
  const cells: Cell[] = [];
  inst.strings.forEach((s, stringIndex) => {
    pos.notes.forEach((n) => {
      cells.push({ stringIndex, semitone: n.semitone, finger: n.finger, positionId, midi: s.midi + n.semitone });
    });
  });
  return cells;
}

/** Maior semitom da posição — usado para espaçar as casas no braço. */
export function maxSemitone(inst: Instrument, positionId: string): number {
  return Math.max(...getPosition(inst, positionId).notes.map((n) => n.semitone));
}

export function cellKey(c: { stringIndex: number; semitone: number; positionId: string }): string {
  return `${c.positionId}:${c.stringIndex}:${c.semitone}`;
}
