"use client";

// Braço do instrumento em SVG, CROMÁTICO. Cordas na vertical (grave→agudo, esq→dir);
// as casas ficam espaçadas pelo semitom real. Naturais e alteradas (♯/♭) têm cores
// diferentes. Cada casa é clicável e mostra o dedo (não o nome) — a nota vem no enunciado.

import { motion } from "framer-motion";
import { Cell, cellKey, cellsForPosition, Instrument, getPosition, maxSemitone } from "@/lib/music/instruments";
import { Naming, shortName, isAccidental } from "@/lib/music/notes";

export type CellStatus = "idle" | "correct" | "wrong";

interface Props {
  instrument: Instrument;
  positionId: string;
  naming: Naming;
  showNames: boolean;
  poolKeys?: Set<string>;
  onPick?: (cell: Cell) => void;
  selectedKey?: string | null;
  status?: CellStatus;
  revealKey?: string | null;
  disabled?: boolean;
}

const W = 300;
const H = 470;
const NUT_Y = 46;
const BOTTOM_Y = 350;
const STR_LEFT = 66;
const STR_RIGHT = 234;

export default function Fingerboard({
  instrument,
  positionId,
  naming,
  showNames,
  poolKeys,
  onPick,
  selectedKey,
  status = "idle",
  revealKey,
  disabled,
}: Props) {
  const cells = cellsForPosition(instrument, positionId);
  const pos = getPosition(instrument, positionId);
  const maxSemi = maxSemitone(instrument, positionId) || 1;
  const nStr = instrument.strings.length;
  const stringX = (i: number) => STR_LEFT + (i * (STR_RIGHT - STR_LEFT)) / (nStr - 1);
  const semiY = (s: number) => NUT_Y + (s / maxSemi) * (BOTTOM_Y - NUT_Y);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[310px] select-none drop-shadow-sm" role="group" aria-label="Braço do instrumento">
      <defs>
        <linearGradient id="board" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b303d" />
          <stop offset="1" stopColor="#141821" />
        </linearGradient>
        <linearGradient id="boardEdge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a4150" />
          <stop offset="0.5" stopColor="#1b1f29" />
          <stop offset="1" stopColor="#3a4150" />
        </linearGradient>
      </defs>

      <rect x="40" y="20" width="220" height={H - 40} rx="26" fill="url(#boardEdge)" />
      <rect x="46" y="22" width="208" height={H - 44} rx="21" fill="url(#board)" />
      <rect x="44" y={NUT_Y - 12} width="212" height="9" rx="4" fill="#e8e9ee" />

      {/* nomes das cordas soltas */}
      {instrument.strings.map((s, i) => (
        <text key={`sn-${i}`} x={stringX(i)} y={NUT_Y - 22} textAnchor="middle" fill="#5b54e6" fontSize="14" fontWeight={600}>
          {s.name}
        </text>
      ))}

      {/* cordas */}
      {instrument.strings.map((_, i) => (
        <line key={`str-${i}`} x1={stringX(i)} y1={NUT_Y - 2} x2={stringX(i)} y2={H - 34} stroke="#cbcfd8" strokeWidth={1 + i * 0.5} opacity={0.85} />
      ))}

      {/* casas cromáticas */}
      {cells.map((c) => {
        const key = cellKey(c);
        const cx = stringX(c.stringIndex);
        const cy = semiY(c.semitone);
        const inPool = !poolKeys || poolKeys.has(key);
        const isSel = selectedKey === key;
        const isReveal = revealKey === key && status === "wrong";
        const acc = isAccidental(c.midi);

        // cor base: natural vs alterada (destaque de tom)
        let fill = acc ? "#4b3d6b" : "#2f3542";
        let stroke = acc ? "#8079f5" : "#5b6472";
        let textFill = "#e7e9f1";
        if (isSel && status === "correct") {
          fill = "#059669";
          stroke = "#6ee7b7";
        } else if (isSel && status === "wrong") {
          fill = "#e11d48";
          stroke = "#fda4af";
        } else if (isReveal) {
          fill = "#5b54e6";
          stroke = "#c7c4f8";
        }

        const label = showNames ? shortName(c.midi, naming) : String(c.finger);
        const r = acc ? 13 : 16;

        return (
          <motion.g
            key={key}
            onClick={() => !disabled && inPool && onPick?.(c)}
            style={{ cursor: disabled || !inPool ? "default" : "pointer" }}
            whileHover={disabled || !inPool ? undefined : { scale: 1.14 }}
            animate={isSel || isReveal ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
          >
            <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={isSel || isReveal ? 3 : 1.5} opacity={inPool ? 1 : 0.35} />
            <text x={cx} y={cy + (showNames ? 4 : 5)} textAnchor="middle" fontSize={showNames ? 11 : 13} fontWeight={700} fill={textFill} opacity={inPool ? 1 : 0.5}>
              {label}
            </text>
          </motion.g>
        );
      })}

      {/* legenda */}
      <g transform={`translate(0, ${H - 14})`}>
        <circle cx="70" cy="-2" r="5" fill="#2f3542" stroke="#5b6472" />
        <text x="80" y="2" fill="#9aa1ad" fontSize="11">natural</text>
        <circle cx="150" cy="-2" r="5" fill="#4b3d6b" stroke="#8079f5" />
        <text x="160" y="2" fill="#9aa1ad" fontSize="11">♯/♭</text>
        <text x={W / 2 + 40} y="2" textAnchor="middle" fill="#9aa1ad" fontSize="11">{pos.label}</text>
      </g>
    </svg>
  );
}
