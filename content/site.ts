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

  greeting: { ko: "안녕하세요, 신진욱입니다.", en: "Hello, I'm Jinwook Shin." } satisfies L,
  lead: {
    ko: "프론트엔드를 3년 6개월 만들었고, 지금은 AI 제품이 동작하는 구조를 만듭니다.",
    en: "I built frontends for three and a half years. Now I build the systems behind AI products.",
  } satisfies L,
  intro: {
    ko: "금융 데이터 서비스의 프론트엔드를 맡아 화면과 인증과 운영 도구를 끝까지 만들었습니다. AI 제품이 동작하는 구조를 직접 알고 싶어 RAG 서비스를 배포까지 혼자 진행했습니다.",
    en: "I owned the frontend of a financial data service — screens, auth, and internal tools. To learn how AI products actually work, I shipped a RAG service end to end on my own.",
  } satisfies L,
  personal: {
    ko: "캐나다에서 7년을 살았고 거기서 컴퓨터공학을 공부했습니다. 막히면 끝까지 파는 편이고, 판 과정을 기록해 두는 습관이 있습니다.",
    en: "I lived in Canada for seven years and studied computer science there. When I get stuck I dig until it gives, and I write down what I found.",
  } satisfies L,
  now: {
    ko: "AI 애플리케이션 엔지니어 자리를 찾고 있습니다. 국내 스타트업 우선.",
    en: "Looking for an AI application engineering role. Startups first.",
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
