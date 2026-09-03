type Item = { question: string; answer: string };

/** 빙산 구조. 표층은 짧게, 근거는 펼쳐서 */
export function Decisions({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <section className="mt-gap-5">
      <h2 className="label mb-gap-2">{heading}</h2>
      <div className="rule-list">
        {items.map((item) => (
          <details key={item.question} className="group py-gap-2">
            <summary className="cursor-pointer list-none marker:content-none">
              <span className="font-mono text-ink-2 mr-2 select-none group-open:hidden">+</span>
              <span className="font-mono text-ink-2 mr-2 hidden select-none group-open:inline">−</span>
              {item.question}
            </summary>
            <p className="measure mt-gap-2 pl-[1.4rem] text-small text-ink-2">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
