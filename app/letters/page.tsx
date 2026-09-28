import type { Metadata } from "next";
import { LetterCards } from "@/components/letters/LetterCards";
import { getPublicContent } from "@/lib/firebase/content";

export const metadata: Metadata = { title: "Letters | Our Little Place" };

export const dynamic = "force-dynamic";

export default async function LettersPage() {
  const { letters } = await getPublicContent();
  return <main id="main"><div className="page-shell route-intro"><span className="eyebrow">WORDS FOR ANOTHER TIME</span><h1>little letters.</h1><p>Small envelopes waiting for words. Open one to read what is inside.</p></div><div className="page-shell route-content">{letters.length ? <LetterCards letters={letters} /> : <p className="small-copy">Letters will go here.</p>}</div></main>;
}
