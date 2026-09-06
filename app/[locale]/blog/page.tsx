import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/content/posts";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: ui.blog[locale], alternates: { canonical: `/${locale}/blog` } };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <h1 className="display">{ui.blog[locale]}</h1>
      <ul className="mt-gap-4 border-t border-rule">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="group relative -mx-gap-2 border-b border-rule px-gap-2 py-gap-3 transition-colors duration-[var(--dur)] ease-[var(--ease)] last:border-b-0 hover:bg-surface"
          >
            <div className="flex items-baseline justify-between gap-gap-3">
              <h2 className="text-title text-ink-max">
                {/* ::after로 항목 전체를 덮어 어디를 눌러도 글로 간다 */}
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="no-underline after:absolute after:inset-0 after:content-['']"
                >
                  {post.title[locale]}
                </Link>
              </h2>
              <time dateTime={post.date} className="label shrink-0">
                {post.date}
              </time>
            </div>
            <p className="measure mt-gap-1 text-small text-ink-2">{post.summary[locale]}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
