import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

/** 실제 사진이 들어오면 site.photo로 대체된다. 사진은 회색조로 처리한다 */
export function Portrait({ locale }: { locale: Locale }) {
  if (site.photo) {
    return (
      <figure className="m-0">
        <img
          src={site.photo}
          alt={site.photoAlt[locale]}
          width={1100}
          height={825}
          /* 역광이라 인물이 배경보다 어둡다. 밝기와 대비를 올리고 채도는 낮춘다 */
          style={{ filter: "brightness(1.06) contrast(1.08) saturate(0.92)" }}
          className="h-auto w-full rounded-[6px] border border-rule"
        />
        <figcaption className="label mt-gap-1 text-right">{site.photoCaption[locale]}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="m-0 flex flex-col sm:h-full">
      <svg
        viewBox="0 0 160 200"
        preserveAspectRatio="xMidYMid slice"
        className="block h-auto w-full text-ink sm:h-full sm:min-h-0 sm:grow"
        fill="currentColor"
        role="img"
        aria-label={ui.photoCaption[locale]}
      >
        <rect x="0.5" y="0.5" width="159" height="199" fill="none" stroke="currentColor" opacity="0.3" />
        <circle cx="80" cy="76" r="30" opacity="0.14" />
        <path d="M22 200c0-30 26-54 58-54s58 24 58 54Z" opacity="0.14" />
      </svg>
      <figcaption className="label mt-gap-1">{ui.photoCaption[locale]}</figcaption>
    </figure>
  );
}
