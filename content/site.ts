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
  intro: {
    ko: "프론트엔드를 만들다 AI 제품 쪽으로 넘어왔습니다. 금융 데이터 서비스의 화면과 운영 도구, AI 투자 비서, 영상을 읽는 검색 서비스까지 만들어 왔습니다.",
    en: "I moved from frontend into AI products. I have built screens and internal tools for a financial data service, an AI investment assistant, and a search service that reads through video.",
  } satisfies L,
  builds: {
    ko: "요즘은 모델이 낸 답을 사람이 믿고 쓸 수 있게 만드는 일에 붙어 있습니다. 근거를 못 찾았을 때 무엇을 보여줄지, 어디까지 답하게 할지 같은 것들입니다. 기술을 고르는 것보다 그 선을 정하는 쪽이 더 어렵고, 그래서 더 재미있습니다.",
    en: "Lately I am stuck on making a model's answers something people can actually trust. What to show when retrieval finds nothing, how far the thing should be allowed to answer. Drawing that line is harder than picking the technology, and more interesting for it.",
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
