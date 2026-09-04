import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  const rows = [
    { label: ui.now[locale], value: site.now[locale] },
    { label: ui.skills[locale], value: site.skills.join(" · "), mono: true },
    { label: ui.offDuty[locale], value: site.offDuty[locale] },
  ];

  return (
    <>
      <section className="grid gap-gap-4 sm:grid-cols-[10rem_1fr] sm:gap-gap-5">
        <Portrait locale={locale} />

        <div className="min-w-0">
          <h1 className="display measure">{site.greeting[locale]}</h1>
          <p className="measure mt-gap-3 text-title">{site.lead[locale]}</p>
          <div className="prose measure mt-gap-3 text-small text-ink-2">
            <p>{site.intro[locale]}</p>
            <p>{site.personal[locale]}</p>
          </div>
        </div>
      </section>

      <dl className="rule-list mt-gap-5 text-small">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[5rem_1fr] gap-gap-3 py-gap-2">
            <dt className="label pt-[0.25em]">{row.label}</dt>
            <dd className={row.mono ? "font-mono text-ink-2" : undefined}>{row.value}</dd>
          </div>
        ))}
        <div className="grid grid-cols-[5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">{ui.see[locale]}</dt>
          <dd className="flex flex-wrap gap-gap-3">
            <Link href={`/${locale}/projects`}>{ui.projects[locale]}</Link>
            <Link href={`/${locale}/about`}>{ui.about[locale]}</Link>
            <a href={`mailto:${site.email}`}>{ui.contact[locale]} ↗</a>
          </dd>
        </div>
      </dl>
    </>
  );
}
