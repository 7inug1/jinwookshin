import Link from "next/link";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";

export default function Home() {
  return (
    <>
      <section>
        <p className="label">Frontend 3.5y → AI Application Engineer</p>
        <h1 className="display measure mt-gap-2">
          구조를 감추지 않는 쪽을 택했다.
        </h1>
        <p className="measure mt-gap-3 text-ink-2">
          데모 텍스트다. 금융 데이터 서비스의 프론트엔드를 3년 6개월 만들었고, AI 제품이 동작하는
          구조를 직접 만들어 보려고 RAG 서비스를 배포까지 혼자 진행했다. 답해도 되는 선을 어디에
          둘지는 만드는 사람의 몫이다.
        </p>
      </section>

      <section className="mt-gap-6">
        <h2 className="label mb-gap-2">Projects</h2>
        <ul className="rule-list">
          {projects.map((p) => (
            <li key={p.slug} className="py-gap-3">
              <Link href={`/projects/${p.slug}`} className="no-underline">
                <div className="flex items-baseline justify-between gap-gap-3">
                  <h3 className="text-title text-ink-max">{p.title}</h3>
                  <span className="label shrink-0">{p.year}</span>
                </div>
                <p className="measure mt-gap-1 text-small text-ink-2">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-gap-5">
        <h2 className="label mb-gap-2">Blog</h2>
        <ul className="rule-list">
          {posts.map((post) => (
            <li key={post.slug} className="py-gap-2">
              <Link href={`/blog/${post.slug}`} className="no-underline">
                <div className="flex items-baseline justify-between gap-gap-3">
                  <span className="text-ink-max">{post.title}</span>
                  <time dateTime={post.date} className="label shrink-0">
                    {post.date}
                  </time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
