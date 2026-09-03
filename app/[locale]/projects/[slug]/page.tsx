import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Sidenote } from "@/components/sidenote";
import { DemoShot } from "@/components/demo-shot";
import { Decisions } from "@/components/decisions";
import { Pager } from "@/components/pager";
import { Breadcrumb } from "@/components/breadcrumb";
import { MetaList } from "@/components/meta-list";
import { projects, getProject } from "@/content/projects";
import { ui } from "@/content/ui";
import { locales, type Locale } from "@/content/i18n";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary[locale],
    alternates: { canonical: `/${locale}/projects/${slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article>
      <Breadcrumb
        label={ui.breadcrumb[locale]}
        items={[
          { href: `/${locale}`, label: ui.home[locale] },
          { href: `/${locale}/projects`, label: ui.projects[locale] },
          { label: project.title },
        ]}
      />
      <h1 className="display mt-gap-3">{project.title}</h1>
      <p className="measure mt-gap-3 text-ink-2">{project.summary[locale]}</p>

      <div className="mt-gap-4 max-w-2xl">
        {project.image ? (
          <img
            src={project.image.src}
            alt={project.image.alt[locale]}
            width={640}
            height={400}
            className="h-auto w-full border border-rule"
          />
        ) : (
          <DemoShot kind={project.shot} label={project.title} locale={locale} />
        )}
      </div>

      <MetaList
        heading={ui.meta[locale]}
        rows={[
          { label: ui.year[locale], value: project.year, mono: true },
          { label: ui.role[locale], value: project.role[locale] },
          { label: ui.stack[locale], value: project.stack.join(" · "), mono: true },
          ...(project.live
            ? [
                {
                  label: ui.links[locale],
                  value: (
                    <span className="flex flex-wrap gap-gap-3">
                      <a href={project.live}>{ui.live[locale]} ↗</a>
                      {project.repo ? <a href={project.repo}>{ui.repo[locale]} ↗</a> : null}
                    </span>
                  ),
                },
              ]
            : []),
        ]}
      />

      <div className="prose measure mt-gap-5">
        {project.body.map((block) => (
          <p key={block.text.en}>
            {block.note ? <Sidenote>{block.note[locale]}</Sidenote> : null}
            {block.text[locale]}
          </p>
        ))}
      </div>

      <Decisions
        heading={ui.decisionsHeading[locale]}
        items={project.decisions.map((d) => ({
          question: d.question[locale],
          answer: d.answer[locale],
        }))}
      />

      <Pager
        label={ui.projectPagerLabel[locale]}
        prevLabel={ui.prev[locale]}
        nextLabel={ui.next[locale]}
        prev={prev ? { href: `/${locale}/projects/${prev.slug}`, title: prev.title } : undefined}
        next={next ? { href: `/${locale}/projects/${next.slug}`, title: next.title } : undefined}
      />
    </article>
  );
}
