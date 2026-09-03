import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/content/posts";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <>
      <h1 className="display">Blog</h1>
      <ul className="rule-list mt-gap-4">
        {posts.map((post) => (
          <li key={post.slug} className="py-gap-3">
            <Link href={`/blog/${post.slug}`} className="no-underline">
              <div className="flex items-baseline justify-between gap-gap-3">
                <h2 className="text-title text-ink-max">{post.title}</h2>
                <time dateTime={post.date} className="label shrink-0">
                  {post.date}
                </time>
              </div>
              <p className="measure mt-gap-1 text-small text-ink-2">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
