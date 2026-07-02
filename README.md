# 🎻 Violino Dojo

Treinador web para quem está aprendendo instrumentos de corda. Você sabe a nota — agora ache ela no braço, leia partitura, treine o ouvido e o ritmo, tudo com o **som real** do instrumento.

**Ao vivo:** https://violino-dojo.vercel.app

## O que tem

- **Explorar o braço** — toque qualquer nota e ouça o som real (familiarização)
- **Ache a nota** — mostramos o nome, você acha a corda + o dedo
- **Leia a partitura** — nota na pauta → ache no braço
- **Treino de ouvido** — ouça a nota e localize
- **Treino de intervalos** — identifique a distância entre duas notas (ear training funcional)
- **Ditado rítmico** — ouça o compasso e remonte o ritmo (sílabas Kodály)
- **Toque de verdade** — toque no seu instrumento e o microfone avalia a afinação
- **Teoria musical** — trilha de estudo em 16 fases, com lição e quiz por nível

Suporta **violino, viola e violoncelo** (motor data-driven), com **modo claro e escuro**, XP, sequências e repetição espaçada (SRS).

## Stack

Next.js · TypeScript · Tailwind CSS · Framer Motion · [VexFlow](https://www.vexflow.com/) (notação) · [smplr](https://github.com/danigb/smplr) (amostras reais) · [pitchy](https://github.com/ianprime0509/pitchy) (detecção de altura pelo microfone).

## Rodar localmente

```bash
npm install
npm run dev
```

## Créditos de estudo

A progressão é inspirada nos métodos Suzuki, Sassmannshaus e na estrutura de fases do MSA (Congregação Cristã no Brasil). O conteúdo e as questões da seção de teoria são **originais**, escritos como material de apoio — não substituem o método oficial nem os Grupos de Estudos Musicais.
