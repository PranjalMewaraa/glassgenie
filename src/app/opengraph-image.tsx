import { ImageResponse } from "next/og";
import { business } from "@/content/business";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${business.name} — ${business.tagline}`;

// Default site-wide Open Graph image. Branded navy card.
// ASSET NOTE: replace with art derived from the real genie logo when available.
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
          background: "linear-gradient(135deg, #0b1220 0%, #1c2740 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 24,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 56,
              fontWeight: 800,
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>
              {business.name}
            </span>
            <span style={{ fontSize: 22, letterSpacing: 6, color: "#94a3b8" }}>
              {business.tagline}
            </span>
          </div>
        </div>
        <div
          style={{
            marginTop: 56,
            fontSize: 60,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Uncompromising Safety. Flawless Auto Glass.
        </div>
        <div style={{ marginTop: 28, fontSize: 28, color: "#cbd5e1" }}>
          Mobile windshield repair &amp; replacement across Dallas–Fort Worth
        </div>
      </div>
    ),
    { ...size }
  );
}
