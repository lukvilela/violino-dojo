// Núcleo de teoria musical — tudo gira em torno do número MIDI como identidade de altura.

export const LETTERS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
export const SOLFEGE = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"] as const;

export type Naming = "solfege" | "letter";

export function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function freqToMidi(freq: number): number {
  return 69 + 12 * Math.log2(freq / 440);
}

/** Diferença em cents entre uma frequência detectada e um alvo MIDI (negativo = grave). */
export function centsOff(freq: number, targetMidi: number): number {
  return 1200 * Math.log2(freq / midiToFreq(targetMidi));
}

export function pitchClass(midi: number): number {
  return ((midi % 12) + 12) % 12;
}

export function octave(midi: number): number {
  return Math.floor(midi / 12) - 1;
}

export interface NameOptions {
  naming?: Naming;
  showOctave?: boolean;
}

export function midiToName(midi: number, { naming = "solfege", showOctave = false }: NameOptions = {}): string {
  const table = naming === "solfege" ? SOLFEGE : LETTERS;
  const base = table[pitchClass(midi)];
  return showOctave ? `${base}${octave(midi)}` : base;
}

/** Nome curto sem oitava, útil pra labels de botões. */
export function shortName(midi: number, naming: Naming = "solfege"): string {
  return midiToName(midi, { naming, showOctave: false });
}
