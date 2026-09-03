import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { LocaleSwitch } from "@/components/locale-switch";
import { site } from "@/content/site";
import type { Locale } from "@/content/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="border-b border-ink">
      <div className="mx-auto flex max-w-4xl flex-wrap items-baseline justify-between gap-gap-2 px-gap-3 py-gap-3">
        <Link href={`/${locale}`} className="no-underline">
          <span className="text-title font-semibold tracking-[-0.02em] text-ink-max">
            {site.name}
          </span>
        </Link>
        <div className="flex items-baseline gap-gap-3">
          <SiteNav locale={locale} />
          <span aria-hidden="true" className="text-ink-2">
            /
          </span>
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
}
