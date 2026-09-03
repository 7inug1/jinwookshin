import type { L } from "./i18n";

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: L;
  role: L;
  stack: string[];
  live?: string;
  repo?: string;
  image?: { src: string; alt: L };
  shot: "transcript" | "grid";
  decisions: { question: L; answer: L }[];
  body: { text: L; note?: L }[];
};

export const projects: Project[] = [
  {
    slug: "digestube",
    title: "Digestube",
    year: "2026",
    summary: {
      ko: "긴 영상을 문단으로 쪼개고 근거를 찾아 답하는 RAG 서비스. 수집·전사·검색·화면·배포를 혼자 진행했다.",
      en: "A RAG service that splits long videos into passages and answers with citations. I did ingestion, transcription, retrieval, UI, and deploy alone.",
    },
    role: { ko: "기획 · 구현 · 배포", en: "Product · build · deploy" },
    stack: ["Next.js", "TypeScript", "Whisper", "pgvector"],
    live: "https://example.com",
    repo: "https://github.com/7inug1",
    shot: "transcript",
    decisions: [
      {
        question: {
          ko: "유사도가 얼마나 가까워야 답하게 했나",
          en: "How close does similarity have to be before it answers",
        },
        answer: {
          ko: "임계값을 어디에 뒀고 그 값을 무엇과 비교해 골랐는지 적는다. 숫자와 판단이 같이 있어야 한다.",
          en: "Where the threshold sits, and what it was compared against. The number and the judgment belong together.",
        },
      },
      {
        question: {
          ko: "근거를 못 찾으면 어떻게 동작하나",
          en: "What happens when it finds no grounds",
        },
        answer: {
          ko: "답하지 않는 쪽을 택한 이유와, 그때 사용자에게 무엇을 보여주는지를 적는다.",
          en: "Why it declines to answer, and what the reader sees instead.",
        },
      },
      {
        question: {
          ko: "검토했지만 도입하지 않은 것",
          en: "What I considered and did not ship",
        },
        answer: {
          ko: "쓰지 않기로 한 기술과 그 이유. 쓴 것보다 안 쓴 것이 판단을 더 잘 보여줄 때가 있다.",
          en: "What I left out and why. Sometimes the omission shows the judgment better than the choice.",
        },
      },
    ],
    body: [
      {
        text: {
          ko: "영상 한 편은 문장 수천 개가 되고, 그중 질문과 관련 있는 건 대개 서너 문단이다. 문제는 그 서너 문단을 어떻게 고르느냐가 아니라, 고르지 못했을 때 무엇을 할 것이냐였다.",
          en: "One video becomes thousands of sentences, and usually only three or four passages matter. The hard part was not picking them. It was deciding what to do when nothing was close enough.",
        },
        note: {
          ko: "사이드노트다. 넓은 화면에서는 여백으로 나가고 좁으면 본문 아래로 내려온다.",
          en: "A sidenote. It moves into the margin on wide screens and falls below the text on narrow ones.",
        },
      },
      {
        text: {
          ko: "화제가 바뀌는 지점에서 문단을 나눴다. 고정 길이로 자르는 방식과 비교했을 때 무엇이 좋아지고 무엇이 나빠지는지를 재보고 골랐다.",
          en: "I split passages where the topic turns, and measured that against fixed-length chunks before choosing.",
        },
      },
    ],
  },
  {
    slug: "vizuden",
    title: "VIZUDEN",
    year: "2025",
    summary: {
      ko: "도메인을 사서 운영 중인 서비스. 오픈그래프 문제를 SSR이 필요하다고 판단해 Next.js로 이관했다.",
      en: "A service I bought a domain for and still run. Open Graph broke on the client, so I moved it to Next.js for server rendering.",
    },
    role: { ko: "기획 · 구현 · 운영", en: "Product · build · operate" },
    stack: ["Next.js", "TypeScript", "Vercel"],
    live: "https://example.com",
    repo: "https://github.com/7inug1",
    shot: "grid",
    decisions: [
      {
        question: { ko: "왜 SSR로 이관했나", en: "Why move to server rendering" },
        answer: {
          ko: "클라이언트 렌더링에서 메타 태그가 크롤러에 안 잡히던 상황과, 이관 후 무엇이 달라졌는지를 적는다.",
          en: "Crawlers never saw the meta tags on the client, and what changed after the move.",
        },
      },
    ],
    body: [
      {
        text: {
          ko: "링크를 공유했을 때 미리보기가 비어 있었다. 원인을 찾는 데 걸린 시간과 고치는 데 걸린 시간이 크게 달랐다.",
          en: "Shared links previewed as blank. Finding the cause took far longer than fixing it.",
        },
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
