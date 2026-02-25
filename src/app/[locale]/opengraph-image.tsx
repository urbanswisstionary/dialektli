import fs from "fs"
import { ImageResponse } from "next/og"
import path from "path"

export const alt = "Dialektli - Swiss Dialect Dictionary"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const logoPath = path.join(process.cwd(), "public/assets/dialektli_logo.svg")
  const logoSvg = fs.readFileSync(logoPath, "utf-8")
  const logoDataUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`

  return new ImageResponse(
    <div
      style={{
        background: "#ffffff",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
      }}
    >
      {/* Red accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "#c41c1c",
        }}
      />
      {/* Logo */}
      {/* oxlint-disable-next-line no-img-element */}
      <img
        src={logoDataUri}
        alt="Dialektli logo"
        width={322}
        height={200}
        style={{ marginBottom: 24 }}
      />
      {/* Subtitle */}
      <div
        style={{
          fontSize: 24,
          color: "#666",
          fontWeight: 400,
        }}
      >
        Swiss Dialect Dictionary
      </div>
      {/* Tagline */}
      <div
        style={{
          marginTop: 24,
          display: "flex",
          alignItems: "center",
          gap: 12,
          color: "#c41c1c",
          fontSize: 16,
          fontWeight: 500,
        }}
      >
        <span style={{ fontSize: 28 }}>✙</span>
        <span>Community-driven Swiss expressions</span>
        <span style={{ fontSize: 28 }}>✚</span>
      </div>
    </div>,
    { ...size },
  )
}
