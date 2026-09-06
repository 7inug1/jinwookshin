import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <section className="grid gap-gap-4 sm:grid-cols-[14rem_1fr] sm:gap-gap-5">
        {/* 이미지는 좁은 화면에서 위, 넓은 화면에서 왼쪽. DOM 순서가 곧 시각 순서다 */}
        <Portrait locale={locale} />

        <div className="min-w-0">
          <h1 className="display measure">{site.greeting[locale]}</h1>
          <div className="prose measure mt-gap-3">
            <p>{site.intro[locale]}</p>
            <p>{site.builds[locale]}</p>
            <p className="italic text-ink-2">{site.availability[locale]}</p>
          </div>
        </div>
      </section>

      <dl className="rule-list mt-gap-5 text-small">
        <div className="grid grid-cols-[5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">{ui.skills[locale]}</dt>
          <dd className="font-mono text-ink-2">{site.skills.join(" · ")}</dd>
        </div>
        <div className="grid grid-cols-[5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">{ui.offDuty[locale]}</dt>
          <dd className="text-ink-2">{site.offDuty[locale]}</dd>
        </div>
        <div className="grid grid-cols-[5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">{ui.see[locale]}</dt>
          <dd className="flex flex-wrap gap-gap-3">
            <Link href={`/${locale}/projects`}>{ui.projects[locale]}</Link>
            <Link href={`/${locale}/blog`}>{ui.blog[locale]}</Link>
            <a href={`mailto:${site.email}`}>{ui.contact[locale]} ↗</a>
          </dd>
        </div>
      </dl>
    </>
  );
}
