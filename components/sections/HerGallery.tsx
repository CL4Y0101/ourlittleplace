import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Photo } from "@/types/content";

export function HerGallery({ photos }: { photos: Photo[] }) {
  return <section className="home-section her-section" aria-labelledby="her-title"><div className="page-shell"><div className="her-heading"><div><span className="eyebrow">A SMALL EXHIBITION</span><h2 id="her-title" className="section-title"><TextReveal>her.</TextReveal></h2></div><span className="handwriting">a place for favorite portraits</span></div><div className="exhibition"><div className="exhibition-primary"><ImageReveal photo={photos[0]} sizes="(max-width: 640px) 70vw, 40vw" /></div><div className="exhibition-copy"><span className="photo-index">01 / 03</span><p>Some photographs ask to be looked at a little longer.</p></div><div className="exhibition-secondary"><ImageReveal photo={photos[4]} sizes="(max-width: 640px) 40vw, 28vw" /></div></div><div className="film-strip">{[photos[2], photos[3], photos[1]].map(photo => <ImageReveal key={photo.id} photo={photo} sizes="(max-width: 640px) 30vw, 30vw" />)}</div></div></section>;
}
