type Item = { question: string; answer: string };

/** 결정과 그 근거. 접지 않고 전부 펼쳐 둔다 */
export function Decisions({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <section className="mt-gap-6">
      <h2 className="label">{heading}</h2>
      <div className="mt-gap-2">
        {items.map((item, i) => (
          <div
            key={item.question}
            className="grid grid-cols-[2.5rem_1fr] gap-gap-2 border-t border-rule py-gap-3"
          >
            <span className="font-mono text-small text-ink-2 select-none pt-[0.15em]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-medium text-ink-max">{item.question}</h3>
              <p className="measure mt-gap-1 text-small text-ink-2">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
