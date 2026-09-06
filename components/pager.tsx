import Link from "next/link";

type Item = { href: string; title: string };

/** 다 읽은 자리에서 다음 행동을 제안한다. 끝이면 자리를 비운다 */
export function Pager({
  label,
  prevLabel,
  nextLabel,
  prev,
  next,
}: {
  label: string;
  prevLabel: string;
  nextLabel: string;
  prev?: Item;
  next?: Item;
}) {
  if (!prev && !next) return null;

  return (
    <nav aria-label={label} className="mt-gap-6 grid gap-gap-3 border-t border-rule pt-gap-3 sm:grid-cols-2">
      <div>
        {prev ? (
          <Link href={prev.href} rel="prev" className="block no-underline">
            <span className="label">← {prevLabel}</span>
            <span className="mt-gap-1 block text-small underline underline-offset-2">
              {prev.title}
            </span>
          </Link>
        ) : null}
      </div>
      <div className="sm:text-right">
        {next ? (
          <Link href={next.href} rel="next" className="block no-underline">
            <span className="label">{nextLabel} →</span>
            <span className="mt-gap-1 block text-small underline underline-offset-2">
              {next.title}
            </span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
