import { site } from "@/content/site";
import { posts } from "@/content/posts";
import { locales, isLocale, defaultLocale } from "@/content/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const base = `${site.url}/${locale}`;

  const items = posts
    .map((post) => {
      const url = `${base}/blog/${post.slug}`;
      return `    <item>
      <title>${escape(post.title[locale])}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.summary[locale])}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(site.name)}</title>
    <link>${base}/blog</link>
    <description>${escape(site.availability[locale])}</description>
    <language>${locale}</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "content-type": "application/rss+xml; charset=utf-8" },
  });
}
