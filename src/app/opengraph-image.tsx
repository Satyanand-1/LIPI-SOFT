import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#14161a";
const PAPER = "#f4f1ea";
const ACCENT = "#d9432a";

/** Social sharing image, generated at build time in the site's visual language. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: PAPER, color: INK, padding: 72 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 14, width: "100%", background: INK }} />
          <div style={{ display: "flex", alignItems: "center", marginTop: 36 }}>
            <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
              <div style={{ position: "absolute", left: 4, top: 4, width: 48, height: 8, background: INK }} />
              <div style={{ position: "absolute", left: 12, top: 12, width: 8, height: 40, background: INK }} />
              <div style={{ position: "absolute", left: 12, top: 44, width: 24, height: 8, background: INK }} />
              <div style={{ position: "absolute", left: 42, top: 44, width: 8, height: 8, background: ACCENT }} />
            </div>
            <div style={{ display: "flex", marginLeft: 20, fontSize: 34, fontWeight: 700, letterSpacing: 6 }}>{site.name}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 980 }}>{site.tagline}</div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#454952" }}>Software · AI Automation · CRM · IT Infrastructure</div>
        </div>
      </div>
    ),
    size,
  );
}
