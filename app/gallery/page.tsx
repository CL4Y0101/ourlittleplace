import type { Metadata } from "next";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { photos } from "@/lib/mock/photos";

export const metadata: Metadata = { title: "Gallery | Our Little Place" };

export default function GalleryPage() {
  return <main id="main"><div className="page-shell route-intro"><span className="eyebrow">A GROWING COLLECTION</span><h1>the gallery.</h1><p>A quiet home for photographs. The images here are neutral placeholders.</p></div><div className="page-shell route-content photo-grid">{photos.map(photo => <figure key={photo.id}><ImageReveal photo={photo} sizes="(max-width: 640px) 45vw, 30vw" /><figcaption>{photo.title}</figcaption></figure>)}</div></main>;
}
