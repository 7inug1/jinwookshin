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
      <ul className="flex items-center gap-gap-3">
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
                    ? "text-small font-medium text-ink-max"
                    : "link-ui text-small font-medium text-ink"
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
