import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Memory } from "@/types/content";

export function StoryTimeline({ entries }: { entries: Memory[] }) {
  return <section className="home-section story-section" aria-labelledby="story-title"><div className="page-shell"><div className="story-heading"><div><span className="eyebrow">THE PAGES IN BETWEEN</span><h2 id="story-title" className="section-title"><TextReveal>our story.</TextReveal></h2></div><p className="small-copy">A place for the moments that made the story. More pages can be added here over time.</p></div>{entries.length ? <div className="story-flow">{entries.map(entry => <article className="story-entry" key={entry.id}><span className="story-dot" aria-hidden="true" /><div className="story-entry-copy"><span className="eyebrow">{entry.dateLabel}</span><h3>{entry.title}</h3><p className="small-copy">{entry.description}</p>{(entry.location || entry.song) && <p className="eyebrow">{[entry.location, entry.song].filter(Boolean).join(" · ")}</p>}</div><div className="paper-photo story-entry-photo"><ImageReveal photo={entry.photo} sizes="(max-width: 640px) 75vw, 35vw" /><span className="paper-photo-caption">{entry.photo.title}</span></div></article>)}</div> : <p className="small-copy">Story pages will go here.</p>}</div></section>;
}
