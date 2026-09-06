"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/content/i18n";
import { ui } from "@/content/ui";

const copy = {
  title: { ko: "여기서 무언가 잘못됐습니다.", en: "Something broke here." },
  body: {
    ko: "다시 시도하거나 다른 페이지로 이동하세요. 계속 같은 화면이면 알려 주시면 고치겠습니다.",
    en: "Try again, or move on to another page. If it keeps happening, tell me and I will fix it.",
  },
  retry: { ko: "다시 시도", en: "Try again" },
};

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const pathname = usePathname();
  const first = pathname.split("/")[1] ?? "";
  const locale: Locale = isLocale(first) ? first : defaultLocale;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <p className="label">500</p>
      <h1 className="display-sm mt-gap-2">{copy.title[locale]}</h1>
      <p className="measure mt-gap-3 text-small text-ink-2">{copy.body[locale]}</p>

      <div className="mt-gap-4 flex flex-wrap items-center gap-gap-3 text-small">
        <button type="button" onClick={reset} className="link-ui border border-rule px-gap-2 py-1">
          {copy.retry[locale]}
        </button>
        <Link href={`/${locale}`}>{ui.home[locale]}</Link>
      </div>
    </>
  );
}
