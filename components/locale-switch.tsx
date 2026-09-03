"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";

function GlobeMark() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6.4" />
      <path d="M1.6 8h12.8M8 1.6c1.7 1.8 2.6 4 2.6 6.4S9.7 12.6 8 14.4C6.3 12.6 5.4 10.4 5.4 8S6.3 3.4 8 1.6Z" />
    </svg>
  );
}

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locales.find((item) => item !== locale) ?? locale;
  const rest = pathname.replace(new RegExp(`^/${locale}`), "");

  return (
    <Link
      href={`/${other}${rest}`}
      hrefLang={other}
      aria-label={ui.switchLabel[locale]}
      className="flex items-center gap-1 border border-rule px-2 py-1 text-ink-2 no-underline hover:border-ink hover:text-ink-max"
    >
      <GlobeMark />
      <span className="font-mono text-label leading-none tracking-[0.08em]">
        {ui.switchCode[locale]}
      </span>
    </Link>
  );
}
