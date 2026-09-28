import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { existsSync } from "node:fs";
import { site, rightNow } from "../lib/mock/site";
import { photos } from "../lib/mock/photos";
import { memories, timeline } from "../lib/mock/memories";
import { letters } from "../lib/mock/letters";
import { loveThings } from "../lib/mock/love-things";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
if (!projectId || !clientEmail || !privateKey) throw new Error("Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, and FIREBASE_ADMIN_PRIVATE_KEY before seeding.");

const app = getApps()[0] ?? initializeApp({ credential: cert({ projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") }), projectId });
const db = getFirestore(app);
const now = Timestamp.now();

async function createIfMissing(collection: string, id: string, data: Record<string, unknown>) {
  const ref = db.collection(collection).doc(id);
  try {
    await ref.create(data);
    console.log(`Created ${collection}/${id}`);
  } catch (error) {
    // ALREADY_EXISTS: leave manually edited content untouched on repeated runs.
    if (typeof error === "object" && error !== null && "code" in error && error.code === 6) {
      console.log(`Skipped existing ${collection}/${id}`);
      return;
    }
    throw error;
  }
}

async function main() {
  await createIfMissing("settings", "site", {
    siteTitle: site.title, description: site.description, intro: site.intro, heroLine: site.heroLine,
    heroPhotoId: photos[0]?.id ?? "",
    rightNow: { note: rightNow.note, mood: rightNow.mood, song: rightNow.song, updatedLabel: rightNow.updatedLabel, photoId: rightNow.photo.id },
    updatedAt: now,
  });
  for (const [index, photo] of photos.entries()) await createIfMissing("photos", photo.id, {
    sourceType: "local", src: photo.src, alt: photo.alt, title: photo.title, caption: photo.caption ?? "",
    aspect: photo.aspect, published: true, order: index, createdAt: now, updatedAt: now,
  });
  for (const [index, memory] of memories.entries()) await createIfMissing("memories", memory.id, {
    title: memory.title, story: memory.description, dateLabel: memory.dateLabel, photoIds: [memory.photo.id],
    status: "published", order: index, createdAt: now, updatedAt: now,
  });
  for (const [index, entry] of timeline.entries()) await createIfMissing("timeline", entry.id, {
    title: entry.title, description: entry.description, dateLabel: entry.dateLabel, photoId: entry.photo.id,
    published: true, order: index, createdAt: now, updatedAt: now,
  });
  for (const [index, letter] of letters.entries()) await createIfMissing("letters", letter.id, {
    title: letter.title, slug: letter.id, coverText: letter.coverText, preview: letter.preview,
    content: letter.preview, published: true, order: index, createdAt: now, updatedAt: now,
  });
  for (const [index, item] of loveThings.entries()) await createIfMissing("loveThings", item.id, {
    text: item.text, ...(item.photo ? { photoId: item.photo.id } : {}),
    published: true, order: index, createdAt: now,
  });
  console.log("Seed complete. Existing documents were preserved; no documents were deleted.");
}

main().catch(error => { console.error("Seed failed:", error); process.exitCode = 1; });
