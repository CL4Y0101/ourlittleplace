import { LetterCards } from "@/components/letters/LetterCards";
import { TextReveal } from "@/components/motion/TextReveal";
import { PaperLink } from "@/components/motion/PaperTransition";
import type { Letter } from "@/types/content";

export function LettersPreview({ letters }: { letters: Letter[] }) {
  return <section className="home-section letters-section" aria-labelledby="letters-title"><div className="page-shell"><div className="letters-top"><div><span className="eyebrow">WORDS FOR ANOTHER TIME</span><h2 id="letters-title" className="section-title"><TextReveal>little letters.</TextReveal></h2></div><PaperLink className="text-link" href="/letters">all letters <span aria-hidden="true">↗</span></PaperLink></div><LetterCards letters={letters} /></div></section>;
}
