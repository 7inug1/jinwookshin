import Link from "next/link";
import { site } from "@/content/site";

export type Crumb = { href?: string; label: string };

/**
 * 상세 페이지 머리. 왼쪽은 계층 위로 가는 링크, 오른쪽은 이 페이지의 메타 정보.
 * 화면에는 부모 하나만 보이고 전체 경로는 BreadcrumbList 구조화 데이터로 나간다.
 */
export function PageTop({
  label,
  items,
  meta,
}: {
  label: string;
  items: Crumb[];
  meta?: React.ReactNode;
}) {
  const parent = items.at(-2);

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
      <div className="flex items-center justify-between gap-gap-3 border-b border-rule pb-gap-2">
        {parent?.href ? (
          <nav aria-label={label}>
            <Link
              href={parent.href}
              className="label flex items-center gap-1 no-underline hover:text-ink-max"
            >
              <span aria-hidden="true">←</span>
              {parent.label}
            </Link>
          </nav>
        ) : (
          <span />
        )}
        {meta ? <div className="label shrink-0">{meta}</div> : null}
      </div>
    </>
  );
}
