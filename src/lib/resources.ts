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

export interface Video {
  id: string;
  topic: string;
  title: string;
}

// Vídeo-aulas embutidas em destaque, específicas por instrumento.
export const FEATURED_VIDEOS: Record<string, Video[]> = {
  violin: [
    { id: "uU-mmYqomFU", topic: "Postura", title: "Como segurar o violino corretamente" },
    { id: "2omKx30Ve08", topic: "Afinação", title: "Como afinar o violino, passo a passo" },
    { id: "ebDzih1xOBk", topic: "Arco", title: "Como segurar o arco corretamente — exercícios e erros comuns" },
    { id: "XdSni7ked70", topic: "Mudança de posição", title: "Mudança de posição no violino — como fazer e nota de passagem" },
    { id: "v0lIfsKCDQs", topic: "Vibrato", title: "O jeito certo de fazer o vibrato no violino" },
    { id: "4P03PG9KP3c", topic: "Rotina de estudo", title: "Como organizar os estudos com um planner semanal" },
  ],
  viola: [
    { id: "o7wZ2jUBBik", topic: "Postura", title: "Viola de arco — postura e como segurar (aula 2)" },
    { id: "8jJGz2Gl44w", topic: "Afinação (CCB)", title: "Viola de Arco CCB (Tenor) — afinação" },
    { id: "TY-bRbIN5D4", topic: "Arco", title: "Empunhadura do arco — como segurar o arco da viola" },
    { id: "VY_-h369t1E", topic: "Mudança de posição", title: "Viola de arco — mudança de posição (resumo)" },
    { id: "ZVYVO1EJFhM", topic: "Vibrato (inglês)", title: "Viola vibrato — tutorial e exercícios (em inglês)" },
    { id: "4P03PG9KP3c", topic: "Rotina de estudo (geral)", title: "Como organizar os estudos musicais (planner semanal)" },
  ],
  cello: [
    { id: "AoG0Ec3r0fA", topic: "Postura", title: "Violoncelo do zero — postura e primeiros passos" },
    { id: "niwr8dZhQTY", topic: "Afinação", title: "Como afinar o violoncelo (para iniciantes)" },
    { id: "B60ZkHet5AA", topic: "Arco", title: "Tudo sobre o arco do violoncelo — com exercícios" },
    { id: "TCSEHBoBAw8", topic: "Mudança de posição", title: "Extensão e mudança de posição no violoncelo" },
    { id: "WEDjf2rAgOU", topic: "Vibrato", title: "Técnica de vibrato no violoncelo" },
    { id: "X7myPwvcX2A", topic: "Rotina de estudo", title: "O que estudar diariamente no violoncelo" },
  ],
};

export function featuredFor(instrumentId: string): Video[] {
  return FEATURED_VIDEOS[instrumentId] ?? FEATURED_VIDEOS.violin;
}

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

export const CHANNELS: Record<string, LinkItem[]> = {
  violin: [
    { name: "Violino Didático", url: "https://www.youtube.com/user/violinodidatico", note: "Maior canal de violino em português (Jean de Oliveira). Ótimo do zero, inclui vibrato." },
    { name: "Violin Hero", url: "https://www.youtube.com/c/ViolinHero", note: "Ney Aguiar — dicas e técnica de violino toda semana." },
    { name: "Para Violinistas", url: "https://www.youtube.com/results?search_query=Para+Violinistas", note: "Aulas para iniciantes, exercícios e dicas de estudo." },
  ],
  viola: [
    { name: "Como tocar Viola de Arco", url: "https://www.youtube.com/results?search_query=como+tocar+viola+de+arco+aula+gratuita", note: "Série de aulas gratuitas de viola do zero." },
    { name: "Viola de Arco — CCB", url: "https://www.youtube.com/results?search_query=viola+de+arco+ccb+tenor+aula", note: "Aulas voltadas ao naipe tenor da CCB." },
    { name: "Canais de violino ajudam também", url: "https://www.youtube.com/user/violinodidatico", note: "A técnica da mão esquerda e do arco é a mesma do violino." },
  ],
  cello: [
    { name: "Violoncelo (canal)", url: "https://www.youtube.com/c/Violoncelo/videos", note: "Aulas e técnica de violoncelo em português." },
    { name: "Primeiros Passos no Violoncelo", url: "https://www.youtube.com/playlist?list=PLevSlLjIM9xo7uCddqbdPI5i_JxNpfaCt", note: "Playlist para começar o cello do zero." },
    { name: "Cello para iniciantes", url: "https://www.youtube.com/results?search_query=cello+violoncelo+aula+iniciante", note: "Mais aulas de violoncelo para iniciantes." },
  ],
};

export function channelsFor(instrumentId: string): LinkItem[] {
  return CHANNELS[instrumentId] ?? CHANNELS.violin;
}

const INSTR_PT: Record<string, string> = { violin: "violino", viola: "viola", cello: "violoncelo" };

export function instrumentWord(instrumentId: string): string {
  return INSTR_PT[instrumentId] ?? "violino";
}

export function youtubeSearch(instrumentId: string, query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${instrumentWord(instrumentId)} ${query}`)}`;
}
