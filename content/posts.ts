export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "finetuning-retro",
    title: "파인튜닝을 두 번 돌리고 알게 된 것",
    date: "2026-08-20",
    summary: "데모 텍스트. 막혔던 지점과 끝까지 판 과정, 그리고 실패도 함께 적는다.",
    body: [
      "데모 텍스트다. 첫 시도는 예상보다 빨리 끝났고, 그게 문제였다. 빨리 끝났다는 건 대개 무언가를 건너뛰었다는 뜻이다.",
      "두 번째로 돌릴 때는 전과 후를 같은 방식으로 재기로 했다. 재는 방법을 먼저 정하지 않으면 좋아졌는지 아닌지를 말할 수 없다.",
      "결과보다 오래 남은 건 재는 습관이었다.",
    ],
  },
  {
    slug: "why-no-color",
    title: "이 사이트에 색이 없는 이유",
    date: "2026-09-01",
    summary: "데모 텍스트. 무채색만 쓰기로 한 결정과 그 근거.",
    body: [
      "데모 텍스트다. 강조색을 하나 두려다 그만뒀다. 링크를 파랗게 만드는 순간 나머지 색을 다 정해야 했다.",
      "색이 필요한 자리는 작업물 스크린샷뿐이었다. 그러면 UI에는 색이 없는 편이 낫다.",
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
