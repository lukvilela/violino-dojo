"use client";

import { useApp } from "@/lib/store";

export default function ResetButton() {
  const { resetProgress } = useApp();
  return (
    <button
      onClick={() => {
        if (confirm("Zerar todo o progresso (XP, sequência e domínio das notas)?")) resetProgress();
      }}
      className="underline-offset-2 hover:text-rose-600 hover:underline"
    >
      zerar progresso
    </button>
  );
}
