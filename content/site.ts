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
    ko: "2026년 2월에 퇴사하고 제품을 0에서 1로 두 번 만들었습니다. VIZUDEN은 기획과 개발, 배포를 혼자 하고 도메인을 사서 지금도 운영하고 있습니다. Digestube는 유튜브 영상을 전사해 문단 단위로 검색하고 답하는 RAG 서비스이고, 근거가 약하면 답하지 않도록 선을 그었습니다. 화면을 만들던 사람이라 모델이 낸 결과가 사용자에게 어떻게 닿는지까지 함께 봅니다.",
    en: "I left in February 2026 and have taken a product from zero to one twice since. VIZUDEN I designed, built, and shipped alone, then bought a domain and have been running it. Digestube transcribes YouTube videos, retrieves by passage, and answers from what it finds — with a line drawn so it declines when the grounds are weak. Coming from the frontend, I also care about how the model's output reaches the person reading it.",
  } satisfies L,
  availability: {
    ko: "AI 애플리케이션 엔지니어와 AI 프로덕트 엔지니어 자리를 찾고 있습니다. 국내 스타트업을 우선으로 보고 있고, 영어로 일하는 팀도 좋습니다.",
    en: "Open to AI application and AI product engineering roles. Startups first, and teams that work in English are welcome.",
  } satisfies L,
};

export const nav = [
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
] as const;
