import type { Metadata } from "next";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { getPublicContent } from "@/lib/firebase/content";

export const metadata: Metadata = { title: "Gallery | Our Little Place" };

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const { photos } = await getPublicContent();
  return <main id="main"><div className="page-shell route-intro"><span className="eyebrow">A GROWING COLLECTION</span><h1>the gallery.</h1><p>A quiet home for photographs.</p></div>{photos.length ? <div className="page-shell route-content photo-grid">{photos.map(photo => <figure key={photo.id}><ImageReveal photo={photo} sizes="(max-width: 640px) 45vw, 30vw" /><figcaption>{photo.title}</figcaption></figure>)}</div> : <p className="page-shell route-content small-copy">Photographs will go here.</p>}</main>;
}
