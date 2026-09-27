import { Intro } from "@/components/sections/Intro";
import { Hero } from "@/components/sections/Hero";
import { RightNow } from "@/components/sections/RightNow";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { LittleMoments } from "@/components/sections/LittleMoments";
import { HerGallery } from "@/components/sections/HerGallery";
import { ThingsILove } from "@/components/sections/ThingsILove";
import { LettersPreview } from "@/components/sections/LettersPreview";
import { LatestMemory } from "@/components/sections/LatestMemory";
import { Ending } from "@/components/sections/Ending";
import { memories, timeline, latestMemory } from "@/lib/mock/memories";
import { photos } from "@/lib/mock/photos";
import { loveThings } from "@/lib/mock/love-things";
import { letters } from "@/lib/mock/letters";
import { rightNow } from "@/lib/mock/site";

export default function Home() {
  return <main id="main"><Intro /><Hero /><RightNow content={rightNow} /><StoryTimeline entries={timeline} /><LittleMoments memories={memories} /><HerGallery photos={photos} /><ThingsILove items={loveThings} /><LettersPreview letters={letters} /><LatestMemory memory={latestMemory} /><Ending /></main>;
}
