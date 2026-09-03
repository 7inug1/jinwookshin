import type { L } from "./i18n";

export type Post = {
  slug: string;
  title: L;
  date: string;
  summary: L;
  body: L[];
};

export const posts: Post[] = [
  {
    slug: "finetuning-retro",
    title: {
      ko: "파인튜닝을 두 번 돌리고 알게 된 것",
      en: "What two fine-tuning runs taught me",
    },
    date: "2026-08-20",
    summary: {
      ko: "막혔던 지점과 끝까지 판 과정, 그리고 실패도 함께.",
      en: "Where I got stuck, how far I dug, and what failed.",
    },
    body: [
      {
        ko: "첫 시도는 예상보다 빨리 끝났고, 그게 문제였다. 빨리 끝났다는 건 대개 무언가를 건너뛰었다는 뜻이다.",
        en: "The first run finished faster than expected, which was the problem. Finishing early usually means something got skipped.",
      },
      {
        ko: "두 번째로 돌릴 때는 전과 후를 같은 방식으로 재기로 했다. 재는 방법을 먼저 정하지 않으면 좋아졌는지 아닌지를 말할 수 없다.",
        en: "On the second run I fixed the measurement first. Without that you cannot say whether anything improved.",
      },
      {
        ko: "결과보다 오래 남은 건 재는 습관이었다.",
        en: "The habit of measuring outlasted the result.",
      },
    ],
  },
  {
    slug: "why-no-color",
    title: { ko: "이 사이트에 색이 없는 이유", en: "Why this site has no color" },
    date: "2026-09-01",
    summary: {
      ko: "무채색만 쓰기로 한 결정과 그 근거.",
      en: "The decision to stay grayscale, and what it rests on.",
    },
    body: [
      {
        ko: "강조색을 하나 두려다 그만뒀다. 링크를 파랗게 만드는 순간 나머지 색을 다 정해야 했다.",
        en: "I nearly added one accent. The moment links turned blue, every other color needed deciding too.",
      },
      {
        ko: "색이 필요한 자리는 작업물 스크린샷뿐이었다. 그러면 UI에는 색이 없는 편이 낫다.",
        en: "The only place that needed color was the screenshots. So the interface keeps none.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((post) => post.slug === slug);
