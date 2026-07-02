// Ditado rítmico: cada "célula" preenche um tempo (uma semínima). O aluno ouve o
// compasso e o remonta escolhendo as células. Sílabas no estilo Kodály (tá, ti-ti…).

export interface RhythmCell {
  id: string;
  syllable: string;
  glyph: string;
  onsets: number[]; // ataques dentro do tempo (0..1); vazio = pausa
  vf: string[]; // durações VexFlow para notar o tempo
  rest?: boolean;
}

export const CELLS: Record<string, RhythmCell> = {
  q: { id: "q", syllable: "tá", glyph: "♩", onsets: [0], vf: ["q"] },
  ee: { id: "ee", syllable: "ti-ti", glyph: "♫", onsets: [0, 0.5], vf: ["8", "8"] },
  rest: { id: "rest", syllable: "(pausa)", glyph: "𝄽", onsets: [], vf: ["qr"], rest: true },
  ssss: { id: "ssss", syllable: "ti-ri-ti-ri", glyph: "♬", onsets: [0, 0.25, 0.5, 0.75], vf: ["16", "16", "16", "16"] },
  ess: { id: "ess", syllable: "ti-tiri", glyph: "♪♬", onsets: [0, 0.5, 0.75], vf: ["8", "16", "16"] },
  sse: { id: "sse", syllable: "tiri-ti", glyph: "♬♪", onsets: [0, 0.25, 0.5], vf: ["16", "16", "8"] },
};

export interface RhythmLevel {
  id: string;
  name: string;
  cellIds: string[];
}

export const RHYTHM_LEVELS: RhythmLevel[] = [
  { id: "facil", name: "Fácil", cellIds: ["q", "ee", "rest"] },
  { id: "medio", name: "Médio", cellIds: ["q", "ee", "rest", "ssss"] },
  { id: "dificil", name: "Difícil", cellIds: ["q", "ee", "rest", "ssss", "ess", "sse"] },
];

export const BEATS = 4;

export function levelById(id: string): RhythmLevel {
  return RHYTHM_LEVELS.find((l) => l.id === id) ?? RHYTHM_LEVELS[0];
}

/** Sorteia um compasso garantindo que não fique quase todo em pausa. */
export function randomPattern(level: RhythmLevel): string[] {
  for (let tries = 0; tries < 20; tries++) {
    const pattern = Array.from({ length: BEATS }, () => level.cellIds[Math.floor(Math.random() * level.cellIds.length)]);
    const sounding = pattern.filter((id) => !CELLS[id].rest).length;
    if (sounding >= 2) return pattern;
  }
  return Array.from({ length: BEATS }, () => "q");
}
