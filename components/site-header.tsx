import Link from "next/link";
import { nav, site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-4xl items-baseline justify-between gap-gap-3 px-gap-3 py-gap-3">
        <Link href="/" className="no-underline">
          <span className="font-medium text-ink-max">{site.name}</span>
        </Link>
        <nav aria-label="주요">
          <ul className="flex gap-gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label no-underline hover:text-ink-max">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
