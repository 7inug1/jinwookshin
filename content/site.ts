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
    ko: "금융 데이터 회사에서 3년 6개월 가량 프론트엔드를 맡았습니다. 팀과 함께 AI 투자 비서 epic AI를 1년 6개월 동안 처음부터 만들어 런칭했고, 그때 AI 애플리케이션 개발에 관심이 생겼습니다. 퇴사 후에는 스타일 진단 서비스 VIZUDEN을 혼자 만들어 도메인을 사서 운영하고 있고, 최근에는 유튜브 영상을 읽을 수 있는 Digestube를 만들었습니다.",
    en: "I spent about three and a half years on the frontend at a financial data company. With the team I built epic AI, an AI investment assistant, from nothing over eighteen months and shipped it — that is where my interest in AI application development started. After leaving I built VIZUDEN, a style diagnosis service, on my own, bought a domain, and still run it. Most recently I built Digestube, a service that lets you read a YouTube video.",
  } satisfies L,
  builds: {
    ko: "프롬프트 한 줄로 서비스가 뚝딱 나오는 시대지만, 만들어보면 정작 어려운 건 기준을 어떻게 세우고 서비스를 구현해나가는지였습니다. 특히 Digestube를 만들면서 어떠한 기준점을 가지고 사용자의 질문에 답하게끔 해야 하는지 직접 고민하며 명료한 판단 기준이 필요함을 느꼈습니다. 개발자의 도메인 지식과 명확한 판단 기준은 AI가 할 수 없는 부분이고, 더욱 힘을 쏟아야 하는 부분이라고 느낍니다.",
    en: "A single prompt can spin up a service these days, but the hard part turns out to be setting the standards and building to them. With Digestube in particular I had to decide for myself on what grounds it should answer a question at all, and that is where I felt how much a clear standard matters. A developer's domain knowledge and clear judgment are the parts AI cannot supply — and the parts worth putting more weight on.",
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
