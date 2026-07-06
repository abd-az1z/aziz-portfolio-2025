import { ImageResponse } from "next/og";

export const alt = "Abdul Aziz - AI Platform Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated OG card (Master_PRP §8) — branded, not a screenshot.
 * Dark #0A0A0F, mono status badge, the one-line story.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0A0A0F",
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 70% 20%, rgba(34,211,238,0.10), transparent 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              color: "#10B981",
              letterSpacing: "2px",
            }}
          >
            [OPEN TO FULL-TIME ROLES]
          </div>
        </div>

        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "rgba(255,255,255,0.92)",
            lineHeight: 1.05,
            marginBottom: "28px",
          }}
        >
          Abdul Aziz
        </div>

        <div
          style={{
            fontSize: "34px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.4,
            maxWidth: "900px",
            marginBottom: "48px",
          }}
        >
          AI platform infrastructure — RAG pipelines, backend architecture,
          and production SaaS that stays secure when it ships.
        </div>

        <div
          style={{
            display: "flex",
            gap: "28px",
            fontSize: "24px",
            color: "#3B82F6",
          }}
        >
          <div>50+ PRs merged</div>
          <div style={{ color: "rgba(255,255,255,0.25)" }}>·</div>
          <div>3 security fixes</div>
          <div style={{ color: "rgba(255,255,255,0.25)" }}>·</div>
          <div>6,200 → 109 lines</div>
        </div>
      </div>
    ),
    size
  );
}
