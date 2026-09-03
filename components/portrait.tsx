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
          alt={site.photoIsPlaceholder ? ui.photoCaption[locale] : `${site.name}`}
          width={320}
          height={400}
          className="aspect-[4/5] w-full border border-rule object-cover grayscale"
        />
        {site.photoIsPlaceholder ? (
          <figcaption className="label mt-gap-1">{ui.photoCaption[locale]}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 160 200"
        className="block h-auto w-full text-ink"
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
