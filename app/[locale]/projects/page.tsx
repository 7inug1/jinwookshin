import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ProjectShot } from "@/components/project-shot";
import { ExternalLink } from "@/components/external-link";
import { projects, archive } from "@/content/projects";
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
          {archive.map((item) => (
            <li key={item.title} className="py-gap-1">
              <a
                href="#archive"
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-gap-2 no-underline"
              >
                <span className="font-mono text-small text-ink-2 select-none">—</span>
                <span className="min-w-0 underline underline-offset-2">{ui.archive[locale]}</span>
                <span className="label">{item.year}</span>
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
              <h2 className="min-w-0 text-title">
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
              <ProjectShot
                project={project}
                locale={locale}
                sizes="(min-width: 64rem) 256px, 100vw"
                hover
              />
              <div className="flex min-w-0 flex-col">
                <p className="measure text-small">{project.summary[locale]}</p>

                {/* 2열일 때만 세로로 세운다. 한 열로 쌓이면 가로로 흐른다 */}
                {project.stackLayout === "list" ? (
                  <ul className="mt-gap-3 font-mono text-small text-ink-2 max-lg:flex max-lg:flex-wrap max-lg:gap-x-3">
                    {project.stack.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-gap-2 font-mono text-small text-ink-2">
                    {project.stack.join(" · ")}
                  </p>
                )}

                {/* 덮개 위로 올려 개별 링크가 계속 눌리게 한다 */}
                {/* 스택 길이와 상관없이 링크는 항상 맨 아래 */}
                <p className="relative z-10 mt-auto flex flex-wrap gap-gap-3 pt-gap-3 text-small">
                  {project.live ? (
                    <ExternalLink href={project.live}>{ui.live[locale]}</ExternalLink>
                  ) : null}
                  {project.repo ? (
                    <ExternalLink href={project.repo}>{ui.repo[locale]}</ExternalLink>
                  ) : null}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 아카이브. 카드 형식은 같게 두고 번호만 줄표로 구분한다 */}
      <section id="archive" className="mt-gap-5 scroll-mt-gap-3 border-t border-ink pt-gap-3">
        <h2 className="label">{ui.archive[locale]}</h2>

        <div className="mt-gap-2">
          {archive.map((item) => (
            <article
              key={item.title}
              className="group relative -mx-gap-2 px-gap-2 py-gap-4 transition-colors duration-[var(--dur)] ease-[var(--ease)] hover:bg-surface"
            >
              <div className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-gap-2">
                <span className="font-mono text-small text-ink-2 select-none">—</span>
                <h3 className="min-w-0 text-title">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-max no-underline after:absolute after:inset-0 after:content-['']"
                  >
                    {item.title}
                  </a>
                </h3>
                <p className="label shrink-0">{item.year}</p>
              </div>

              <div className="mt-gap-3 grid gap-gap-4 lg:grid-cols-[16rem_1fr]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt[locale]}
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(min-width: 64rem) 256px, 100vw"
                  className="frame h-auto w-full transition-colors duration-[var(--dur)] ease-[var(--ease)] group-hover:border-ink"
                />

                <div className="flex min-w-0 flex-col">
                  <p className="measure text-small">{item.note[locale]}</p>
                  <p className="relative z-10 mt-auto flex flex-wrap gap-gap-3 pt-gap-3 text-small">
                    <ExternalLink href={item.url}>{ui.live[locale]}</ExternalLink>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
