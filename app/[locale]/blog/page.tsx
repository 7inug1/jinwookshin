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
      <ul className="rule-list mt-gap-4">
        {posts.map((post) => (
          <li key={post.slug} className="py-gap-3">
            <Link href={`/${locale}/blog/${post.slug}`} className="no-underline">
              <div className="flex items-baseline justify-between gap-gap-3">
                <h2 className="text-title text-ink-max">{post.title[locale]}</h2>
                <time dateTime={post.date} className="label shrink-0">
                  {post.date}
                </time>
              </div>
              <p className="measure mt-gap-1 text-small text-ink-2">{post.summary[locale]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
