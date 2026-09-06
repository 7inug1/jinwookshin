import { site } from "@/content/site";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

function GitHubMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <rect x="0.6" y="0.6" width="14.8" height="14.8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <g fill="currentColor">
        <circle cx="4.6" cy="4.5" r="1" />
        <rect x="3.7" y="6.4" width="1.8" height="5.5" />
        <rect x="6.8" y="6.4" width="1.7" height="5.5" />
        <path d="M8.5 8.7c0-1.1.9-1.8 1.9-1.8 1.3 0 2.1.9 2.1 2.4v2.6h-1.7V9.6c0-.6-.3-1.1-.9-1.1s-1 .5-1 1.1v2.3H8.5Z" />
      </g>
    </svg>
  );
}

function MailMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <rect x="1" y="3" width="14" height="10" />
      <path d="m1 3.6 7 4.6 7-4.6" />
    </svg>
  );
}

export function SiteFooter({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  const links = [
    { href: site.github, label: "GitHub", mark: <GitHubMark /> },
    { href: site.linkedin, label: ui.linkedin[locale], mark: <LinkedInMark /> },
    { href: `mailto:${site.email}`, label: ui.email[locale], mark: <MailMark /> },
  ];

  return (
    <footer className="mt-gap-6 border-t border-rule">
      <div className="wrap flex flex-col items-center gap-gap-2 py-gap-4">
        <ul className="flex items-center gap-gap-3">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} aria-label={link.label} className="link-ui block text-ink-2">
                {link.mark}
              </a>
            </li>
          ))}
        </ul>
        <p className="label">
          &copy; {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
