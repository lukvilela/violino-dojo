"use client";

// Alterna claro/escuro adicionando a classe .dark no <html> e persistindo em localStorage.
// O flash inicial é evitado por um script inline no layout (roda antes da pintura).

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Ativar tema claro" : "Ativar tema escuro"}
      className="fixed right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-base shadow-sm transition hover:border-faint"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
