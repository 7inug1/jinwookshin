import Link from "next/link";
import { Portrait } from "@/components/portrait";
import { site } from "@/content/site";

export default function Home() {
  return (
    <>
      <section className="grid gap-gap-4 sm:grid-cols-[10rem_1fr] sm:gap-gap-5">
        <Portrait />

        <div className="min-w-0">
          <p className="label">Frontend 3.5y → AI Application Engineer</p>
          <h1 className="display measure mt-gap-2">구조를 감추지 않는 쪽을 택했다.</h1>
          <div className="prose measure mt-gap-3 text-small">
            <p>
              데모 텍스트다. 금융 데이터 서비스의 프론트엔드를 3년 6개월 만들었다. AI 제품이
              동작하는 구조를 직접 만들어 보려고 RAG 서비스를 배포까지 혼자 진행했다.
            </p>
            <p>
              데모 텍스트다. 캐나다에서 7년을 살았고 거기서 컴퓨터공학을 공부했다. 막히면 끝까지
              파는 편이고, 판 과정을 기록해 두는 습관이 있다.
            </p>
            <p>답해도 되는 선을 어디에 둘지는 만드는 사람의 몫이다.</p>
          </div>
        </div>
      </section>

      <dl className="rule-list mt-gap-5 text-small">
        <div className="grid grid-cols-[4.5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">지금</dt>
          <dd>{site.now}</dd>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">다루는 것</dt>
          <dd className="font-mono text-ink-2">{site.skills.join(" · ")}</dd>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">쉴 때</dt>
          <dd className="text-ink-2">{site.offDuty}</dd>
        </div>
        <div className="grid grid-cols-[4.5rem_1fr] gap-gap-3 py-gap-2">
          <dt className="label pt-[0.25em]">보기</dt>
          <dd className="flex flex-wrap gap-gap-3">
            <Link href="/projects">프로젝트</Link>
            <Link href="/about">소개</Link>
            <a href={`mailto:${site.email}`}>이메일 ↗</a>
          </dd>
        </div>
      </dl>
    </>
  );
}
