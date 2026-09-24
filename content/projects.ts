import type { L } from "./i18n";
import { assertSlugs } from "./slug";

export type Project = {
  slug: string;
  title: string;
  /** 언어마다 표기가 다를 수 있다 (예: 현재 / Present) */
  year: L;
  summary: L;
  stack: string[];
  live?: string;
  repo?: string;
  image?: { src: string; alt: L; width: number; height: number };
  /** 화면 비율. 기본은 16:10, 세로가 긴 화면은 3:4 */
  imageAspect?: "16/10" | "3/4";
  /** 목록에서 스택을 세우는 방식. 이미지가 길면 세로로 세워 높이를 맞춘다 */
  stackLayout?: "inline" | "list";
  shot: "transcript" | "grid";
  decisions: { label: L; text: L }[];
  body: { text: L; note?: L }[];
};

export const projects: Project[] = [
  {
    slug: "digestube",
    title: "Digestube",
    year: { ko: "2026.08 - 현재", en: "2026.08 - Present" },
    summary: {
      ko: "유튜브 영상을 책처럼 읽는 서비스. 주소를 받아 전사하고 문단과 목차로 정리한 뒤, 질문과 뜻이 가까운 문단과 해당 영상 시점을 찾아 준다.",
      en: "Reads a YouTube video like a book. It transcribes a URL, organises the text into passages and a table of contents, and finds the passages, and the moments in the video, closest in meaning to a question.",
    },
    stack: ["PostgreSQL", "pgvector", "Supabase", "Gemini API", "KURE-v1", "TypeScript", "Next.js", "Vercel"],
    shot: "transcript",
    image: {
      src: "/shot-dg-1.jpg",
      width: 900,
      height: 5523,
      alt: {
        ko: "Digestube 화면. 왼쪽에 목차, 오른쪽에 타임스탬프가 붙은 전사문이 이어진다",
        en: "Digestube. A table of contents on the left, timestamped transcript on the right",
      },
    },
    decisions: [
      {
        label: {
          ko: "전사",
          en: "Transcription",
        },
        text: {
          ko: "yt-dlp와 Whisper 조합이 로컬에서는 잘 돌았지만, 배포 서버에서는 유튜브 접근이 차단됐다. 외부 전사 API(Supadata)는 구두점 없는 자막과 요청 실패가 이어져, 유튜브 주소를 직접 받는 Gemini API로 바꿨다. 측정 전에 기준을 먼저 정하고 한국어 영상 6편에 시험해 통과를 확인했다.",
          en: "yt-dlp with Whisper worked fine locally, but the deployed server was blocked from reaching YouTube. An external transcription API (Supadata) gave captions without punctuation and failed requests, so I moved to the Gemini API, which takes a YouTube URL directly. I set the pass criteria before measuring and confirmed them on six Korean videos.",
        },
      },
      {
        label: {
          ko: "문단",
          en: "Passages",
        },
        text: {
          ko: "고정 길이는 문장 중간을 잘랐고, 문장 경계 방식은 하나의 설명을 뜻과 무관한 길이에서 나눴다. 모델에는 화제가 시작되는 문장 번호만 고르게 하고, 원문은 코드가 그대로 보존한다. 실패하면 문장 경계 방식으로 되돌린다.",
          en: "Fixed-length splits cut sentences in half, and sentence-boundary splits still broke one explanation at arbitrary lengths. The model now only picks the sentence numbers where a topic starts, and the code keeps the original text intact. If that fails it falls back to sentence boundaries.",
        },
      },
      {
        label: {
          ko: "임베딩",
          en: "Embeddings",
        },
        text: {
          ko: "KURE-v1과 BGE-M3를 같은 조건(89문단, 답이 있는 질문 8개, 상위 3개)으로 비교했다. 교체 조건을 먼저 정했고, BGE-M3가 조건을 충족하지 못해 KURE-v1을 유지했다.",
          en: "I compared KURE-v1 and BGE-M3 under the same conditions (89 passages, eight answerable questions, top 3). The switching rule was fixed first; BGE-M3 did not meet it, so KURE-v1 stayed.",
        },
      },
      {
        label: {
          ko: "목차",
          en: "Contents",
        },
        text: {
          ko: "문단마다 제목을 붙이면 목차가 너무 많아져, 전사문 전체에서 주요 목차를 만든다. 제목과 함께 근거 문장을 받아 전사문에 실제로 있는지 대조하고, 확인되지 않으면 저장하지 않는다.",
          en: "One heading per passage made the contents far too long, so the main headings are now built from the whole transcript. The model returns each heading with the sentence it came from; I check that sentence against the transcript and discard the heading when it is not found.",
        },
      },
      {
        label: {
          ko: "저장소",
          en: "Storage",
        },
        text: {
          ko: "문단 텍스트와 타임스탬프, 벡터를 한 행에 담으면 조회가 한 번에 끝난다. 그래서 Postgres와 pgvector를 골랐고, 서버와 같은 지역(서울)에 둘 수 있는 Supabase로 결정했다.",
          en: "Keeping passage text, timestamps, and the vector in one row means one query instead of two systems. So Postgres with pgvector, hosted on Supabase where it can sit in the same region (Seoul) as the server.",
        },
      },
      {
        label: {
          ko: "검색 순서",
          en: "Ranking",
        },
        text: {
          ko: "관련 문단이 후보에는 있지만 순위가 밀리는 문제를 확인하고 리랭커를 붙였다. 개발용 질문 8건의 필수 근거 17개 중 상위 3개에 든 근거가 6개에서 8개로 늘었다. 결과를 먼저 보여 주고, 5초 안에 재정렬이 끝나지 않으면 원래 순서를 유지한다.",
          en: "The right passages were among the candidates but ranked too low, so I added a reranker. On eight development questions, the required evidence in the top 3 rose from 6 to 8 of 17. Results appear first, and if reranking does not finish within five seconds the original order stays.",
        },
      },
    ],
    body: [
      {
        text: {
          ko: "유튜브 주소를 받아 Gemini API로 전사하고, 문단과 목차로 정리해 임베딩한 뒤, 질문과 뜻이 가까운 문단과 영상 시점을 찾아 주는 의미 검색 서비스다. 수집부터 화면과 배포까지 혼자 진행했다.",
          en: "Give it a YouTube URL and it transcribes through the Gemini API, organises the text into passages and a table of contents, embeds them, and finds the passages and video moments closest in meaning to a question. I built the whole path alone, from ingestion to interface to deploy.",
        },
      },
      {
        text: {
          ko: "검색은 글자 일치가 아니라 임베딩 유사도로 문단을 찾고 관련 문장을 강조해 보여 준다. 근거를 안정적으로 찾는 것이 먼저라고 보고, 답변 생성은 아직 붙이지 않았다.",
          en: "Search finds passages by embedding similarity rather than string matching and highlights the related sentence. Finding the evidence reliably comes first, so answer generation is not attached yet.",
        },
      },
    ],
  },
  {
    slug: "vizuden",
    title: "VIZUDEN",
    year: { ko: "2026.03 - 2026.08", en: "2026.03 - 2026.08" },
    summary: {
      ko: "정체성 기반 스타일 진단 AI 서비스. 설문 응답을 Claude API로 분석해 남성 사용자에게 스타일 방향과 브랜드를 제안한다.",
      en: "An identity-based style diagnosis service. It analyses survey answers with the Claude API and proposes a direction and brands for men.",
    },
    stack: ["React", "Claude API", "Supabase", "Google OAuth", "Vercel"],
    live: "https://vizuden.com",
    shot: "grid",
    image: {
      src: "/shot-vz-1.jpg",
      width: 800,
      height: 6102,
      alt: {
        ko: "VIZUDEN 보고서 화면. 인물 사진과 스타일 진단 문단이 이어진다",
        en: "A VIZUDEN report. Portraits followed by the style diagnosis",
      },
    },
    imageAspect: "3/4",
    stackLayout: "list",
    decisions: [
      {
        label: {
          ko: "파싱",
          en: "Parsing",
        },
        text: {
          ko: "LLM 응답 형식이 일정하지 않아 JSON 파싱이 실패하면 보고서가 통째로 비었다. 파싱에 실패하면 본문에서 JSON 구간만 잘라 다시 읽는 폴백 파서를 구현했다.",
          en: "The model did not always return the same shape, and a failed JSON parse emptied the whole report. I added a fallback parser that cuts the JSON section out of the response body and reads it again.",
        },
      },
      {
        label: {
          ko: "스트리밍",
          en: "Streaming",
        },
        text: {
          ko: "보고서 생성이 오래 걸려 사용자가 빈 화면을 기다렸다. 결과를 스트리밍으로 받아 도착하는 대로 렌더링했다.",
          en: "Generation took long enough that users sat in front of nothing. I streamed the result and rendered each part as it arrived.",
        },
      },
      {
        label: {
          ko: "차트",
          en: "Charts",
        },
        text: {
          ko: "예산 배분 하나를 보여주려고 라이브러리를 들이지 않고 SVG 도넛 차트를 직접 그렸다.",
          en: "One budget breakdown did not justify a dependency, so I drew the donut chart in SVG.",
        },
      },
      {
        label: {
          ko: "로그인",
          en: "Sign-in",
        },
        text: {
          ko: "설문을 바로 시작할 수 있도록 로그인을 요구하지 않았다. 끝난 뒤 로그인하면 게스트 세션에 쌓인 응답·보고서·피드백을 계정으로 옮긴다. 인증은 Supabase 구글 OAuth를 썼고 베타 운영용 어드민 대시보드도 함께 만들었다.",
          en: "The survey starts without an account. If the user signs in afterwards, the answers, report, and feedback collected in the guest session are moved onto the account. Auth is Supabase with Google OAuth, and there is an admin dashboard for running the beta.",
        },
      },
    ],
    body: [
      {
        text: {
          ko: "설문 응답을 Claude API로 분석해 스타일 방향과 브랜드를 제안하는 AI 보고서 서비스다. 기획과 개발, 배포를 개인으로 진행하고 도메인을 사서 운영했다. 지금은 신규 운영을 멈추고 유지보수 중이다.",
          en: "An AI report service that analyses survey answers with the Claude API and proposes a style direction and brands. I designed, built, and shipped it alone, then bought a domain and ran it. New sign-ups are now paused and it is in maintenance.",
        },
      },
    ],
  },
];

assertSlugs("프로젝트", projects.map((item) => item.slug));

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** 보관. 지금 작업과 성격이 달라 프로젝트 목록 밖에 둔다 */
export const archive = [
  {
    year: "2022",
    title: "7inug1.github.io",
    url: "https://7inug1.github.io",
    image: {
      src: "/shot-ar-1.jpg",
      width: 900,
      height: 1235,
      alt: {
        ko: "7inug1.github.io 화면. React · JavaScript · HTML/CSS로 나눈 목차와 프로젝트 목록",
        en: "7inug1.github.io. A contents list split into React, JavaScript, and HTML/CSS",
      },
    },
    note: {
      ko: "바닐라 코딩 부트캠프를 마치고 첫 구직을 준비하며 만든 포트폴리오. React·JavaScript·HTML/CSS로 만든 작업을 모아 뒀다.",
      en: "The portfolio I built while preparing for my first job search, right after the Vanilla Coding bootcamp. It collects the work I made in React, JavaScript, and HTML/CSS.",
    } satisfies L,
  },
];
