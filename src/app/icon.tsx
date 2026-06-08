import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated favicon — branded navy tile with blue "G".
// ASSET NOTE: replace src/app/favicon.ico or this file with the real genie mark.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220",
          color: "#2563eb",
          fontSize: 44,
          fontWeight: 800,
          fontFamily: "sans-serif",
          borderRadius: 12,
        }}
      >
        G
      </div>
    ),
    { ...size }
  );
}
