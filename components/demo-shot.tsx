/**
 * 데모용 와이어프레임. 실제 스크린샷이 들어오면 project.image로 대체된다.
 * currentColor로 그려서 라이트·다크 어느 쪽이든 따라간다.
 */

const line = (x: number, y: number, w: number) => (
  <rect key={`${x}-${y}-${w}`} x={x} y={y} width={w} height="3" rx="0" opacity="0.35" />
);

function Transcript() {
  return (
    <>
      <rect x="0.5" y="0.5" width="319" height="199" fill="none" stroke="currentColor" opacity="0.3" />
      <rect x="0" y="0" width="320" height="18" opacity="0.08" />
      {line(10, 7, 46)}
      <line x1="104" y1="18" x2="104" y2="200" stroke="currentColor" opacity="0.3" />

      {[32, 56, 80, 104, 128, 152, 176].map((y, i) => (
        <g key={y}>
          <rect x="12" y={y} width="6" height="6" opacity={i === 2 ? 0.7 : 0.25} />
          {line(24, y + 1, i % 2 ? 52 : 68)}
        </g>
      ))}

      {line(118, 32, 120)}
      {[48, 58, 68, 78].map((y) => line(118, y, y === 78 ? 96 : 186))}
      <rect x="118" y="96" width="186" height="34" fill="none" stroke="currentColor" opacity="0.35" />
      {[104, 114].map((y) => line(126, y, y === 104 ? 150 : 84))}
      {[
        [118, 144, 54],
        [178, 144, 42],
        [228, 144, 62],
      ].map(([x, y, w]) => (
        <rect key={x} x={x} y={y} width={w} height="12" fill="none" stroke="currentColor" opacity="0.35" />
      ))}
      {[170, 180].map((y) => line(118, y, y === 170 ? 186 : 132))}
    </>
  );
}

function Grid() {
  return (
    <>
      <rect x="0.5" y="0.5" width="319" height="199" fill="none" stroke="currentColor" opacity="0.3" />
      <rect x="0" y="0" width="320" height="26" opacity="0.08" />
      {line(14, 11, 58)}
      {[220, 250, 280].map((x) => line(x, 12, 22))}

      {[0, 1, 2].map((col) =>
        [0, 1].map((row) => {
          const x = 14 + col * 98;
          const y = 42 + row * 78;
          return (
            <g key={`${col}-${row}`}>
              <rect x={x} y={y} width="84" height="46" opacity="0.12" />
              {line(x, y + 54, 62)}
              {line(x, y + 62, 38)}
            </g>
          );
        }),
      )}
    </>
  );
}

const shots = { transcript: Transcript, grid: Grid };

export type DemoShotKind = keyof typeof shots;

export function DemoShot({ kind, label }: { kind: DemoShotKind; label: string }) {
  const Shape = shots[kind];
  return (
    <figure className="m-0">
      <svg
        viewBox="0 0 320 200"
        className="block h-auto w-full text-ink"
        fill="currentColor"
        role="img"
        aria-label={`${label} 데모 와이어프레임`}
      >
        <Shape />
      </svg>
      <figcaption className="label mt-gap-1">데모 와이어프레임</figcaption>
    </figure>
  );
}
