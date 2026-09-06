import Link from "next/link";
import Image from "next/image";
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
                <span className="underline underline-offset-2">
                  {project.title}
                </span>
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
            className="group relative -mx-gap-2 scroll-mt-gap-3 border-t border-rule px-gap-2 py-gap-4 transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:border-ink hover:bg-surface has-[a:focus-visible]:border-ink has-[a:focus-visible]:bg-surface"
          >
            <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-gap-2">
              <span className="font-mono text-small text-ink-2 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="text-title">
                {/* ::after로 카드 전체를 덮어 어디를 눌러도 상세로 간다 */}
                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="text-ink-max no-underline after:absolute after:inset-0 after:content-['']"
                >
                  {project.title}
                </Link>
              </h2>
              <p className="label shrink-0">{project.year}</p>
            </div>

            <div className="mt-gap-3 grid gap-gap-4 lg:grid-cols-[16rem_1fr]">
              {project.image ? (
                <Image
                  src={project.image.src}
                  alt={project.image.alt[locale]}
                  width={900}
                  height={563}
                  sizes={"(min-width: 64rem) 256px, 100vw"}
                  className="aspect-[16/10] w-full object-cover object-top border border-rule transition-colors duration-[var(--dur)] ease-[var(--ease)] group-hover:border-ink"
                />
              ) : (
                <DemoShot kind={project.shot} label={project.title} locale={locale} />
              )}
              <div className="min-w-0">
                <p className="measure text-small">{project.summary[locale]}</p>

                <p className="mt-gap-2 font-mono text-small text-ink-2">
                  {project.stack.join(" · ")}
                </p>

                {/* 덮개 위로 올려 개별 링크가 계속 눌리게 한다 */}
                <p className="relative z-10 mt-gap-2 flex flex-wrap gap-gap-3 text-small">
                  {project.live ? <a href={project.live}>{ui.live[locale]} ↗</a> : null}
                  {project.repo ? <a href={project.repo}>{ui.repo[locale]} ↗</a> : null}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
