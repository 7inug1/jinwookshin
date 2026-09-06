import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { isLocale, defaultLocale } from "@/content/i18n";

export const alt = `${site.name} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** 링크를 공유했을 때 보이는 카드. 사이트와 같은 무채색 조판을 쓴다 */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#2e2e2b",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              background: "#111110",
              color: "#fbfbf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            JS
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#000" }}>{site.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 56, lineHeight: 1.15, color: "#000" }}>
            {site.greeting[locale]}
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.4, color: "#6b6b66" }}>
            {site.availability[locale]}
          </div>
        </div>

        <div style={{ fontSize: 24, letterSpacing: 2, color: "#8a8a84" }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
