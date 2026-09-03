import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Sidenote } from "@/components/sidenote";
import { DemoShot } from "@/components/demo-shot";
import { Decisions } from "@/components/decisions";
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
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <p className="label">{project.year}</p>
      <h1 className="display mt-gap-2">{project.title}</h1>
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

      <dl className="rule-list mt-gap-4 text-small">
        <div className="flex gap-gap-3 py-gap-2">
          <dt className="label w-24 shrink-0">{ui.role[locale]}</dt>
          <dd>{project.role[locale]}</dd>
        </div>
        <div className="flex gap-gap-3 py-gap-2">
          <dt className="label w-24 shrink-0">{ui.stack[locale]}</dt>
          <dd className="font-mono text-ink-2">{project.stack.join(" · ")}</dd>
        </div>
        {project.live ? (
          <div className="flex gap-gap-3 py-gap-2">
            <dt className="label w-24 shrink-0">{ui.links[locale]}</dt>
            <dd>
              <a href={project.live}>{project.live.replace(/^https?:\/\//, "")}</a>
            </dd>
          </div>
        ) : null}
      </dl>

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
    </article>
  );
}
