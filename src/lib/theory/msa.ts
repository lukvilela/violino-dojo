// Trilha de teoria musical organizada nas 16 Fases do MSA (Método Simplificado de
// Aprendizagem Musical — CCB). Conteúdo e questões ORIGINAIS, escritos do zero a partir
// de teoria musical geral; a estrutura de fases serve apenas como roteiro de estudo.

export interface Question {
  q: string;
  options: string[];
  answer: number; // índice da opção correta
  explain: string;
}

export interface Section {
  title: string;
  body: string[]; // parágrafos
}

export interface Phase {
  id: number;
  title: string;
  subtitle: string;
  topics: string[];
  sections: Section[];
  questions: Question[];
}

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "Fase 1 — O som e as notas",
    subtitle: "Os fundamentos: o que é música, as propriedades do som, as notas, a pauta e as claves.",
    topics: ["Música e som", "Elementos da música", "Propriedades do som", "Notas musicais", "Pentagrama", "Claves"],
    sections: [
      {
        title: "Música e seus elementos",
        body: [
          "Música é a arte de organizar sons e silêncios ao longo do tempo. Ela se apoia em três elementos: a melodia (sons em sequência, um após o outro), a harmonia (sons soando ao mesmo tempo) e o ritmo (a organização das durações no tempo).",
          "O silêncio é tão importante quanto o som: as pausas fazem parte da música e dão sentido às frases.",
        ],
      },
      {
        title: "As quatro propriedades do som",
        body: [
          "Todo som tem quatro propriedades. Altura: se o som é grave ou agudo. Duração: se é longo ou curto. Intensidade: se é forte ou fraco. Timbre: a 'cor' do som, que faz reconhecer se quem tocou foi um violino, uma flauta ou uma voz.",
          "Na leitura musical, a altura é mostrada pela posição da nota na pauta, e a duração pelo desenho da figura.",
        ],
      },
      {
        title: "Notas, pauta e claves",
        body: [
          "Existem 7 notas — dó, ré, mi, fá, sol, lá, si — que se repetem em ciclos chamados oitavas.",
          "A pauta (ou pentagrama) tem 5 linhas e 4 espaços, contados de baixo para cima. As notas ficam sobre as linhas e nos espaços.",
          "A clave, no início da pauta, define o nome de cada linha e espaço. A clave de sol fixa o sol na 2ª linha; a clave de fá fixa o fá na 4ª linha; a clave de dó fixa o dó na linha em que estiver.",
        ],
      },
    ],
    questions: [
      { q: "Quantas notas musicais existem?", options: ["5", "6", "7", "8"], answer: 2, explain: "São 7: dó, ré, mi, fá, sol, lá, si — que se repetem em oitavas." },
      { q: "A propriedade que distingue um som grave de um agudo é a…", options: ["intensidade", "altura", "timbre", "duração"], answer: 1, explain: "Altura = grave/agudo. Intensidade = forte/fraco." },
      { q: "O que permite reconhecer um violino de um piano tocando a mesma nota?", options: ["a altura", "a duração", "o timbre", "a intensidade"], answer: 2, explain: "O timbre é a 'cor' do som, própria de cada instrumento ou voz." },
      { q: "Quantas linhas tem a pauta musical?", options: ["4", "5", "6", "11"], answer: 1, explain: "A pauta tem 5 linhas e 4 espaços." },
      { q: "A clave de sol fixa a nota sol em qual linha?", options: ["1ª linha", "2ª linha", "3ª linha", "4ª linha"], answer: 1, explain: "A clave de sol enrola-se sobre a 2ª linha, que passa a ser o sol." },
    ],
  },
  {
    id: 2,
    title: "Fase 2 — Figuras e compasso",
    subtitle: "Como se escreve a duração dos sons e como o tempo é dividido em compassos.",
    topics: ["Figuras musicais", "Compasso", "Barras de compasso", "Fórmula de compasso em 4", "Ritmo e pulsação"],
    sections: [
      {
        title: "Figuras de duração",
        body: [
          "As figuras mostram quanto tempo cada som dura. Da mais longa para a mais curta: semibreve, mínima, semínima, colcheia, semicolcheia, fusa e semifusa. Cada figura vale a metade da anterior.",
          "Para cada figura existe uma pausa equivalente, que representa o silêncio com a mesma duração.",
        ],
      },
      {
        title: "Compasso e barras",
        body: [
          "O compasso divide a música em partes iguais, separadas por barras de compasso verticais. A barra simples separa os compassos; a barra dupla marca o fim de uma seção; a barra final indica o fim da música.",
          "A fórmula de compasso são dois números no início: o de cima diz quantos tempos há em cada compasso; o de baixo diz qual figura vale um tempo. Em 4/4 há 4 tempos e a semínima vale 1 tempo.",
        ],
      },
      {
        title: "Ritmo e pulsação",
        body: [
          "A pulsação é a batida regular e constante, como as batidas de um relógio ou do coração. O ritmo é a combinação das durações (as figuras) apoiada sobre essa pulsação.",
        ],
      },
    ],
    questions: [
      { q: "Em 4/4, quantos tempos vale a semibreve?", options: ["1", "2", "3", "4"], answer: 3, explain: "A semibreve preenche o compasso 4/4 inteiro = 4 tempos." },
      { q: "Cada figura vale, em relação à anterior…", options: ["o dobro", "a metade", "o mesmo", "um terço"], answer: 1, explain: "Semibreve→mínima→semínima… cada uma vale metade da anterior." },
      { q: "No 4/4, o número de baixo (4) indica que a unidade de tempo é a…", options: ["semibreve", "mínima", "semínima", "colcheia"], answer: 2, explain: "O 4 de baixo representa a semínima como valor de 1 tempo." },
      { q: "A barra que indica o fim da música é a…", options: ["simples", "dupla", "final", "de repetição"], answer: 2, explain: "A barra final (uma fina + uma grossa) encerra a peça." },
      { q: "A batida regular e constante da música chama-se…", options: ["ritmo", "pulsação", "melodia", "timbre"], answer: 1, explain: "Pulsação é a batida estável; o ritmo se organiza sobre ela." },
    ],
  },
  {
    id: 3,
    title: "Fase 3 — Solfejo e regência",
    subtitle: "Ler ritmo, marcar o tempo, cantar as notas e conduzir o compasso.",
    topics: ["Endecagrama", "Leitura rítmica, métrica e solfejo", "Movimentos de condução", "Solfejo em 4", "Metrônomo"],
    sections: [
      {
        title: "Três formas de leitura",
        body: [
          "Leitura rítmica: ler apenas as durações (o ritmo), sem se preocupar com a altura. Leitura métrica: ler marcando o tempo com a mão ou o pé. Solfejo: cantar as notas pelo nome (dó, ré, mi…) na altura certa.",
          "A união das pautas da clave de sol e da clave de fá, ligadas, forma a chamada grande pauta (endecagrama), com 11 linhas ao todo.",
        ],
      },
      {
        title: "Condução e metrônomo",
        body: [
          "Os movimentos de condução (regência) são desenhos que a mão faz no ar para marcar cada tempo do compasso. No compasso de 4 tempos, o gesto passa por baixo, esquerda, direita e cima.",
          "O metrônomo é o aparelho que marca a pulsação em BPM (batidas por minuto). 120 BPM significa 120 batidas em um minuto — quanto maior o número, mais rápido.",
        ],
      },
    ],
    questions: [
      { q: "Solfejar é…", options: ["bater o ritmo com a mão", "cantar as notas pelo nome, na altura certa", "ler só as durações", "marcar o compasso"], answer: 1, explain: "Solfejo = cantar as notas com seus nomes e na altura correta." },
      { q: "O aparelho que marca a pulsação em BPM é o…", options: ["diapasão", "metrônomo", "afinador", "endecagrama"], answer: 1, explain: "O metrônomo marca as batidas por minuto." },
      { q: "120 BPM significa…", options: ["120 compassos", "120 notas", "120 batidas por minuto", "120 segundos"], answer: 2, explain: "BPM = batidas por minuto." },
      { q: "Os movimentos de condução servem para…", options: ["afinar", "marcar/reger os tempos do compasso", "escrever as notas", "medir a intensidade"], answer: 1, explain: "São os gestos de regência que marcam cada tempo." },
      { q: "A união das pautas de sol e fá forma o…", options: ["compasso", "endecagrama (grande pauta)", "intervalo", "acorde"], answer: 1, explain: "As duas pautas ligadas formam 11 linhas: o endecagrama." },
    ],
  },
  {
    id: 4,
    title: "Fase 4 — Ligadura, ponto, intervalo e novos compassos",
    subtitle: "Prolongar sons, aumentar durações, medir distâncias e reger em 3 e em 2.",
    topics: ["Ligadura", "Ponto de aumento", "Intervalo", "Compasso em 3", "Compasso em 2"],
    sections: [
      {
        title: "Ligadura e ponto de aumento",
        body: [
          "A ligadura de valor une duas figuras de mesma nota, somando as durações num só som contínuo. A ligadura de expressão (frase) une notas diferentes para tocá-las de forma ligada (legato).",
          "O ponto de aumento, colocado à direita da figura, acrescenta metade do valor dela. Uma semínima (1 tempo) pontuada passa a valer 1 tempo e meio.",
        ],
      },
      {
        title: "Intervalo e compassos de 3 e 2 tempos",
        body: [
          "Intervalo é a distância entre duas notas. Ele pode ser melódico (notas em sequência) ou harmônico (notas ao mesmo tempo).",
          "O compasso em 3 (3/4) tem 3 tempos; o compasso em 2 (2/4) tem 2 tempos. Cada um tem seu gesto de regência próprio.",
        ],
      },
    ],
    questions: [
      { q: "O ponto de aumento acrescenta à figura…", options: ["o dobro do valor", "metade do valor", "um quarto do valor", "nada, só separa"], answer: 1, explain: "O ponto vale metade da figura à qual está ligado." },
      { q: "Em 4/4, quanto vale uma semínima pontuada?", options: ["1 tempo", "1,5 tempo", "2 tempos", "0,5 tempo"], answer: 1, explain: "1 (semínima) + 0,5 (ponto) = 1,5 tempo." },
      { q: "A ligadura de valor une notas…", options: ["de alturas diferentes", "de mesma altura, somando as durações", "de compassos diferentes", "só pausas"], answer: 1, explain: "Une figuras da mesma nota, criando um som contínuo mais longo." },
      { q: "Quantos tempos tem o compasso 3/4?", options: ["2", "3", "4", "6"], answer: 1, explain: "O número de cima (3) indica 3 tempos por compasso." },
      { q: "Intervalo é…", options: ["a duração de uma nota", "a distância entre duas notas", "o silêncio", "a velocidade"], answer: 1, explain: "Intervalo é a distância (em altura) entre duas notas." },
    ],
  },
  {
    id: 5,
    title: "Fase 5 — Tercina, fermata e compasso composto",
    subtitle: "Dividir o tempo em três, prolongar sons livremente e sentir o 6/8.",
    topics: ["Tercinas", "Fermata", "Compasso em 6", "Solfejo em 6"],
    sections: [
      {
        title: "Tercina e fermata",
        body: [
          "A tercina é um grupo de três notas tocadas no tempo de duas iguais — ou seja, o tempo é dividido em três partes iguais em vez de duas. Costuma vir marcada com o número 3.",
          "A fermata é o símbolo (um arco com um ponto) que prolonga a duração de uma nota ou pausa além do seu valor, a critério do intérprete ou do regente.",
        ],
      },
      {
        title: "Compasso em 6 (6/8)",
        body: [
          "O 6/8 é um compasso composto: cabem 6 colcheias, mas elas são sentidas em 2 pulsos de 3 colcheias cada. Por isso balança em dois, com subdivisão ternária.",
        ],
      },
    ],
    questions: [
      { q: "A tercina divide o tempo em…", options: ["2 partes", "3 partes iguais", "4 partes", "6 partes"], answer: 1, explain: "Três notas no lugar de duas: o tempo é dividido em 3." },
      { q: "A fermata serve para…", options: ["acelerar", "prolongar a nota ou pausa", "abaixar a nota", "repetir"], answer: 1, explain: "Prolonga a duração além do valor escrito." },
      { q: "O 6/8 é um compasso…", options: ["simples", "composto", "alternado", "livre"], answer: 1, explain: "Cada pulso se divide em 3 — é composto." },
      { q: "Quantas colcheias cabem em um compasso 6/8?", options: ["3", "4", "6", "8"], answer: 2, explain: "O 8 embaixo = colcheia; o 6 em cima = seis delas." },
    ],
  },
  {
    id: 6,
    title: "Fase 6 — Tom, semitom, acidentes e escalas",
    subtitle: "As distâncias entre as notas, os sinais que as alteram e a escala maior.",
    topics: ["Tom e semitom", "Acidentes", "Escalas diatônicas", "Escalas maiores", "Sustenidos e bemóis"],
    sections: [
      {
        title: "Tom, semitom e acidentes",
        body: [
          "O semitom é a menor distância entre duas notas na música ocidental. Entre mi–fá e si–dó já existe um semitom natural. O tom equivale a dois semitons.",
          "Os acidentes alteram a altura: o sustenido (#) sobe a nota meio tom; o bemol (♭) abaixa meio tom; o bequadro (♮) cancela o acidente e volta a nota ao natural.",
        ],
      },
      {
        title: "Escalas",
        body: [
          "Escala é uma sucessão ordenada de notas por graus. A escala diatônica tem 7 notas, com 5 tons e 2 semitons.",
          "A escala maior segue sempre o padrão de tons (T) e semitons (st): T–T–st–T–T–T–st. Em dó maior isso acontece só com as notas naturais; em outras tonalidades entram sustenidos ou bemóis para manter o mesmo padrão.",
        ],
      },
    ],
    questions: [
      { q: "O sustenido (#) faz a nota…", options: ["subir meio tom", "descer meio tom", "subir um tom", "ficar natural"], answer: 0, explain: "O sustenido eleva a altura em um semitom." },
      { q: "Um tom equivale a quantos semitons?", options: ["1", "2", "3", "4"], answer: 1, explain: "1 tom = 2 semitons." },
      { q: "Entre as notas mi e fá há…", options: ["um tom", "um semitom", "dois tons", "nada"], answer: 1, explain: "Mi–fá e si–dó são semitons naturais." },
      { q: "O padrão de tons e semitons da escala maior é…", options: ["T–st–T–T–st–T–T", "T–T–st–T–T–T–st", "st–T–T–st–T–T–T", "T–T–T–st–T–T–st"], answer: 1, explain: "Maior = T–T–st–T–T–T–st." },
      { q: "O bequadro (♮) serve para…", options: ["subir a nota", "abaixar a nota", "cancelar o acidente", "repetir a nota"], answer: 2, explain: "O bequadro desfaz o sustenido/bemol, voltando ao natural." },
    ],
  },
  {
    id: 7,
    title: "Fase 7 — Armadura de clave e compassos 9 e 12",
    subtitle: "Os acidentes fixos no início da pauta e os grandes compostos.",
    topics: ["Armadura de clave", "Compasso em 9", "Compasso em 12"],
    sections: [
      {
        title: "Armadura de clave",
        body: [
          "A armadura de clave são os sustenidos ou bemóis colocados logo após a clave, no início de cada pauta. Eles valem para toda a música (em todas as oitavas), até que uma nova armadura os mude.",
          "A armadura indica a tonalidade da peça — por exemplo, um fá sustenido na armadura aponta para sol maior.",
        ],
      },
      {
        title: "Compassos 9/8 e 12/8",
        body: [
          "O 9/8 é composto e é sentido em 3 pulsos de 3 colcheias (9 colcheias no total). O 12/8 é composto e é sentido em 4 pulsos de 3 colcheias (12 colcheias no total).",
        ],
      },
    ],
    questions: [
      { q: "A armadura de clave fica…", options: ["no fim da música", "no início da pauta, logo após a clave", "em cada nota", "sobre a barra final"], answer: 1, explain: "Vem após a clave e antes da fórmula de compasso." },
      { q: "Quantas colcheias cabem em um compasso 9/8?", options: ["6", "8", "9", "12"], answer: 2, explain: "9/8 = nove colcheias, em 3 pulsos de 3." },
      { q: "O 12/8 é sentido em quantos pulsos?", options: ["2", "3", "4", "6"], answer: 2, explain: "Quatro pulsos de 3 colcheias cada." },
      { q: "A armadura de clave vale para…", options: ["só o primeiro compasso", "só a primeira nota", "toda a música, até mudar", "só a clave de sol"], answer: 2, explain: "Vale do início ao fim, enquanto não houver nova armadura." },
    ],
  },
  {
    id: 8,
    title: "Fase 8 — Tonalidade e acidentes ocorrentes",
    subtitle: "O centro tonal e os acidentes que aparecem no meio da música.",
    topics: ["Tonalidade", "Acidentes ocorrentes e de precaução"],
    sections: [
      {
        title: "Tonalidade",
        body: [
          "Tonalidade é o 'centro' em torno do qual a música gira, definido principalmente pela armadura de clave. Cada armadura corresponde a uma tonalidade maior (e à sua relativa menor).",
        ],
      },
      {
        title: "Acidentes ocorrentes e de precaução",
        body: [
          "O acidente ocorrente é o que aparece no meio do compasso (não está na armadura). Ele vale apenas até o fim daquele compasso; na barra seguinte, a nota volta ao que a armadura manda.",
          "O acidente de precaução costuma vir entre parênteses e serve apenas para lembrar o músico, evitando dúvidas — não é uma alteração nova.",
        ],
      },
    ],
    questions: [
      { q: "Um acidente ocorrente vale até…", options: ["o fim da música", "o fim do compasso", "a próxima nota", "a próxima pauta"], answer: 1, explain: "O acidente ocorrente vale só dentro do compasso em que aparece." },
      { q: "O acidente de precaução serve para…", options: ["alterar a nota obrigatoriamente", "lembrar o músico e evitar dúvida", "mudar a tonalidade", "acelerar"], answer: 1, explain: "É um lembrete (geralmente entre parênteses), não uma alteração nova." },
      { q: "A tonalidade é definida principalmente pela…", options: ["fórmula de compasso", "armadura de clave", "dinâmica", "fermata"], answer: 1, explain: "A armadura indica a tonalidade da peça." },
    ],
  },
  {
    id: 9,
    title: "Fase 9 — Sinais de repetição",
    subtitle: "Como a partitura manda repetir trechos sem reescrevê-los.",
    topics: ["Barra de repetição", "Casas 1 e 2", "Da Capo e Dal Segno"],
    sections: [
      {
        title: "Repetições",
        body: [
          "A barra de repetição (ritornello) tem dois pontos ao lado da barra e manda repetir o trecho entre os sinais.",
          "As casas 1 e 2 (primeira e segunda vez) indicam finais diferentes: na primeira vez toca-se a casa 1; ao repetir, pula-se para a casa 2.",
          "Da Capo (D.C.) manda voltar ao início; Dal Segno (D.S.) manda voltar até um sinal específico. A Coda marca um trecho final.",
        ],
      },
    ],
    questions: [
      { q: "O ritornello (barra de repetição) indica…", options: ["fim da música", "repetir o trecho", "acelerar", "abaixar o volume"], answer: 1, explain: "Os dois pontos junto à barra mandam repetir o trecho." },
      { q: "As 'casa 1' e 'casa 2' servem para…", options: ["dois andamentos", "finais diferentes na repetição", "duas claves", "dois instrumentos"], answer: 1, explain: "Primeira vez: casa 1; ao repetir, pula para a casa 2." },
      { q: "Da Capo (D.C.) manda…", options: ["parar", "voltar ao início", "ir para a coda direto", "repetir a última nota"], answer: 1, explain: "Da Capo = 'do começo': volta ao início." },
    ],
  },
  {
    id: 10,
    title: "Fase 10 — Dinâmica",
    subtitle: "A intensidade dos sons: do suave ao forte, e as transições.",
    topics: ["Dinâmica", "Sinais de intensidade", "Crescendo e diminuendo"],
    sections: [
      {
        title: "Intensidade",
        body: [
          "Dinâmica é a intensidade (volume) com que se toca. Os sinais mais comuns, do mais fraco ao mais forte: pp (pianíssimo), p (piano/fraco), mp (meio-piano), mf (meio-forte), f (forte), ff (fortíssimo).",
          "As transições graduais são o crescendo (aumentar aos poucos) e o diminuendo ou decrescendo (diminuir aos poucos), às vezes escritas como 'forquilhas' que abrem ou fecham.",
        ],
      },
    ],
    questions: [
      { q: "O sinal 'f' significa…", options: ["fraco", "forte", "rápido", "ligado"], answer: 1, explain: "f = forte." },
      { q: "O sinal 'p' significa…", options: ["forte", "fraco (piano)", "pausa", "pontuado"], answer: 1, explain: "p = piano = fraco." },
      { q: "Crescendo indica…", options: ["diminuir o som", "aumentar o som gradualmente", "acelerar", "parar"], answer: 1, explain: "Crescendo = aumentar a intensidade aos poucos." },
      { q: "O 'mf' significa…", options: ["muito forte", "meio-forte", "muito fraco", "sem dinâmica"], answer: 1, explain: "mf = mezzo-forte = meio-forte." },
    ],
  },
  {
    id: 11,
    title: "Fase 11 — Acento métrico e tipos de compasso",
    subtitle: "O tempo forte, e a diferença entre compasso simples e composto.",
    topics: ["Acento métrico", "Compasso simples", "Compasso composto", "Compassos alternados"],
    sections: [
      {
        title: "Acento e classificação dos compassos",
        body: [
          "O acento métrico é a ênfase natural sobre certos tempos; o 1º tempo do compasso é normalmente o mais forte.",
          "Compasso simples: cada tempo se divide em 2 partes iguais (ex.: 2/4, 3/4, 4/4). Compasso composto: cada tempo se divide em 3 partes iguais (ex.: 6/8, 9/8, 12/8).",
          "Compassos alternados são aqueles que mudam de fórmula ao longo da peça, alternando, por exemplo, entre 2/4 e 3/4.",
        ],
      },
    ],
    questions: [
      { q: "No compasso simples, cada tempo se divide em…", options: ["2", "3", "4", "6"], answer: 0, explain: "Simples = subdivisão binária (em 2)." },
      { q: "No compasso composto, cada tempo se divide em…", options: ["2", "3", "4", "5"], answer: 1, explain: "Composto = subdivisão ternária (em 3)." },
      { q: "O tempo mais forte do compasso costuma ser o…", options: ["último", "1º", "2º", "nenhum"], answer: 1, explain: "O acento métrico principal cai no 1º tempo." },
      { q: "O 6/8 é um compasso…", options: ["simples", "composto", "alternado", "livre"], answer: 1, explain: "Cada pulso se divide em 3: é composto." },
    ],
  },
  {
    id: 12,
    title: "Fase 12 — Síncopa e contratempo",
    subtitle: "Deslocar a acentuação para os tempos fracos.",
    topics: ["Síncopa", "Contratempo"],
    sections: [
      {
        title: "Acentuação deslocada",
        body: [
          "A síncopa acontece quando um som começa numa parte fraca do tempo e se prolonga sobre a parte forte, deslocando a acentuação natural. Cria aquela sensação de 'balanço'.",
          "O contratempo é o som que ocorre numa parte fraca enquanto a parte forte fica em silêncio (pausa). Diferente da síncopa, não há prolongamento sobre o forte — há um vazio nele.",
        ],
      },
    ],
    questions: [
      { q: "A síncopa desloca a acentuação porque o som…", options: ["começa e termina no tempo forte", "começa no fraco e se prolonga no forte", "só usa pausas", "acelera o andamento"], answer: 1, explain: "Começa em parte fraca e se prolonga sobre a forte." },
      { q: "No contratempo, o tempo forte normalmente tem…", options: ["um som acentuado", "uma pausa (silêncio)", "uma fermata", "um crescendo"], answer: 1, explain: "O som cai na parte fraca; o forte fica em silêncio." },
      { q: "Síncopa e contratempo trabalham com…", options: ["a afinação", "o timbre", "a acentuação e os tempos fracos", "a armadura"], answer: 2, explain: "Ambos exploram os tempos/partes fracas do compasso." },
    ],
  },
  {
    id: 13,
    title: "Fase 13 — Formas de início (ritmos iniciais)",
    subtitle: "De onde a música parte dentro do compasso.",
    topics: ["Início tético", "Anacruse", "Início acéfalo"],
    sections: [
      {
        title: "Tético, anacrústico e acéfalo",
        body: [
          "Início tético: a música começa no tempo forte, no 1º tempo do compasso.",
          "Início anacrústico: começa com uma ou mais notas antes do 1º tempo forte — essas notas de impulso são a anacruse (o compasso inicial fica incompleto).",
          "Início acéfalo: começa depois do início do tempo forte, ou seja, há uma pausa bem no começo do compasso e o som entra em seguida.",
        ],
      },
    ],
    questions: [
      { q: "O início tético começa…", options: ["antes do 1º tempo", "no tempo forte (1º tempo)", "depois de uma pausa no forte", "no fim do compasso"], answer: 1, explain: "Tético = começa direto no tempo forte." },
      { q: "A anacruse é…", options: ["uma pausa final", "nota(s) antes do primeiro tempo forte", "um acento no 1º tempo", "um sinal de repetição"], answer: 1, explain: "São notas de impulso antes do 1º tempo forte." },
      { q: "O início acéfalo começa…", options: ["no tempo forte", "após o início do tempo forte (com pausa no começo)", "antes do compasso", "sempre em 6/8"], answer: 1, explain: "Acéfalo = 'sem cabeça': há pausa no início do forte." },
    ],
  },
  {
    id: 14,
    title: "Fase 14 — Notas pontuadas e subdivisão",
    subtitle: "Como o ponto muda a divisão do tempo, sobretudo no compasso composto.",
    topics: ["Notas pontuadas", "Subdivisão simples x composta"],
    sections: [
      {
        title: "O ponto e a subdivisão",
        body: [
          "O ponto de aumento vale sempre metade da figura. Ele muda a forma como o tempo se subdivide.",
          "Nos compassos compostos (6/8, 9/8, 12/8), a unidade de tempo é uma figura pontuada — a semínima pontuada — que se divide naturalmente em 3 colcheias. Já no compasso simples a unidade se divide em 2.",
          "Células como colcheia pontuada + semicolcheia produzem o ritmo 'pontuado' (o famoso galope), muito comum nos hinos.",
        ],
      },
    ],
    questions: [
      { q: "Em 6/8, a unidade de tempo é a…", options: ["semínima", "semínima pontuada", "colcheia", "mínima"], answer: 1, explain: "A semínima pontuada = 3 colcheias, a pulsação do composto." },
      { q: "O ponto de aumento acrescenta…", options: ["o dobro", "a metade do valor da figura", "um terço", "um tempo fixo"], answer: 1, explain: "O ponto sempre vale metade da figura." },
      { q: "Colcheia pontuada + semicolcheia forma um ritmo…", options: ["uniforme", "pontuado (galope)", "sincopado", "de tercina"], answer: 1, explain: "É a célula pontuada, o 'galope' rítmico." },
    ],
  },
  {
    id: 15,
    title: "Fase 15 — Andamento",
    subtitle: "A velocidade da música e suas variações.",
    topics: ["Andamento", "Rallentando", "Modificação indevida"],
    sections: [
      {
        title: "Velocidade e suas mudanças",
        body: [
          "Andamento é a velocidade da pulsação. Termos comuns, do mais lento ao mais rápido: Largo e Adagio (lentos), Andante (moderado, 'andando'), Allegro (rápido) e Presto (muito rápido).",
          "As variações indicadas incluem o rallentando/ritardando (desacelerar aos poucos) e o accelerando (acelerar). 'Poco rallentando' pede um pequeno desaceleramento, comum no fim das frases.",
          "Modificar o andamento sem indicação na partitura é considerado erro (modificação indevida): a regularidade da pulsação deve ser mantida.",
        ],
      },
    ],
    questions: [
      { q: "Allegro indica um andamento…", options: ["muito lento", "moderado", "rápido", "livre"], answer: 2, explain: "Allegro = rápido/alegre." },
      { q: "Andante é um andamento…", options: ["muito rápido", "moderado ('andando')", "lentíssimo", "acelerado"], answer: 1, explain: "Andante = moderado, no passo de quem anda." },
      { q: "Rallentando significa…", options: ["acelerar", "desacelerar gradualmente", "parar", "repetir"], answer: 1, explain: "Rallentando/ritardando = ir ficando mais lento." },
      { q: "Alterar o andamento sem indicação é…", options: ["recomendado", "modificação indevida (erro)", "obrigatório", "um crescendo"], answer: 1, explain: "Sem indicação, mantém-se a pulsação: mudá-la é erro." },
    ],
  },
  {
    id: 16,
    title: "Fase 16 — Frase musical e interpretação",
    subtitle: "Dar sentido e expressão à música — o objetivo final do estudo.",
    topics: ["Frases e semifrases", "Interpretação musical", "Indicações interpretativas"],
    sections: [
      {
        title: "Frase e expressão",
        body: [
          "A frase musical é uma unidade da melodia com sentido próprio, como uma frase da fala; a semifrase é uma parte menor dela. Reconhecer as frases ajuda a saber onde 'respirar' e onde a música conclui uma ideia.",
          "Interpretar é executar respeitando a dinâmica, o andamento e a articulação (por exemplo, legato = ligado, staccato = curto e destacado), dando expressão à peça.",
          "No estudo da CCB, todo esse preparo tem um propósito: executar os hinos com qualidade e reverência, para um melhor louvor.",
        ],
      },
    ],
    questions: [
      { q: "Uma frase musical é…", options: ["um único som", "uma unidade melódica com sentido (como uma frase falada)", "um compasso", "uma pausa"], answer: 1, explain: "É uma ideia melódica completa, com começo e conclusão." },
      { q: "Staccato indica notas…", options: ["ligadas", "curtas e destacadas", "muito fortes", "muito lentas"], answer: 1, explain: "Staccato = curto/destacado; legato = ligado." },
      { q: "Interpretar bem é…", options: ["tocar o mais rápido possível", "respeitar dinâmica, andamento e expressão", "ignorar os sinais", "tocar sempre forte"], answer: 1, explain: "Interpretação = executar com fidelidade e expressão." },
      { q: "No estudo da CCB, o objetivo final é…", options: ["ganhar concursos", "executar os hinos com qualidade e reverência", "tocar rápido", "aprender só teoria"], answer: 1, explain: "Todo o preparo visa louvar com qualidade e reverência." },
    ],
  },
];

export function phaseById(id: number): Phase | undefined {
  return PHASES.find((p) => p.id === id);
}

export function phaseKey(phaseId: number, qIndex: number): string {
  return `msa:${phaseId}:${qIndex}`;
}
