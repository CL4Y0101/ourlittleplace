import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { RightNowContent } from "@/types/content";

export function RightNow({ content }: { content: RightNowContent }) {
  return <section className="home-section right-now" aria-labelledby="right-now-title"><div className="page-shell right-now-grid"><div className="right-now-title"><span className="eyebrow">A PAGE THAT CAN CHANGE</span><h2 id="right-now-title">right<br />now.</h2></div><div className="paper-photo right-now-photo"><ImageReveal photo={content.photo} sizes="(max-width: 640px) 70vw, 30vw" /><span className="paper-photo-caption">CURRENT FAVORITE / PLACEHOLDER</span></div><div className="right-now-note"><span className="eyebrow">A NOTE FROM TODAY</span><p className="section-copy"><TextReveal>{content.note}</TextReveal></p><p className="small-copy">{content.mood}</p><div className="right-now-meta"><div><span className="eyebrow">SONG ON REPEAT</span><p>{content.song}</p></div><div><span className="eyebrow">LAST UPDATED</span><p>{content.updatedLabel}</p></div></div></div></div></section>;
}
