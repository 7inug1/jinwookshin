"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="주요">
      <ul className="flex gap-gap-3">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "text-small font-medium text-ink-max"
                    : "text-small font-medium text-ink no-underline hover:text-ink-max"
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
