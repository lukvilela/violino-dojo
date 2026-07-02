// Motor data-driven de instrumentos. Um instrumento é apenas cordas + posições + clave.
// Adicionar viola/cello/violão depois é só acrescentar um objeto aqui.

export type Clef = "treble" | "alto" | "bass";

export interface StringDef {
  /** Nome da corda no idioma do instrumento (ex.: "Sol"). */
  name: string;
  /** MIDI da corda solta. */
  midi: number;
}

export interface Position {
  id: string;
  label: string;
  /** Offset em semitons a partir da corda solta para os dedos [0(solta),1,2,3,4]. */
  offsets: number[];
}

export interface Instrument {
  id: string;
  name: string;
  /** Cordas da mais grave para a mais aguda. */
  strings: StringDef[];
  positions: Position[];
  clef: Clef;
  /** Faixa de afinação aceita no modo microfone (semitons de tolerância p/ octave-jump). */
}

/** Uma "casa" tocável: cruzamento de corda + dedo em uma posição. */
export interface Cell {
  stringIndex: number;
  finger: number; // 0 = corda solta
  positionId: string;
  midi: number;
}

export const VIOLIN: Instrument = {
  id: "violin",
  name: "Violino",
  clef: "treble",
  strings: [
    { name: "Sol", midi: 55 }, // G3
    { name: "Ré", midi: 62 }, // D4
    { name: "Lá", midi: 69 }, // A4
    { name: "Mi", midi: 76 }, // E5
  ],
  positions: [
    // Padrão "2 alto" (escala maior) — mesmo formato de mão em todas as cordas.
    { id: "pos1", label: "1ª posição", offsets: [0, 2, 4, 5, 7] },
    // 3ª posição: 1º dedo a uma quarta justa da solta.
    { id: "pos3", label: "3ª posição", offsets: [0, 5, 7, 9, 10] },
  ],
};

// Viola: mesma técnica do violino (afinação em quintas), uma quinta abaixo. Clave de dó.
export const VIOLA: Instrument = {
  id: "viola",
  name: "Viola de arco",
  clef: "alto",
  strings: [
    { name: "Dó", midi: 48 }, // C3
    { name: "Sol", midi: 55 }, // G3
    { name: "Ré", midi: 62 }, // D4
    { name: "Lá", midi: 69 }, // A4
  ],
  positions: [
    { id: "pos1", label: "1ª posição", offsets: [0, 2, 4, 5, 7] },
    { id: "pos3", label: "3ª posição", offsets: [0, 5, 7, 9, 10] },
  ],
};

// Cello: quadro de mão diferente na 1ª posição (tom até o 1º dedo, depois meios-tons).
export const CELLO: Instrument = {
  id: "cello",
  name: "Violoncelo",
  clef: "bass",
  strings: [
    { name: "Dó", midi: 36 }, // C2
    { name: "Sol", midi: 43 }, // G2
    { name: "Ré", midi: 50 }, // D3
    { name: "Lá", midi: 57 }, // A3
  ],
  positions: [
    { id: "pos1", label: "1ª posição", offsets: [0, 2, 3, 4, 5] },
    { id: "pos3", label: "posição alta", offsets: [0, 5, 7, 8, 9] },
  ],
};

export const INSTRUMENTS: Record<string, Instrument> = {
  violin: VIOLIN,
  viola: VIOLA,
  cello: CELLO,
};

export const INSTRUMENT_LIST: Instrument[] = [VIOLIN, VIOLA, CELLO];

export function getPosition(inst: Instrument, positionId: string): Position {
  return inst.positions.find((p) => p.id === positionId) ?? inst.positions[0];
}

/** Gera todas as casas tocáveis de uma posição. */
export function cellsForPosition(inst: Instrument, positionId: string): Cell[] {
  const pos = getPosition(inst, positionId);
  const cells: Cell[] = [];
  inst.strings.forEach((s, stringIndex) => {
    pos.offsets.forEach((off, finger) => {
      cells.push({ stringIndex, finger, positionId, midi: s.midi + off });
    });
  });
  return cells;
}

export function cellKey(c: { stringIndex: number; finger: number; positionId: string }): string {
  return `${c.positionId}:${c.stringIndex}:${c.finger}`;
}
