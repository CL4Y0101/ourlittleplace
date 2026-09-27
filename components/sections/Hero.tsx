import { LivingPhoto } from "@/components/motion/LivingPhoto";
import { TextReveal } from "@/components/motion/TextReveal";
import { photos } from "@/lib/mock/photos";
import { site } from "@/lib/mock/site";

export function Hero() {
  return <section className="home-section hero" aria-labelledby="hero-title"><div className="hero-copy"><span className="eyebrow hero-overline">A LITTLE SPACE TO KEEP THINGS</span><h1 id="hero-title"><span>our</span><span>little</span><span>place.</span></h1><p className="hero-statement"><TextReveal>{site.heroLine}</TextReveal></p></div><LivingPhoto photo={photos[0]} /><span className="scroll-cue">SCROLL TO TURN THE PAGE</span></section>;
}
