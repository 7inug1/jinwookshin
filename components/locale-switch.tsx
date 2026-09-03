"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const other = locales.find((item) => item !== locale) ?? locale;
  const rest = pathname.replace(new RegExp(`^/${locale}`), "") || "";

  return (
    <Link
      href={`/${other}${rest}`}
      hrefLang={other}
      lang={other}
      aria-label={localeNames[other]}
      className="text-small font-medium text-ink no-underline hover:text-ink-max"
    >
      {ui.switchTo[locale]}
    </Link>
  );
}
