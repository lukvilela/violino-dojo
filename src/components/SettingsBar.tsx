"use client";

// Barra de preferências: instrumento, nível (só desbloqueados), idioma das notas, mostrar nomes.

import { useApp } from "@/lib/store";
import { LEVELS, unlockedLevels } from "@/lib/music/curriculum";
import { INSTRUMENT_LIST } from "@/lib/music/instruments";

const selectCls = "rounded-lg border border-line bg-surface px-2.5 py-1.5 text-ink outline-none focus:border-accent";

export default function SettingsBar() {
  const { settings, setSetting, progress } = useApp();
  const unlockedIds = new Set(unlockedLevels(progress.xp).map((l) => l.id));

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-surface p-3 text-sm">
      <label className="flex items-center gap-2">
        <span className="text-muted">Instrumento</span>
        <select value={settings.instrumentId} onChange={(e) => setSetting("instrumentId", e.target.value)} className={selectCls}>
          {INSTRUMENT_LIST.map((inst) => (
            <option key={inst.id} value={inst.id}>
              {inst.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2">
        <span className="text-muted">Nível</span>
        <select value={settings.levelId} onChange={(e) => setSetting("levelId", e.target.value)} className={selectCls}>
          {LEVELS.map((l) => (
            <option key={l.id} value={l.id} disabled={!unlockedIds.has(l.id)}>
              {l.name} {unlockedIds.has(l.id) ? "" : `🔒 ${l.xpToUnlock} XP`}
            </option>
          ))}
        </select>
      </label>

      <div className="inline-flex overflow-hidden rounded-lg border border-line">
        {(["solfege", "letter"] as const).map((n) => (
          <button key={n} onClick={() => setSetting("naming", n)} className={`seg ${settings.naming === n ? "seg-on" : ""}`}>
            {n === "solfege" ? "Dó Ré Mi" : "C D E"}
          </button>
        ))}
      </div>
    </div>
  );
}
