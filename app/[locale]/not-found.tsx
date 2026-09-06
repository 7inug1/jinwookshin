"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";

const copy = {
  title: { ko: "여기에는 아무것도 없습니다.", en: "Nothing lives here." },
  body: {
    ko: "주소가 바뀌었거나 지운 페이지일 수 있습니다. 아래에서 이어서 보세요.",
    en: "The address may have changed, or the page may be gone. Pick up from here.",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const first = pathname.split("/")[1] ?? "";
  const locale: Locale = isLocale(first) ? first : defaultLocale;

  return (
    <>
      <p className="label">404</p>
      <h1 className="display-sm mt-gap-2">{copy.title[locale]}</h1>
      <p className="measure mt-gap-3 text-small text-ink-2">{copy.body[locale]}</p>

      <ul className="mt-gap-4 flex flex-wrap gap-gap-3 text-small">
        <li>
          <Link href={`/${locale}`}>{ui.home[locale]}</Link>
        </li>
        <li>
          <Link href={`/${locale}/projects`}>{ui.projects[locale]}</Link>
        </li>
        <li>
          <Link href={`/${locale}/blog`}>{ui.blog[locale]}</Link>
        </li>
      </ul>
    </>
  );
}
