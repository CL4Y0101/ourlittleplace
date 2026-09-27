import type { Metadata } from "next";
import { LetterCards } from "@/components/letters/LetterCards";
import { letters } from "@/lib/mock/letters";

export const metadata: Metadata = { title: "Letters | Our Little Place" };

export default function LettersPage() {
  return <main id="main"><div className="page-shell route-intro"><span className="eyebrow">WORDS FOR ANOTHER TIME</span><h1>little letters.</h1><p>Small envelopes waiting for words. Open one to see a placeholder preview.</p></div><div className="page-shell route-content"><LetterCards letters={letters} /></div></main>;
}
