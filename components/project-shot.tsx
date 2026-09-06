import Image from "next/image";
import { DemoShot } from "@/components/demo-shot";
import type { Project } from "@/content/projects";
import type { Locale } from "@/content/i18n";

const aspect = {
  "16/10": "aspect-[16/10]",
  "3/4": "aspect-[3/4]",
} as const;

/** 목록과 상세가 같은 크롭을 쓰도록 한 곳에 둔다 */
export function ProjectShot({
  project,
  locale,
  sizes,
  hover = false,
}: {
  project: Project;
  locale: Locale;
  sizes: string;
  hover?: boolean;
}) {
  if (!project.image) {
    return <DemoShot kind={project.shot} label={project.title} locale={locale} />;
  }

  const border = hover
    ? "frame transition-colors duration-[var(--dur)] ease-[var(--ease)] group-hover:border-ink"
    : "frame";

  return (
    <Image
      src={project.image.src}
      alt={project.image.alt[locale]}
      width={800}
      height={800}
      sizes={sizes}
      className={`${aspect[project.imageAspect ?? "16/10"]} w-full object-cover object-top ${border}`}
    />
  );
}
