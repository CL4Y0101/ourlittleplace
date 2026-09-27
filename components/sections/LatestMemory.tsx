import { ImageReveal } from "@/components/motion/ImageReveal";
import { PaperLink } from "@/components/motion/PaperTransition";
import type { Memory } from "@/types/content";

export function LatestMemory({ memory }: { memory: Memory }) {
  return <section className="home-section latest-section" aria-labelledby="latest-title"><div className="page-shell latest-grid"><div className="latest-copy"><span className="eyebrow">THE NEWEST PAGE</span><h2 id="latest-title">latest<br />memory.</h2><p className="small-copy">{memory.description}</p><PaperLink className="text-link" href="/story">read the story <span aria-hidden="true">↗</span></PaperLink></div><div className="paper-photo latest-photo"><ImageReveal photo={memory.photo} sizes="(max-width: 640px) 85vw, 50vw" /><span className="paper-photo-caption">{memory.title}</span></div></div></section>;
}
