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
import { getPublicContent } from "@/lib/firebase/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { settings, photos, memories, timeline, letters, loveThings } = await getPublicContent();
  const heroPhoto = photos.find(photo => photo.id === settings?.heroPhotoId) ?? photos[0];
  const latestMemory = timeline.at(-1) ?? memories.at(-1);
  return <main id="main"><Intro intro={settings?.intro} /><Hero photo={heroPhoto} line={settings?.heroLine} />{settings?.rightNow && <RightNow content={settings.rightNow} />}<StoryTimeline entries={timeline} /><LittleMoments memories={memories} /><HerGallery photos={photos} /><ThingsILove items={loveThings} /><LettersPreview letters={letters} />{latestMemory && <LatestMemory memory={latestMemory} />}<Ending /></main>;
}
