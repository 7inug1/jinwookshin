import Link from "next/link";
import { site } from "@/content/site";

export type Crumb = { href?: string; label: string };

/** 계층 경로. BreadcrumbList 구조화 데이터를 함께 낸다 */
export function Breadcrumb({ label, items }: { label: string; items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label={label}>
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, i) => (
            <li key={item.label} className="flex items-center gap-2">
              {i > 0 ? (
                <span aria-hidden="true" className="label">
                  /
                </span>
              ) : null}
              {item.href ? (
                <Link href={item.href} className="label hover:text-ink-max">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="label text-ink">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
