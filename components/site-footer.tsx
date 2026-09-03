import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-gap-6 border-t border-rule">
      <div className="mx-auto flex max-w-4xl flex-wrap justify-between gap-gap-2 px-gap-3 py-gap-4">
        <p className="label">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span className="mx-2">·</span>
          <a href={site.github}>GitHub</a>
        </p>
        <p className="label">
          <time dateTime={site.updated}>{site.updated}</time> 갱신
        </p>
      </div>
    </footer>
  );
}
