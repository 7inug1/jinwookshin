import Link from "next/link";
import type { Metadata } from "next";
import { DemoShot } from "@/components/demo-shot";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <h1 className="display">Projects</h1>
      <p className="measure mt-gap-2 text-small text-ink-2">
        만든 것과 그때 내린 결정. 목록은 무엇을 정했는지까지, 상세는 그 근거와 측정까지 맡는다.
      </p>

      <nav aria-label="프로젝트 목차" className="mt-gap-4">
        <h2 className="label mb-gap-1">목차</h2>
        <ol className="rule-list">
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
        {projects.map((project) => (
          <article
            key={project.slug}
            id={project.slug}
            className="scroll-mt-gap-3 border-t border-rule py-gap-4"
          >
            <div className="flex items-baseline justify-between gap-gap-3">
              <h2 className="text-title">
                <Link href={`/projects/${project.slug}`} className="no-underline text-ink-max">
                  {project.title}
                </Link>
              </h2>
              <p className="label shrink-0">{project.year}</p>
            </div>

            <div className="mt-gap-3 grid gap-gap-4 lg:grid-cols-[1fr_18rem]">
              <div className="min-w-0">
                <p className="measure text-small">{project.summary}</p>

                <dl className="mt-gap-3 grid grid-cols-[3.5rem_1fr] gap-x-gap-3 gap-y-gap-2 text-small">
                  <dt className="label pt-[0.25em]">역할</dt>
                  <dd>{project.role}</dd>

                  <dt className="label pt-[0.25em]">스택</dt>
                  <dd className="font-mono text-ink-2">{project.stack.join(" · ")}</dd>

                  <dt className="label pt-[0.25em]">결정</dt>
                  <dd>
                    <ol className="text-ink-2">
                      {project.decisions.map((decision, i) => (
                        <li key={decision.question}>
                          <span className="font-mono mr-2 select-none">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {decision.question}
                        </li>
                      ))}
                    </ol>
                  </dd>

                  <dt className="label pt-[0.25em]">링크</dt>
                  <dd className="flex flex-wrap gap-gap-3">
                    <Link href={`/projects/${project.slug}`}>상세</Link>
                    {project.live ? <a href={project.live}>라이브 ↗</a> : null}
                    {project.repo ? <a href={project.repo}>저장소 ↗</a> : null}
                  </dd>
                </dl>
              </div>

              {project.image ? (
                <figure className="m-0">
                  <img
                    src={project.image.src}
                    alt={project.image.alt}
                    width={640}
                    height={400}
                    className="h-auto w-full border border-rule"
                  />
                </figure>
              ) : (
                <DemoShot kind={project.shot} label={project.title} />
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
