import { ImageResponse } from "next/og";

export const alt = "Our Little Place — a little place for moments worth keeping";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#F4EFE7", color: "#272421", padding: 90, border: "22px solid #E5DDD0" }}>
      <div style={{ display: "flex", flexDirection: "column", fontFamily: "Georgia, serif", fontSize: 132, lineHeight: .88, letterSpacing: -8 }}><span>our little</span><span>place.</span></div>
      <div style={{ marginTop: 48, fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#816C5E" }}>a little space to keep things</div>
    </div>,
    size,
  );
}
