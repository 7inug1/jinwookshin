import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Pager } from "@/components/pager";
import { Breadcrumb } from "@/components/breadcrumb";
import { MetaList } from "@/components/meta-list";
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
      <Breadcrumb
        label={ui.breadcrumb[locale]}
        items={[
          { href: `/${locale}`, label: ui.home[locale] },
          { href: `/${locale}/blog`, label: ui.blog[locale] },
          { label: post.title[locale] },
        ]}
      />
      <h1 className="display measure mt-gap-3">{post.title[locale]}</h1>
      <MetaList
        heading={ui.meta[locale]}
        rows={[
          {
            label: ui.published[locale],
            value: <time dateTime={post.date}>{post.date}</time>,
            mono: true,
          },
        ]}
      />
      <div className="prose measure mt-gap-5">
        {post.body.map((block, i) => {
          if (block.type === "rule") {
            return <hr key={i} className="border-0 border-t border-rule" />;
          }
          if (block.type === "aside") {
            return (
              <aside key={i} className="border-l border-rule pl-gap-3 text-small text-ink-2">
                {block.lines.map((line) => (
                  <p key={line.en} className="mt-gap-2 first:mt-0">
                    {line[locale]}
                  </p>
                ))}
              </aside>
            );
          }
          return <p key={block.text.en}>{block.text[locale]}</p>;
        })}
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
