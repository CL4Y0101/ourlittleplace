import { LivingPhoto } from "@/components/motion/LivingPhoto";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Photo } from "@/types/content";

export function Hero({ photo, line }: { photo?: Photo; line?: string }) {
  return <section className="home-section hero" aria-labelledby="hero-title"><div className="hero-copy"><span className="eyebrow hero-overline">A LITTLE SPACE TO KEEP THINGS</span><h1 id="hero-title"><span>our</span><span>little</span><span>place.</span></h1>{line && <p className="hero-statement"><TextReveal>{line}</TextReveal></p>}</div>{photo && <LivingPhoto photo={photo} />}<span className="scroll-cue">SCROLL TO TURN THE PAGE</span></section>;
}
