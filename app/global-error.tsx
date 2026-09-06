"use client";

/** 루트 레이아웃 자체가 실패했을 때만 쓰인다. 레이아웃을 대신하므로 html과 body를 직접 그린다 */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          padding: "3rem 1.5rem",
          background: "#fff",
          color: "#2e2e2b",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
          lineHeight: 1.65,
        }}
      >
        <h1 style={{ fontSize: "1.3rem", fontWeight: 500 }}>사이트를 불러오지 못했습니다.</h1>
        <p style={{ color: "#6b6b66" }}>Failed to load the site.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            padding: "0.4rem 0.8rem",
            border: "1px solid #2e2e2b",
            background: "transparent",
            font: "inherit",
            cursor: "pointer",
          }}
        >
          다시 시도 · Try again
        </button>
      </body>
    </html>
  );
}
