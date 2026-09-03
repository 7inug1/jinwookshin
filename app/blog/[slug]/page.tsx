import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, getPost } from "@/content/posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: Params) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article>
      <time dateTime={post.date} className="label">
        {post.date}
      </time>
      <h1 className="display measure mt-gap-2">{post.title}</h1>
      <div className="prose measure mt-gap-5">
        {post.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
