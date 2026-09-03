export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  role: string;
  stack: string[];
  live?: string;
  /** 표층 아래. 접었다 펴는 자리 */
  decisions: { question: string; answer: string }[];
  body: { text: string; note?: string }[];
};

export const projects: Project[] = [
  {
    slug: "digestube",
    title: "Digestube",
    year: "2026",
    summary:
      "긴 영상을 문단으로 쪼개고 근거를 찾아 답하는 RAG 서비스. 수집·전사·검색·화면·배포를 혼자 진행했다.",
    role: "기획 · 구현 · 배포",
    stack: ["Next.js", "TypeScript", "Whisper", "pgvector"],
    live: "https://example.com",
    decisions: [
      {
        question: "유사도가 얼마나 가까워야 답하게 했나",
        answer:
          "데모 텍스트. 임계값을 어디에 뒀고 그 값을 어떻게 정했는지, 무엇과 비교해 골랐는지를 여기에 적는다. 숫자와 판단이 같이 있어야 한다.",
      },
      {
        question: "근거를 못 찾으면 어떻게 동작하나",
        answer:
          "데모 텍스트. 답하지 않는 쪽을 택한 이유와, 그때 사용자에게 무엇을 보여주는지를 적는다.",
      },
      {
        question: "검토했지만 도입하지 않은 것",
        answer:
          "데모 텍스트. 쓰지 않기로 한 기술과 그 이유. 쓴 것보다 안 쓴 것이 판단을 더 잘 보여줄 때가 있다.",
      },
    ],
    body: [
      {
        text: "데모 텍스트다. 영상 한 편은 문장 수천 개가 되고, 그중 질문과 관련 있는 건 대개 서너 문단이다. 문제는 그 서너 문단을 어떻게 고르느냐가 아니라, 고르지 못했을 때 무엇을 할 것이냐였다.",
        note: "사이드노트다. 넓은 화면에서는 여백으로 나가고 좁으면 본문 아래로 내려온다. 미디어 쿼리를 쓰는 유일한 자리.",
      },
      {
        text: "화제가 바뀌는 지점에서 문단을 나눴다. 고정 길이로 자르는 방식과 비교했을 때 무엇이 좋아지고 무엇이 나빠지는지를 재보고 골랐다. 데모 텍스트라 숫자는 비워 둔다.",
      },
      {
        text: "답해도 되는 선을 어디에 둘지는 만드는 사람의 몫이다. 근거가 약하면 답하지 않는 쪽을 택했고, 그 선택이 이 서비스의 성격을 정했다.",
      },
    ],
  },
  {
    slug: "vizuden",
    title: "VIZUDEN",
    year: "2025",
    summary:
      "도메인을 사서 운영 중인 서비스. 오픈그래프 문제를 SSR이 필요하다고 판단해 Next.js로 이관했다.",
    role: "기획 · 구현 · 운영",
    stack: ["Next.js", "TypeScript", "Vercel"],
    live: "https://example.com",
    decisions: [
      {
        question: "왜 SSR로 이관했나",
        answer:
          "데모 텍스트. 클라이언트 렌더링에서 메타 태그가 크롤러에 안 잡히던 상황과, 이관 후 무엇이 달라졌는지를 적는다.",
      },
    ],
    body: [
      {
        text: "데모 텍스트다. 링크를 공유했을 때 미리보기가 비어 있었다. 원인을 찾는 데 걸린 시간과, 고치는 데 걸린 시간이 크게 달랐다.",
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
