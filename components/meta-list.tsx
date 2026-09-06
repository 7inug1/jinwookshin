export type MetaRow = { label: string; value: React.ReactNode; mono?: boolean };

/** 문서의 속성을 모아 두는 자리. 본문과 선으로 갈린다 */
export function MetaList({ heading, rows }: { heading: string; rows: MetaRow[] }) {
  return (
    <section aria-label={heading} className="mt-gap-4">
      <dl className="rule-list text-small">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[4.5rem_1fr] gap-gap-3 py-gap-2">
            <dt className="label pt-[0.25em]">{row.label}</dt>
            <dd className={`min-w-0 break-words ${row.mono ? "font-mono text-ink-2" : ""}`}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
