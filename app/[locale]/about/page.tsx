import type { Metadata } from "next";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

type Props = { params: Promise<{ locale: Locale }> };

const about = {
  heading: {
    ko: "재료를 감추지 않는 편이 정직하다고 생각합니다.",
    en: "I think it is more honest not to hide the material.",
  },
  body: {
    ko: [
      "브루탈리즘을 외형이 아니라 원리로 가져왔습니다. 건축에서 날 콘크리트를 감추지 않듯, 웹의 재료인 텍스트와 HTML을 감추지 않습니다.",
      "그래서 이 사이트에는 색이 없습니다. 강조색을 하나 두려다 그만뒀는데, 링크를 파랗게 만드는 순간 나머지 색을 다 정해야 했기 때문입니다.",
      "색이 없는 자리는 조판이 채웁니다. 큰 글자와 작은 글자만 두고 중간을 없앴고, 본문은 65자를 넘지 않습니다.",
      "넘지 않는 것은 본문만이 아닙니다. 폰트 크기나 테마를 고르는 컨트롤도 만들지 않았습니다. 조판은 정한 값으로 읽힙니다.",
    ],
    en: [
      "I took brutalism as a principle rather than a look. Architecture leaves the concrete exposed; this site leaves its material — text and HTML — exposed too.",
      "So there is no color here. I nearly added one accent, but the moment links turn blue every other color needs deciding.",
      "Typesetting fills the space color would have taken. There are large sizes and small ones and nothing in between, and body text never runs past 65 characters.",
      "Nor does anything else run past what I set. There are no controls for font size or theme. The page reads at the values I chose.",
    ],
  },
} satisfies Record<string, unknown>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: ui.about[locale], alternates: { canonical: `/${locale}/about` } };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <h1 className="display measure">{about.heading[locale]}</h1>
      <div className="prose measure mt-gap-5">
        {about.body[locale].map((paragraph) => (
          <p key={paragraph.slice(0, 20)}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}
