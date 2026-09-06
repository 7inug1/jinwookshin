import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <section>
        {/* 컨테이너 자체가 읽기 폭이라 사진과 글이 같은 상자를 쓴다 */}
        <div>
          <Portrait locale={locale} />
        </div>

        {/* 표제와 본문을 한 상자에 담아 왼쪽 시작점을 묶는다 */}
        <div className="mt-gap-4">
          <h1 className="display-sm">{site.greeting[locale]}</h1>
          <div className="prose mt-gap-3">
            <p>{site.intro[locale]}</p>
            <p>{site.builds[locale]}</p>
            <p className="italic text-ink-2">{site.availability[locale]}</p>
          </div>
        </div>
      </section>

      <dl className="rule-list mt-gap-5 text-small">
        <div className="grid grid-cols-[6.5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">{ui.skills[locale]}</dt>
          <dd className="font-mono text-ink-2">{site.skills.join(" · ")}</dd>
        </div>
        <div className="grid grid-cols-[6.5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">{ui.offDuty[locale]}</dt>
          <dd className="text-ink-2">{site.offDuty[locale]}</dd>
        </div>
      </dl>
    </>
  );
}
