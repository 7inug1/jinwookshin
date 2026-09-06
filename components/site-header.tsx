import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { LogoMark } from "@/components/logo-mark";
import { LocaleSwitch } from "@/components/locale-switch";
import { site } from "@/content/site";
import type { Locale } from "@/content/i18n";

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header className="border-b border-ink">
      <div className="wrap flex items-center justify-between gap-gap-2 py-gap-3">
        <Link
          href={`/${locale}`}
          className="flex min-w-0 shrink items-center gap-gap-1 no-underline"
        >
          <LogoMark />
          <span className="truncate text-[1.05rem] font-semibold tracking-[-0.02em] text-ink-max sm:text-title">
            {site.name}
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-gap-2 sm:gap-gap-3">
          <SiteNav locale={locale} />
          <span aria-hidden="true" className="hidden h-4 w-px bg-rule sm:block" />
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </header>
  );
}
