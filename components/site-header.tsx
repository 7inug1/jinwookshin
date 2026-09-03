import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="border-b border-ink">
      <div className="mx-auto flex max-w-4xl flex-wrap items-baseline justify-between gap-gap-2 px-gap-3 py-gap-3">
        <Link href="/" className="no-underline">
          <span className="text-title font-semibold tracking-[-0.02em] text-ink-max">
            {site.name}
          </span>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
