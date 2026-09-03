import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Sidenote } from "@/components/sidenote";
import { Decisions } from "@/components/decisions";
import { projects, getProject } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article>
      <p className="label">{project.year}</p>
      <h1 className="display mt-gap-2">{project.title}</h1>
      <p className="measure mt-gap-3 text-ink-2">{project.summary}</p>

      <dl className="rule-list mt-gap-4 text-small">
        <div className="flex gap-gap-3 py-gap-2">
          <dt className="label w-24 shrink-0">역할</dt>
          <dd>{project.role}</dd>
        </div>
        <div className="flex gap-gap-3 py-gap-2">
          <dt className="label w-24 shrink-0">스택</dt>
          <dd>{project.stack.join(" · ")}</dd>
        </div>
        {project.live ? (
          <div className="flex gap-gap-3 py-gap-2">
            <dt className="label w-24 shrink-0">링크</dt>
            <dd>
              <a href={project.live}>{project.live.replace(/^https?:\/\//, "")}</a>
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="prose measure mt-gap-5">
        {project.body.map((block) => (
          <p key={block.text.slice(0, 24)}>
            {block.note ? <Sidenote>{block.note}</Sidenote> : null}
            {block.text}
          </p>
        ))}
      </div>

      <Decisions items={project.decisions} />
    </article>
  );
}
