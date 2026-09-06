import type { L } from "./i18n";

export const site = {
  name: "Jinwook Shin",
  nameLocal: { ko: "신진욱", en: "Jinwook Shin" } satisfies L,
  url: "https://jinwookshin.vercel.app",
  email: "7inug1@gmail.com",
  github: "https://github.com/7inug1",

  /**
   * public/ 아래 경로. 비어 있으면 자리표시자 도형을 그린다.
   * 지금 값은 Pexels 무료 사진(photos/1181675)이고 실제 프로필 사진으로 바꿔야 한다.
   */
  photo: "/portrait.jpg",
  photoIsPlaceholder: false,
  /** 인물이 왼쪽에 서 있는 가로 사진이라 정사각 크롭 위치를 옮긴다 */
  photoPosition: "28% 42%",

  greeting: { ko: "안녕하세요, 신진욱입니다.", en: "Hi, I'm Jinwook!" } satisfies L,
  intro: {
    ko: "한경에이셀에서 3년 6개월 동안 금융 데이터 서비스의 프론트엔드를 맡았습니다. 화면과 인증, 운영 도구를 끝까지 만들었고 사내 AI 구축에도 참여했습니다. 캐나다에서 7년을 살며 컴퓨터공학을 공부했습니다.",
    en: "For three and a half years at Hankyung A-Cell I owned the frontend of a financial data service — the screens, the auth, the internal tools — and worked on the company's AI build-out. Before that I lived in Canada for seven years and studied computer science there.",
  } satisfies L,
  builds: {
    ko: "제품을 0에서 1로 두 번 만들었습니다. VIZUDEN은 기획과 개발, 배포를 혼자 하고 도메인을 사서 지금도 운영하고 있습니다. Digestube는 유튜브 영상을 전사해 문단 단위로 검색하고 답하는 RAG 서비스이고, 근거가 약하면 답하지 않도록 선을 그었습니다. 화면을 만들던 사람이라 모델이 낸 결과가 사용자에게 어떻게 닿는지까지 함께 봅니다.",
    en: "I have taken a product from zero to one twice. VIZUDEN I designed, built, and shipped alone, then bought a domain and have been running it since. Digestube transcribes YouTube videos, retrieves by passage, and answers from what it finds — with a line drawn so it declines when the grounds are weak. Coming from the frontend, I also care about how the model's output reaches the person reading it.",
  } satisfies L,
  availability: {
    ko: "AI 애플리케이션 엔지니어와 AI 프로덕트 엔지니어 자리를 찾고 있습니다. 국내 스타트업을 우선으로 보고 있고, 영어로 일하는 팀도 좋습니다.",
    en: "Open to AI application and AI product engineering roles. Startups first, and teams that work in English are welcome.",
  } satisfies L,
  skills: ["React", "TypeScript", "RAG", "Agents", "Evals"],
  offDuty: {
    ko: "달리기 · 오래된 개인 웹사이트 구경 · 영어 팟캐스트",
    en: "Running · reading old personal websites · podcasts",
  } satisfies L,
};

export const nav = [
  { href: "/projects", key: "projects" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
] as const;
