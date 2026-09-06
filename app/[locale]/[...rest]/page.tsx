import Link from "next/link";
import type { Metadata } from "next";
import { isLocale, defaultLocale, type Locale } from "@/content/i18n";

export const metadata: Metadata = { robots: { index: false, follow: true } };

const copy = {
  title: { ko: "여기에는 아무것도 없습니다.", en: "Nothing lives here." },
  body: {
    ko: "주소가 바뀌었거나 지운 페이지일 수 있습니다.",
    en: "The address may have changed, or the page may be gone.",
  },
  home: { ko: "홈으로 이동", en: "Go to home" },
};

/** 어떤 경로에도 맞지 않는 주소. 상태 코드는 미들웨어가 404로 바꾼다 */
export default async function NotFoundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;

  return (
    <>
      <p className="label">404</p>
      <h1 className="display-sm mt-gap-2">{copy.title[locale]}</h1>
      <p className="measure mt-gap-3 text-small text-ink-2">{copy.body[locale]}</p>

      <p className="mt-gap-4 text-small">
        <Link href={`/${locale}`}>{copy.home[locale]}</Link>
      </p>
    </>
  );
}
