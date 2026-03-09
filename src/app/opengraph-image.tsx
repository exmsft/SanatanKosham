import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SanatanKosham — The Treasury of Sanatana Dharma";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a0a2e 0%, #2d1854 60%, #1a0520 100%)",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Background pattern suggestion */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            background:
              "radial-gradient(circle at 50% 50%, #e6a817 0%, transparent 70%)",
          }}
        />

        {/* Om Symbol */}
        <div
          style={{
            fontSize: 120,
            color: "#e6a817",
            lineHeight: 1,
            marginBottom: 24,
            textShadow: "0 0 40px rgba(230,168,23,0.6)",
          }}
        >
          ॐ
        </div>

        {/* Site Name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#e6a817",
            letterSpacing: 4,
            marginBottom: 16,
          }}
        >
          SanatanKosham
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,215,100,0.85)",
            fontStyle: "italic",
            marginBottom: 8,
          }}
        >
          सनातन कोशम् — The Treasury of Sanatana Dharma
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 6,
            textTransform: "uppercase",
            marginTop: 8,
          }}
        >
          Festivals · Temples · Deities · Mantras · Scriptures
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "rgba(255,255,255,0.3)",
            letterSpacing: 2,
          }}
        >
          sanatankosham.com
        </div>
      </div>
    ),
    { ...size }
  );
}
