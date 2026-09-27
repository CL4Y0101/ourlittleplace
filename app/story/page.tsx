import type { Metadata } from "next";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { timeline } from "@/lib/mock/memories";

export const metadata: Metadata = { title: "Story | Our Little Place" };

export default function StoryPage() {
  return <main id="main"><div className="page-shell route-intro"><span className="eyebrow">MORE PAGES TO COME</span><h1>our story.</h1><p>An editable outline for moments and milestones. These entries are placeholders until the real story is added.</p></div><StoryTimeline entries={timeline} /></main>;
}
