import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <h1 className="display">Projects</h1>
      <ul className="rule-list mt-gap-4">
        {projects.map((p) => (
          <li key={p.slug} className="py-gap-3">
            <Link href={`/projects/${p.slug}`} className="no-underline">
              <div className="flex items-baseline justify-between gap-gap-3">
                <h2 className="text-title text-ink-max">{p.title}</h2>
                <span className="label shrink-0">{p.year}</span>
              </div>
              <p className="measure mt-gap-1 text-small text-ink-2">{p.summary}</p>
            </Link>
            <p className="label mt-gap-2">{p.stack.join(" · ")}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
