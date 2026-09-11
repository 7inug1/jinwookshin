import type { L } from "./i18n";

export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: L;
  stack: string[];
  live?: string;
  repo?: string;
  image?: { src: string; alt: L };
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
    year: "2026.08",
    summary: {
      ko: "유튜브 영상을 책처럼 읽는 서비스. 주소를 받아 전사하고 문단으로 나눠 임베딩한 뒤, 질문과 뜻이 가까운 문단을 찾아 답한다.",
      en: "Reads a YouTube video like a book. It transcribes a URL, splits the text into passages, embeds them, and answers questions from the passages closest in meaning.",
    },
    stack: ["React", "FastAPI", "Supadata", "KURE-v1", "pgvector", "Claude Haiku", "Vercel"],
    shot: "transcript",
    image: {
      src: "/shot-dg-1.jpg",
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
          ko: "yt-dlp와 mlx-whisper 조합이 로컬에서는 잘 돌았지만, 서버에서는 데이터센터 IP 대역이라는 이유로 차단됐다. 배포된 서비스에서도 운영할 수 있는 외부 전사 API(Supadata)로 전환했다.",
          en: "yt-dlp with mlx-whisper worked fine locally, but on the server it was blocked for coming from a data-centre IP range. I moved to an external transcription API (Supadata) that keeps working in production.",
        },
      },
      {
        label: {
          ko: "청킹",
          en: "Chunking",
        },
        text: {
          ko: "문단이 검색의 단위이므로 가독성(문장 끊김)과 문단 크기를 기준으로 네 가지를 비교했고, 문장 끝과 길이를 함께 보는 recursive splitting을 적용했다.",
          en: "The passage is the unit of retrieval, so I compared four methods on readability (whether sentences get cut) and passage size, and applied recursive splitting on sentence boundaries plus length.",
        },
      },
      {
        label: {
          ko: "임베딩",
          en: "Embeddings",
        },
        text: {
          ko: "한국어 검색 성능을 기준으로 BGE-M3을 골랐다. 이 모델이 외부 API에서 중단된 뒤 같은 차원(1024)의 KURE-v1으로 교체해 저장된 벡터를 다시 만들지 않고 대응했다.",
          en: "I picked BGE-M3 for Korean retrieval quality. After it was discontinued on the external API, I swapped in KURE-v1, which has the same 1024 dimensions, so the stored vectors did not have to be rebuilt.",
        },
      },
      {
        label: {
          ko: "목차",
          en: "Contents",
        },
        text: {
          ko: "제목과 함께 근거 문장을 받아 전사문에 실제로 있는지 대조하고, 확인되지 않으면 저장하지 않도록 구현했다.",
          en: "The model returns a heading together with the sentence it came from. I check that sentence against the transcript and discard the heading when it is not found.",
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
          ko: "물어보기",
          en: "Answering",
        },
        text: {
          ko: "같은 방식으로 찾은 문단만 근거로 답변을 만들고, 유사도가 기준 미만이면 답하지 않는다.",
          en: "Answers are generated only from the passages retrieved, and when similarity falls below the threshold it does not answer at all.",
        },
      },
    ],
    body: [
      {
        text: {
          ko: "유튜브 주소를 받아 외부 전사 API로 전사하고, 문단으로 나눠 임베딩한 후, 질문과 뜻이 가까운 문단을 찾아 답하는 RAG 서비스다. 수집부터 화면과 배포까지 혼자 진행했다.",
          en: "Give it a YouTube URL and it transcribes through an external API, splits the text into passages, embeds them, and answers by finding the passages closest in meaning to the question. I built the whole path alone, from ingestion to interface to deploy.",
        },
      },
      {
        text: {
          ko: "검색은 글자 일치가 아니라 임베딩 유사도로 문단을 찾고 근거 문장과 함께 보여준다. 물어보기는 그렇게 찾은 문단만 근거로 답을 만든다.",
          en: "Search finds passages by embedding similarity rather than string matching and shows the sentence it rests on. Asking a question generates the answer from those passages and nothing else.",
        },
      },
    ],
  },
  {
    slug: "vizuden",
    title: "VIZUDEN",
    year: "2026.03–06",
    summary: {
      ko: "정체성 기반 스타일 진단 AI 서비스. 설문 응답을 Claude API로 분석해 남성 사용자에게 스타일 방향과 브랜드를 제안한다.",
      en: "An identity-based style diagnosis service. It analyses survey answers with the Claude API and proposes a direction and brands for men.",
    },
    stack: ["React", "Claude API", "Supabase", "Google OAuth", "Vercel"],
    live: "https://vizuden.com",
    shot: "grid",
    image: {
      src: "/shot-vz-1.jpg",
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
          ko: "예산 배분 하나를 보여주려고 라이브러리를 들이지 않고 SVG 도넛 차트를 직접 그렸다. 추천 아이템은 보고서가 만들어지는 도중에 네이버 쇼핑에서 조회해 이미지·가격과 함께 붙였다.",
          en: "One budget breakdown did not justify a dependency, so I drew the donut chart in SVG. Recommended items are fetched from Naver Shopping while the report is still being generated and attached with image and price.",
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
          ko: "설문 응답을 Claude API로 분석해 스타일 방향과 브랜드를 제안하는 AI 보고서 서비스다. 기획과 개발, 배포를 개인으로 진행하고 도메인을 사서 운영했다.",
          en: "An AI report service that analyses survey answers with the Claude API and proposes a style direction and brands. I designed, built, and shipped it alone, then bought a domain and ran it.",
        },
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** 보관. 지금 작업과 성격이 달라 프로젝트 목록 밖에 둔다 */
export const archive = [
  {
    year: "2022",
    title: "7inug1.github.io",
    url: "https://7inug1.github.io",
    image: {
      src: "/shot-ar-1.jpg",
      alt: {
        ko: "7inug1.github.io 화면. React · JavaScript · HTML/CSS로 나눈 목차와 프로젝트 목록",
        en: "7inug1.github.io. A contents list split into React, JavaScript, and HTML/CSS",
      },
    },
    note: {
      ko: "바닐라 코딩 부트캠프를 마치고 만든 첫 포트폴리오. 지금 기준으로는 학습 기록에 가깝지만 여기서 시작했다.",
      en: "My first portfolio, built right after the Vanilla Coding bootcamp. Closer to a learning log by today's standards, but this is where it started.",
    } satisfies L,
  },
];
