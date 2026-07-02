"use client";

// Estado global persistido em localStorage: preferências + progresso (XP, SRS, streak diário).

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Naming } from "./music/notes";
import { Cell, cellKey } from "./music/instruments";
import { CardStats, emptyCard, StatsMap } from "./music/srs";
import { LEVELS, Level, levelById } from "./music/curriculum";

const XP_PER_CORRECT = 10;

export interface Settings {
  instrumentId: string;
  levelId: string;
  naming: Naming;
  showNames: boolean;
}

export interface Progress {
  xp: number;
  totalAttempts: number;
  totalCorrect: number;
  bestStreak: number;
  stats: StatsMap;
  lastDay: string; // YYYY-MM-DD
  dayStreak: number;
}

interface AppState {
  settings: Settings;
  progress: Progress;
}

const DEFAULT_STATE: AppState = {
  settings: { instrumentId: "violin", levelId: "iniciante", naming: "solfege", showNames: false },
  progress: {
    xp: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    bestStreak: 0,
    stats: {},
    lastDay: "",
    dayStreak: 0,
  },
};

const STORAGE_KEY = "violino-dojo:v1";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(prev: string, today: string): boolean {
  const d = new Date(today);
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10) === prev;
}

interface Ctx extends AppState {
  setSetting: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
  recordResult: (cell: Cell, ok: boolean, streak: number) => void;
  recordEvent: (key: string, ok: boolean, streak: number) => void;
  resetProgress: () => void;
  currentLevel: Level;
  accuracy: number;
  ready: boolean;
}

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const loaded = useRef(false);

  // Carrega uma vez no cliente.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        setState({
          settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
          progress: { ...DEFAULT_STATE.progress, ...parsed.progress },
        });
      }
    } catch {
      /* ignora localStorage corrompido */
    }
    loaded.current = true;
    setReady(true);
  }, []);

  // Persiste em cada mudança (após o load inicial).
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* quota / modo privado */
    }
  }, [state]);

  const setSetting: Ctx["setSetting"] = (k, v) => {
    setState((s) => ({ ...s, settings: { ...s.settings, [k]: v } }));
  };

  const recordEvent: Ctx["recordEvent"] = (key, ok, streak) => {
    setState((s) => {
      const p = s.progress;
      const prev: CardStats = p.stats[key] ?? emptyCard();
      const card: CardStats = {
        seen: prev.seen + 1,
        correct: prev.correct + (ok ? 1 : 0),
        streak: ok ? prev.streak + 1 : 0,
        lastAttempt: p.totalAttempts,
      };
      const today = todayStr();
      let dayStreak = p.dayStreak;
      if (p.lastDay !== today) {
        dayStreak = isYesterday(p.lastDay, today) ? p.dayStreak + 1 : 1;
      }
      return {
        ...s,
        progress: {
          ...p,
          xp: p.xp + (ok ? XP_PER_CORRECT + Math.min(streak, 10) : 0),
          totalAttempts: p.totalAttempts + 1,
          totalCorrect: p.totalCorrect + (ok ? 1 : 0),
          bestStreak: Math.max(p.bestStreak, streak),
          stats: { ...p.stats, [key]: card },
          lastDay: today,
          dayStreak,
        },
      };
    });
  };

  const recordResult: Ctx["recordResult"] = (cell, ok, streak) => recordEvent(cellKey(cell), ok, streak);

  const resetProgress = () => setState((s) => ({ ...s, progress: DEFAULT_STATE.progress }));

  const currentLevel = useMemo(() => levelById(state.settings.levelId), [state.settings.levelId]);
  const accuracy = state.progress.totalAttempts
    ? state.progress.totalCorrect / state.progress.totalAttempts
    : 0;

  const value: Ctx = {
    ...state,
    setSetting,
    recordResult,
    recordEvent,
    resetProgress,
    currentLevel,
    accuracy,
    ready,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp fora do AppProvider");
  return ctx;
}

export { LEVELS };
