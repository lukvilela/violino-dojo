// Repetição espaçada leve (estilo Leitner). O agendador puxa mais as casas fracas
// e as que você não vê há mais tempo, em vez de sortear tudo uniformemente.

import { Cell, cellKey } from "./instruments";

export interface CardStats {
  seen: number;
  correct: number;
  streak: number;
  /** Índice da última vez que apareceu (contador global de tentativas). */
  lastAttempt: number;
}

export type StatsMap = Record<string, CardStats>;

export function emptyCard(): CardStats {
  return { seen: 0, correct: 0, streak: 0, lastAttempt: -999 };
}

export function recordAnswer(card: CardStats, ok: boolean): CardStats {
  return {
    seen: card.seen + 1,
    correct: card.correct + (ok ? 1 : 0),
    streak: ok ? card.streak + 1 : 0,
    lastAttempt: card.seen, // placeholder; sobrescrito por quem tem o contador global
  };
}

/** Peso de sorteio: quanto pior a taxa de acerto e mais antiga a última vez, maior. */
function weight(card: CardStats | undefined, attempt: number): number {
  if (!card || card.seen === 0) return 6; // novidade tem prioridade alta
  const accuracy = card.correct / card.seen;
  const staleness = Math.min(1, (attempt - card.lastAttempt) / 12);
  const weakness = 1 - accuracy; // 0 = domina, 1 = sempre erra
  return 0.4 + weakness * 4 + staleness * 2;
}

/** Sorteio ponderado genérico por chave — serve casas do braço, intervalos, etc. */
export function pickWeightedKey<T>(
  items: T[],
  keyOf: (t: T) => string,
  stats: StatsMap,
  attempt: number,
  avoidKey?: string
): T {
  const candidates = items.filter((i) => keyOf(i) !== avoidKey);
  const list = candidates.length > 0 ? candidates : items;
  const weights = list.map((i) => weight(stats[keyOf(i)], attempt));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < list.length; i++) {
    r -= weights[i];
    if (r <= 0) return list[i];
  }
  return list[list.length - 1];
}

/** Escolhe a próxima casa do pool, evitando repetir a última. */
export function pickNext(pool: Cell[], stats: StatsMap, attempt: number, avoidKey?: string): Cell {
  return pickWeightedKey(pool, cellKey, stats, attempt, avoidKey);
}

/** Quantas casas do pool já foram "dominadas" (>=3 acertos seguidos). */
export function masteredCount(pool: Cell[], stats: StatsMap): number {
  return pool.filter((c) => (stats[cellKey(c)]?.streak ?? 0) >= 3).length;
}
