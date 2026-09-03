import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import { ui } from "@/content/ui";
import { htmlLang, isLocale, locales, type Locale } from "@/content/i18n";
import "../globals.css";

const displaySerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-serif",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const title = `${site.name} — ${locale === "ko" ? "포트폴리오" : "Portfolio"}`;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s — ${site.name}` },
    description: site.lead[locale],
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en" },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title,
      description: site.lead[locale],
    },
    twitter: { card: "summary_large_image", title, description: site.lead[locale] },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const current = locale as Locale;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: site.email,
    jobTitle: "AI Application Engineer",
    sameAs: [site.github],
  };

  return (
    <html lang={htmlLang[current]} className={`${displaySerif.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a href="#main" className="label sr-only focus:not-sr-only focus:block focus:p-gap-2">
          {ui.skipToContent[current]}
        </a>
        <SiteHeader locale={current} />
        <main id="main" className="mx-auto w-full max-w-4xl grow px-gap-3 py-gap-5">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
