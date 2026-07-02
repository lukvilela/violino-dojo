import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import ThemeToggle from "@/components/ThemeToggle";

const noFlashTheme = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Violino Dojo — treine notas, leitura e ouvido",
  description:
    "Você sabe a nota — agora ache ela no braço. Treinador de violino com leitura de partitura, treino de ouvido e feedback pelo microfone.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashTheme }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full">
        <ThemeToggle />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
