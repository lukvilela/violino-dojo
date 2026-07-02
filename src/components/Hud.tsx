"use client";

// Faixa de progresso: nível atual, barra de XP até o próximo, sequência diária e precisão.

import { useApp } from "@/lib/store";
import { LEVELS } from "@/lib/music/curriculum";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-base font-semibold text-ink">{value}</span>
      <span className="text-[11px] uppercase tracking-wide text-faint">{label}</span>
    </div>
  );
}

export default function Hud() {
  const { progress, accuracy } = useApp();
  const xp = progress.xp;

  const unlocked = LEVELS.filter((l) => xp >= l.xpToUnlock);
  const current = unlocked[unlocked.length - 1] ?? LEVELS[0];
  const next = LEVELS.find((l) => l.xpToUnlock > xp);
  const base = current.xpToUnlock;
  const ceil = next?.xpToUnlock ?? base + 500;
  const pct = Math.min(100, Math.round(((xp - base) / (ceil - base)) * 100));

  return (
    <div className="card p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-wide text-faint">Nível</div>
          <div className="font-semibold text-ink">{current.name}</div>
        </div>
        <div className="flex gap-5">
          <Stat label="XP" value={String(xp)} />
          <Stat label="dias" value={`${progress.dayStreak}🔥`} />
          <Stat label="precisão" value={`${Math.round(accuracy * 100)}%`} />
          <Stat label="recorde" value={String(progress.bestStreak)} />
        </div>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-1.5 text-right text-[11px] text-faint">
        {next ? `${ceil - xp} XP até "${next.name}"` : "nível máximo alcançado"}
      </div>
    </div>
  );
}
