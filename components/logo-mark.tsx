/** 파비콘과 같은 JS 모노그램. 호버하면 면과 글자가 뒤집힌다 */
export function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        strokeWidth="1.5"
        className="fill-ink-max stroke-ink-max"
      />
      <g
        fill="none"
        strokeWidth="3.4"
        className="stroke-paper"
      >
        <path d="M13.6 7v11.6a3.6 3.6 0 0 1-7 .7" strokeLinecap="butt" />
        <path
          d="M25.4 10.2c0-2.1-1.9-3.3-3.9-3.2-2 .1-3.4 1.4-3.4 3.2 0 1.9 1.6 2.9 3.7 3.6 2.1.7 3.8 1.8 3.8 3.9 0 2.1-1.7 3.5-4 3.5-2.2 0-3.9-1.2-4.1-3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
