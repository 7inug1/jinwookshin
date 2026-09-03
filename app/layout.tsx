import type { Metadata } from "next";
import { Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/content/site";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — 포트폴리오`, template: `%s — ${site.name}` },
  description: site.role,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — 포트폴리오`,
    description: site.role,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${displaySerif.variable} ${plexMono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="label sr-only focus:not-sr-only focus:block focus:p-gap-2">
          본문 바로가기
        </a>
        <SiteHeader />
        <main id="main" className="mx-auto w-full max-w-4xl grow px-gap-3 py-gap-5">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
