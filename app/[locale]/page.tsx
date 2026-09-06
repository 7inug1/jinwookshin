import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <>
      <section className="text-center">
        {/* 세로 중앙 배치. 사진이 먼저 오고 글이 아래로 이어진다 */}
        <div className="mx-auto max-w-sm">
          <Portrait locale={locale} />
        </div>

        <h1 className="display measure mx-auto mt-gap-4">{site.greeting[locale]}</h1>
        <div className="prose measure mx-auto mt-gap-3">
          <p>{site.intro[locale]}</p>
          <p>{site.builds[locale]}</p>
          <p className="italic text-ink-2">{site.availability[locale]}</p>
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
