import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Pager } from "@/components/pager";
import { posts, getPost } from "@/content/posts";
import { ui } from "@/content/ui";
import { locales, type Locale } from "@/content/i18n";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((post) => ({ locale, slug: post.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title[locale],
    description: post.summary[locale],
    alternates: { canonical: `/${locale}/blog/${slug}` },
  };
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const index = posts.findIndex((item) => item.slug === slug);
  const post = posts[index];
  if (!post) notFound();

  const prev = posts[index - 1];
  const next = posts[index + 1];

  return (
    <article>
      <time dateTime={post.date} className="label">
        {post.date}
      </time>
      <h1 className="display measure mt-gap-2">{post.title[locale]}</h1>
      <div className="prose measure mt-gap-5">
        {post.body.map((paragraph) => (
          <p key={paragraph.en}>{paragraph[locale]}</p>
        ))}
      </div>

      <Pager
        label={ui.pagerLabel[locale]}
        prevLabel={ui.prev[locale]}
        nextLabel={ui.next[locale]}
        prev={prev ? { href: `/${locale}/blog/${prev.slug}`, title: prev.title[locale] } : undefined}
        next={next ? { href: `/${locale}/blog/${next.slug}`, title: next.title[locale] } : undefined}
      />
    </article>
  );
}
