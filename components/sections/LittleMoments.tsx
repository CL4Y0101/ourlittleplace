import { MemorySpread } from "@/components/motion/MemorySpread";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Memory } from "@/types/content";

export function LittleMoments({ memories }: { memories: Memory[] }) {
  return <section className="home-section" aria-labelledby="moments-title"><div className="moments-heading"><span className="eyebrow">THE IN-BETWEEN PAGES</span><h2 id="moments-title" className="section-title"><TextReveal>little moments.</TextReveal></h2><p className="small-copy">An untidy collection of things worth keeping.</p></div><MemorySpread memories={memories} /></section>;
}
