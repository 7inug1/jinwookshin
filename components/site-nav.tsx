"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

export function SiteNav({ locale }: { locale: Locale }) {
  const pathname = usePathname();

  return (
    <nav aria-label={ui.nav[locale]}>
      <ul className="flex items-center gap-gap-2 sm:gap-gap-3">
        {nav.map((item) => {
          const href = `/${locale}${item.href}`;
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={item.href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "link-ui text-[0.8125rem] font-medium text-ink-max sm:text-small"
                    : "link-ui text-[0.8125rem] font-medium text-ink sm:text-small"
                }
              >
                {ui[item.key][locale]}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { site };
