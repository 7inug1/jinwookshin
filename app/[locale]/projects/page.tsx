import Link from "next/link";
import type { Metadata } from "next";
import { DemoShot } from "@/components/demo-shot";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/i18n";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return { title: ui.projects[locale], alternates: { canonical: `/${locale}/projects` } };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <h1 className="display">{ui.projects[locale]}</h1>
      <nav aria-label={ui.tocLabel[locale]} className="mt-gap-4">
        <h2 className="label mb-gap-1">{ui.toc[locale]}</h2>
        <ol>
          {projects.map((project, i) => (
            <li key={project.slug} className="py-gap-1">
              <a
                href={`#${project.slug}`}
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-gap-2 no-underline"
              >
                <span className="font-mono text-small text-ink-2 select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="underline underline-offset-2">{project.title}</span>
                <span className="label">{project.year}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-gap-5">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-gap-3 border-t border-rule py-gap-4"
          >
            <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-gap-2">
              <span className="font-mono text-small text-ink-2 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-title">
                <Link href={`/${locale}/projects/${project.slug}`} className="no-underline text-ink-max">
                  {project.title}
                </Link>
              </h2>
              <p className="label shrink-0">{project.year}</p>
            </div>

            <div className="mt-gap-3 grid gap-gap-4 lg:grid-cols-[1fr_18rem]">
              <div className="min-w-0">
                <p className="measure text-small">{project.summary[locale]}</p>

                <dl className="mt-gap-3 grid grid-cols-[4rem_1fr] gap-x-gap-3 gap-y-gap-2 text-small">
                  <dt className="label pt-[0.25em]">{ui.role[locale]}</dt>
                  <dd>{project.role[locale]}</dd>

                  <dt className="label pt-[0.25em]">{ui.stack[locale]}</dt>
                  <dd className="font-mono text-ink-2">{project.stack.join(" · ")}</dd>

                  <dt className="label pt-[0.25em]">{ui.decisions[locale]}</dt>
                  <dd>
                    <ol className="text-ink-2">
                      {project.decisions.map((decision, i) => (
                        <li key={decision.question.en}>
                          <span className="font-mono mr-2 select-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {decision.question[locale]}
                        </li>
                      ))}
                    </ol>
                  </dd>

                  <dt className="label pt-[0.25em]">{ui.links[locale]}</dt>
                  <dd className="flex flex-wrap gap-gap-3">
                    <Link href={`/${locale}/projects/${project.slug}`}>{ui.detail[locale]}</Link>
                    {project.live ? <a href={project.live}>{ui.live[locale]} ↗</a> : null}
                    {project.repo ? <a href={project.repo}>{ui.repo[locale]} ↗</a> : null}
                  </dd>
                </dl>
              </div>

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
          </article>
        ))}
      </div>
    </>
  );
}
