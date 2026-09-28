import type { Metadata } from "next";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { getPublicContent } from "@/lib/firebase/content";

export const metadata: Metadata = { title: "Story | Our Little Place" };

export const dynamic = "force-dynamic";

export default async function StoryPage() {
  const { timeline } = await getPublicContent();
  return <main id="main"><div className="page-shell route-intro"><span className="eyebrow">MORE PAGES TO COME</span><h1>our story.</h1><p>An outline for moments and milestones. More pages can be added here over time.</p></div><StoryTimeline entries={timeline} /></main>;
}
