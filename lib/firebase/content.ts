import "server-only";

import { Timestamp } from "firebase-admin/firestore";
import type { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase/admin";
import { site, rightNow as mockRightNow } from "@/lib/mock/site";
import { photos as mockPhotos } from "@/lib/mock/photos";
import { memories as mockMemories, timeline as mockTimeline } from "@/lib/mock/memories";
import { letters as mockLetters } from "@/lib/mock/letters";
import { loveThings as mockLoveThings } from "@/lib/mock/love-things";
import type { Letter, LoveThing, Memory, Photo, RightNowContent, SiteSettings } from "@/types/content";

export type PublicContent = {
  settings: SiteSettings | null;
  photos: Photo[];
  memories: Memory[];
  timeline: Memory[];
  letters: Letter[];
  loveThings: LoveThing[];
};

const empty: PublicContent = { settings: null, photos: [], memories: [], timeline: [], letters: [], loveThings: [] };

function string(value: unknown): string { return typeof value === "string" ? value : ""; }
function iso(value: unknown): string | undefined { return value instanceof Timestamp ? value.toDate().toISOString() : undefined; }
function order(data: DocumentData): number { return typeof data.order === "number" ? data.order : 0; }
function byOrder(a: QueryDocumentSnapshot, b: QueryDocumentSnapshot) { return order(a.data()) - order(b.data()) || a.id.localeCompare(b.id); }
function safePhoto(id: unknown, photos: Map<string, Photo>) { return typeof id === "string" ? photos.get(id) : undefined; }

function mockContent(): PublicContent {
  return { settings: { ...site, rightNow: mockRightNow, heroPhotoId: mockPhotos[0]?.id }, photos: mockPhotos, memories: mockMemories, timeline: mockTimeline, letters: mockLetters, loveThings: mockLoveThings };
}

function fallback(): PublicContent {
  return process.env.NODE_ENV === "development" && process.env.USE_MOCK_CONTENT === "true" ? mockContent() : empty;
}

export async function getPublicContent(): Promise<PublicContent> {
  const db = getAdminDb();
  if (!db) return fallback();
  try {
    const [settingsDoc, photoDocs, memoryDocs, timelineDocs, letterDocs, loveDocs] = await Promise.all([
      db.collection("settings").doc("site").get(),
      db.collection("photos").where("published", "==", true).get(),
      db.collection("memories").where("status", "==", "published").get(),
      db.collection("timeline").where("published", "==", true).get(),
      db.collection("letters").where("published", "==", true).get(),
      db.collection("loveThings").where("published", "==", true).get(),
    ]);

    // A photo may only reach the public view model after its own visibility check.
    const photos = photoDocs.docs.sort(byOrder).flatMap(doc => {
      const data = doc.data();
      const src = string(data.src);
      // Phase 4 supports only local prototype paths; remote image delivery starts in Phase 5.
      if (data.sourceType === "cloudinary" || !src.startsWith("/") || src.startsWith("//") || !string(data.alt) || !["portrait", "landscape", "square"].includes(data.aspect)) return [];
      return [{ id: doc.id, src, alt: data.alt as string, title: string(data.title), caption: string(data.caption) || undefined, aspect: data.aspect as Photo["aspect"], sourceType: "local" as const, createdAt: iso(data.createdAt) }];
    });
    const photoById = new Map(photos.map(photo => [photo.id, photo]));
    const settingsData = settingsDoc.data();
    const rightPhoto = safePhoto(settingsData?.rightNow?.photoId, photoById);
    const rightNow: RightNowContent | undefined = rightPhoto ? {
      photo: rightPhoto,
      note: string(settingsData?.rightNow?.note), mood: string(settingsData?.rightNow?.mood),
      song: string(settingsData?.rightNow?.song), updatedLabel: string(settingsData?.rightNow?.updatedLabel),
    } : undefined;
    const settings: SiteSettings | null = settingsData ? {
      title: string(settingsData.siteTitle) || "Our Little Place",
      description: string(settingsData.description),
      heroLine: string(settingsData.heroLine),
      intro: {
        eyebrow: string(settingsData.intro?.eyebrow), line1: string(settingsData.intro?.line1),
        line2: string(settingsData.intro?.line2), line3: string(settingsData.intro?.line3),
      },
      heroPhotoId: string(settingsData.heroPhotoId), rightNow, updatedAt: iso(settingsData.updatedAt),
    } : null;
    const toMemory = (doc: QueryDocumentSnapshot): Memory | null => {
      const data = doc.data();
      const photo = safePhoto(data.photoId ?? data.photoIds?.[0], photoById);
      if (!photo) return null;
      return { id: doc.id, title: string(data.title), description: string(data.description ?? data.story), dateLabel: string(data.dateLabel), photo, location: string(data.location) || undefined, song: string(data.song) || undefined, createdAt: iso(data.createdAt) };
    };
    const now = Date.now();
    const letters = letterDocs.docs.sort(byOrder).flatMap(doc => {
      const data = doc.data();
      // Admin reads bypass rules. Reject future locks and malformed lock dates before rendering HTML.
      if (data.unlockDate && (typeof data.unlockDate.toMillis !== "function" || data.unlockDate.toMillis() > now)) return [];
      return [{ id: doc.id, title: string(data.title), coverText: string(data.coverText), preview: string(data.preview ?? data.content), createdAt: iso(data.createdAt) }];
    });
    const loveThings = loveDocs.docs.sort(byOrder).map(doc => {
      const data = doc.data();
      return { id: doc.id, text: string(data.text), photo: safePhoto(data.photoId, photoById), createdAt: iso(data.createdAt) };
    });
    const content = {
      settings, photos,
      memories: memoryDocs.docs.sort(byOrder).map(toMemory).filter((item): item is Memory => item !== null),
      timeline: timelineDocs.docs.sort(byOrder).map(toMemory).filter((item): item is Memory => item !== null),
      letters, loveThings,
    };
    const isEmpty = !settingsData && !photoDocs.size && !memoryDocs.size && !timelineDocs.size && !letterDocs.size && !loveDocs.size;
    return isEmpty ? fallback() : content;
  } catch (error) {
    console.error("Public Firestore read failed", error);
    return fallback();
  }
}
