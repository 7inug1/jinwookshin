import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import type { Locale } from "@/content/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  /* 소개 문단 안의 회사 이름을 링크로 바꾼다 */
  const [beforeCompany, afterCompany] = site.intro[locale].split("{company}");

  return (
    <section>
      <Portrait locale={locale} />

      {/* 표제와 본문을 한 상자에 담아 왼쪽 시작점을 묶는다 */}
      <div className="mt-gap-4">
        <h1 className="display-sm">{site.greeting[locale]}</h1>
        <div className="prose mt-gap-3">
          <p>
            {beforeCompany}
            <a href={site.company.url}>{site.company.name[locale]}</a>
            {afterCompany}
          </p>
          <p>{site.builds[locale]}</p>
          <p className="italic text-ink-2">{site.availability[locale]}</p>
        </div>
      </div>
    </section>
  );
}
