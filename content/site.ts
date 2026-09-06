import type { L } from "./i18n";

export const site = {
  name: "Jinwook Shin",
  nameLocal: { ko: "신진욱", en: "Jinwook Shin" } satisfies L,
  url: "https://jinwookshin.vercel.app",
  email: "0201jinwook@gmail.com",
  github: "https://github.com/7inug1",
  linkedin: "https://www.linkedin.com/in/jinwook-shin-125599196",

  /**
   * public/ 아래 경로. 비어 있으면 자리표시자 도형을 그린다.
   * 지금 값은 Pexels 무료 사진(photos/1181675)이고 실제 프로필 사진으로 바꿔야 한다.
   */
  photo: "/portrait.jpg",
  photoIsPlaceholder: false,
  photoCaption: { ko: "2025년 런던 여행 중", en: "London, 2025" } satisfies L,
  photoAlt: {
    ko: "템스강과 타워브리지를 등지고 선 신진욱",
    en: "Jinwook Shin standing with the Thames and Tower Bridge behind him",
  } satisfies L,

  greeting: { ko: "안녕하세요, 신진욱입니다.", en: "Hi, I'm Jinwook!" } satisfies L,
  company: {
    name: { ko: "한경에이셀", en: "Hankyung Aicel" } satisfies L,
    url: "https://www.aiceltech.com",
  },
  intro: {
    ko: "{company}에서 3년 6개월 동안 금융 데이터 서비스의 프론트엔드를 맡았습니다. 유지 보수를 넘어 AI 투자 비서 epic AI를 팀과 함께 1년 6개월 동안 처음부터 만들어 런칭했습니다. 그전에는 문과에서 진로를 바꿔 캐나다 밴쿠버에서 프로그래밍을 공부했고, 바닐라코딩 부트캠프에서 프론트엔드에 대한 전문성을 키웠습니다.",
    en: "For three and a half years at {company} I owned the frontend of a financial data service. Beyond maintenance, I spent eighteen months building epic AI — an AI investment assistant — with the team and shipping it. Before that I switched out of a humanities track — programming in Vancouver, then frontend depth at the Vanilla Coding bootcamp.",
  } satisfies L,
  builds: {
    ko: "2026년 2월 퇴사 후 AI 개발을 배워나가고 있습니다. RAG, 임베딩, 청킹, 리랭킹, 평가를 배우고 개인 프로젝트를 만들어보고 있습니다. 제작해보며 제작자의 문해력과 판단 기준이 중요한 부분이라 느껴, 이 부분에 힘쏟고자 합니다.",
    en: "Since leaving in February 2026 I have been learning AI engineering. Retrieval, embeddings, chunking, reranking, evaluation — learning them and building personal projects. Building them, I came to feel that the maker's literacy and standards of judgment are what matter, and that is where I want to put my weight.",
  } satisfies L,
  availability: {
    ko: "현재 AI 애플리케이션 엔지니어 및 AI 프로덕트 엔지니어쪽으로 관심을 가지며 다시 한 번 산업에 기여할 수 있는 기회를 찾고자 합니다.",
    en: "I am drawn to AI application and AI product engineering, looking for a chance to contribute to the industry again.",
  } satisfies L,
};

export const nav = [
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
] as const;
