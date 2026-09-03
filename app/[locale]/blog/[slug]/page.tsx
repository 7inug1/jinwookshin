import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost } from "@/content/posts";
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
  const post = getPost(slug);
  if (!post) notFound();

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
    </article>
  );
}
