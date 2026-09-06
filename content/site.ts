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
  photo: "/portrait-placeholder.jpg",
  photoIsPlaceholder: true,

  greeting: { ko: "안녕하세요, 신진욱입니다.", en: "Hi, I'm Jinwook!" } satisfies L,
  intro: {
    ko: "프론트엔드 개발자로 3년 6개월 일했고, 지금은 AI 애플리케이션 엔지니어로 옮겨 가는 중입니다. 금융 데이터 서비스에서 화면과 인증, 운영 도구를 끝까지 만들었고, 캐나다에서 7년을 살며 컴퓨터공학을 공부했습니다.",
    en: "I spent three and a half years as a frontend engineer and I am moving into AI application engineering. At a financial data service I owned the screens, the auth, and the internal tools end to end. Before that I lived in Canada for seven years and studied computer science there.",
  } satisfies L,
  builds: {
    ko: "AI 제품이 실제로 동작하는 구조를 만듭니다. 유튜브 영상을 전사해 문단 단위로 검색하고 답하는 RAG 서비스를 배포까지 혼자 진행했고, 근거가 약하면 답하지 않도록 선을 그었습니다. 화면을 만들던 사람이라 모델이 낸 결과를 사용자가 어떻게 받아 보는지까지 함께 봅니다.",
    en: "I build the systems that make AI products actually work. I shipped a RAG service that transcribes videos, retrieves by passage, and answers from what it finds — alone, all the way to production — and drew a line so it declines to answer when the grounds are weak. Coming from the frontend, I also care about how the model's output reaches the person reading it.",
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
