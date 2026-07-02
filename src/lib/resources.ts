// Curadoria de recursos externos: método oficial da CCB (MSA/MOO), dicas por tópico
// (com atalho pra aulas no YouTube adaptadas ao instrumento) e canais recomendados.

export interface Tip {
  id: string;
  title: string;
  tip: string;
  query: string; // termo de busca no YouTube (o instrumento é somado na hora)
}

export const TIPS: Tip[] = [
  {
    id: "postura",
    title: "Postura e como segurar",
    tip: "Relaxe ombros e pescoço e mantenha o pulso esquerdo neutro. O polegar apenas apoia — quem sustenta é o conjunto do braço. Uma postura relaxada evita dor e melhora a afinação.",
    query: "postura como segurar iniciante",
  },
  {
    id: "arco",
    title: "Arco e arcada",
    tip: "Segure o arco com os dedos curvos e soltos (mão em 'C') e use o peso do braço, não força. Puxe o arco reto, paralelo ao cavalete, mantendo o ponto de contato constante.",
    query: "como segurar o arco arcada",
  },
  {
    id: "afinacao",
    title: "Afinação e ouvido",
    tip: "Afine primeiro as cordas soltas (elas estão em quintas): toque duas juntas e ouça os 'batimentos' sumirem quando afina. Treine o ouvido no modo Microfone e no Treino de ouvido daqui.",
    query: "como afinar afinação cordas",
  },
  {
    id: "vibrato",
    title: "Vibrato",
    tip: "Só comece o vibrato quando a 1ª posição já estiver firme e afinada. É uma oscilação da altura vinda do pulso/braço, não dos dedos. Treine bem devagar com metrônomo, uma oscilação por tempo, e vá acelerando.",
    query: "vibrato iniciante exercício",
  },
  {
    id: "mudanca",
    title: "Mudança de posição",
    tip: "Relaxe o polegar e deixe a mão deslizar leve pela corda, sem apertar. Antecipe mentalmente a nota-alvo e ouça se chegou afinado. Comece com deslizes lentos entre a 1ª e a 3ª posição.",
    query: "mudança de posição 1a para 3a",
  },
  {
    id: "rotina",
    title: "Rotina de estudo",
    tip: "Pouco e sempre rende mais: 15–20 min por dia. Comece com cordas soltas e uma escala no metrônomo, depois trabalhe um trecho difícil em câmera lenta. Termine tocando algo de que você gosta.",
    query: "exercícios diários rotina de estudo iniciante",
  },
];

export interface LinkItem {
  name: string;
  url: string;
  note: string;
}

export const OFFICIAL: LinkItem[] = [
  {
    name: "MSA — Método oficial (CCB)",
    url: "https://congregacaocristanobrasil.org.br/musica/msa",
    note: "Página oficial do Método Simplificado de Aprendizagem Musical.",
  },
  {
    name: "MOO — Manual de Orientação Orquestral",
    url: "https://moo.congregacao.org.br/",
    note: "Catálogo por naipe com vídeos de técnica de cada instrumento.",
  },
];

export const CHANNELS: LinkItem[] = [
  {
    name: "Violino Didático",
    url: "https://www.youtube.com/user/violinodidatico",
    note: "Maior canal de violino em português (Jean de Oliveira). Ótimo do zero, inclui vibrato.",
  },
  {
    name: "Violin Hero",
    url: "https://www.youtube.com/c/ViolinHero",
    note: "Ney Aguiar — dicas e técnica de violino toda semana.",
  },
  {
    name: "Para Violinistas",
    url: "https://www.youtube.com/results?search_query=Para+Violinistas",
    note: "Aulas para iniciantes, exercícios e dicas de estudo.",
  },
  {
    name: "Violoncelo (canal)",
    url: "https://www.youtube.com/c/Violoncelo/videos",
    note: "Aulas e técnica de violoncelo em português.",
  },
];

const INSTR_PT: Record<string, string> = { violin: "violino", viola: "viola", cello: "violoncelo" };

export function instrumentWord(instrumentId: string): string {
  return INSTR_PT[instrumentId] ?? "violino";
}

export function youtubeSearch(instrumentId: string, query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${instrumentWord(instrumentId)} ${query}`)}`;
}
