import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const budget = [
  { label: "페이지 무게", target: "100KB", actual: "측정 전" },
  { label: "LCP", target: "1.5s", actual: "측정 전" },
  { label: "CLS", target: "0", actual: "측정 전" },
  { label: "런타임 의존성", target: "10개", actual: "3개" },
];

export default function AboutPage() {
  return (
    <>
      <h1 className="display measure">
        재료를 감추지 않는 편이 정직하다고 생각한다.
      </h1>

      <div className="prose measure mt-gap-5">
        <p>
          데모 텍스트다. 브루탈리즘을 외형이 아니라 원리로 가져왔다. 건축에서 날 콘크리트를 감추지
          않듯, 웹의 재료인 텍스트와 HTML을 감추지 않는다.
        </p>
        <p>
          그래서 이 사이트에는 색이 없다. 강조색을 하나 두려다 그만뒀는데, 링크를 파랗게 만드는
          순간 나머지 색을 다 정해야 했기 때문이다. 색이 필요한 자리는 작업물 스크린샷뿐이었다.
        </p>
        <p>
          스크린샷이 색을 내는 동안 나머지는 조판이 한다. 큰 글자와 작은 글자만 두고 중간을 없앴다.
          본문은 65ch를 넘지 않고, 화면이 좁아지면 사이드노트가 여백에서 본문 아래로 내려온다.
        </p>
        <p>
          내려오는 것은 사이드노트뿐이다. 폰트 크기나 테마를 고르는 컨트롤은 만들지 않았다. 조판은
          정한 값으로 읽힌다.
        </p>
      </div>

      <section className="mt-gap-6">
        <h2 className="label mb-gap-2">예산</h2>
        <dl className="rule-list text-small">
          {budget.map((row) => (
            <div key={row.label} className="flex items-baseline gap-gap-3 py-gap-2">
              <dt className="w-40 shrink-0">{row.label}</dt>
              <dd className="font-mono w-24 shrink-0 text-ink-2">{row.target}</dd>
              <dd className="font-mono text-ink-2">{row.actual}</dd>
            </div>
          ))}
        </dl>
        <p className="label mt-gap-2">넘으면 기능을 뺀다</p>
      </section>
    </>
  );
}
