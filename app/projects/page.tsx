import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <h1 className="display">Projects</h1>
      <p className="measure mt-gap-2 text-small text-ink-2">
        만든 것과 그때 내린 결정. 각 항목의 근거와 측정은 상세에 있다.
      </p>

      <div className="rule-list mt-gap-4">
        {projects.map((project) => (
          <article key={project.slug} className="grid gap-gap-3 py-gap-4 lg:grid-cols-[1fr_16rem]">
            <div className="min-w-0">
              <p className="label">{project.year}</p>
              <h2 className="mt-gap-1 text-title">
                <Link href={`/projects/${project.slug}`} className="no-underline text-ink-max">
                  {project.title}
                </Link>
              </h2>
              <p className="measure mt-gap-1 text-small">{project.summary}</p>

              <dl className="mt-gap-3 grid grid-cols-[4.5rem_1fr] gap-x-gap-2 gap-y-gap-1 text-small">
                <dt className="label pt-[0.2em]">역할</dt>
                <dd>{project.role}</dd>

                <dt className="label pt-[0.2em]">스택</dt>
                <dd className="font-mono text-ink-2">{project.stack.join(" · ")}</dd>

                <dt className="label pt-[0.2em]">결정</dt>
                <dd>
                  <ul className="text-ink-2">
                    {project.decisions.map((decision) => (
                      <li key={decision.question}>{decision.question}</li>
                    ))}
                  </ul>
                </dd>
              </dl>

              <p className="mt-gap-3 flex flex-wrap gap-gap-3 text-small">
                <Link href={`/projects/${project.slug}`}>상세</Link>
                {project.live ? <a href={project.live}>라이브 ↗</a> : null}
                {project.repo ? <a href={project.repo}>저장소 ↗</a> : null}
              </p>
            </div>

            {project.image ? (
              <img
                src={project.image.src}
                alt={project.image.alt}
                width={512}
                height={320}
                className="h-auto w-full border border-rule"
              />
            ) : (
              <div className="flex aspect-[8/5] items-center justify-center border border-rule">
                <span className="label">screenshot</span>
              </div>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
