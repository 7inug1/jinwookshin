type Item = { label: string; text: string };

/** 결정과 그 근거. 라벨을 머리말로 두고 한 줄씩 풀어 쓴다 */
export function Decisions({ heading, items }: { heading: string; items: Item[] }) {
  return (
    <section className="mt-gap-6">
      <h2 className="label">{heading}</h2>
      <ul className="measure mt-gap-2">
        {items.map((item) => (
          <li key={item.label} className="relative mt-gap-3 pl-gap-3 text-small">
            <span aria-hidden="true" className="absolute left-0 top-0 font-mono text-ink-2">
              —
            </span>
            <span className="font-medium text-ink-max">{item.label}</span>{" "}
            <span className="text-ink-2">{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
