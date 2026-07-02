"use client";

// Renderiza uma nota única numa pauta com VexFlow (modo leitura de partitura).

import { useEffect, useRef } from "react";
import { Renderer, Stave, StaveNote, Formatter, Accidental } from "vexflow";
import { Clef } from "@/lib/music/instruments";
import { octave, pitchClass } from "@/lib/music/notes";

const VEX_LETTERS = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];

function midiToVex(midi: number): { key: string; acc: string | null } {
  const name = VEX_LETTERS[pitchClass(midi)];
  const acc = name.includes("#") ? "#" : null;
  const letter = name[0];
  return { key: `${letter}${acc ?? ""}/${octave(midi)}`, acc };
}

export default function StaffView({ midi, clef = "treble" }: { midi: number; clef?: Clef }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";

    const width = 220;
    const height = 170;
    const renderer = new Renderer(el, Renderer.Backends.SVG);
    renderer.resize(width, height);
    const ctx = renderer.getContext();

    const stave = new Stave(6, 24, width - 16);
    stave.addClef(clef);
    stave.setContext(ctx).draw();

    const { key, acc } = midiToVex(midi);
    const note = new StaveNote({ keys: [key], duration: "q", clef });
    if (acc) note.addModifier(new Accidental(acc), 0);

    Formatter.FormatAndDraw(ctx, stave, [note]);
  }, [midi, clef]);

  return <div ref={ref} className="vf-staff mx-auto" aria-label="Nota na pauta" />;
}
