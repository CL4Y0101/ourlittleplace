import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Photo } from "@/types/content";

export function HerGallery({ photos }: { photos: Photo[] }) {
  const [primary, second, third, fourth, fifth, ...more] = photos;
  const secondary = fifth ?? second;
  const filmPhotos = fifth
    ? [third, fourth, second, ...more].filter((photo): photo is Photo => photo !== undefined)
    : photos.slice(2);

  return (
    <section className="home-section her-section" aria-labelledby="her-title">
      <div className="page-shell">
        <div className="her-heading">
          <div>
            <span className="eyebrow">A SMALL EXHIBITION</span>
            <h2 id="her-title" className="section-title"><TextReveal>her.</TextReveal></h2>
          </div>
          <span className="handwriting">a place for favorite portraits</span>
        </div>
        {primary ? (
          <div className="exhibition">
            <div className="exhibition-primary"><ImageReveal photo={primary} sizes="(max-width: 640px) 70vw, 40vw" /></div>
            <div className="exhibition-copy">
              <span className="photo-index">01 / {String(photos.length).padStart(2, "0")}</span>
              <p>Some photographs ask to be looked at a little longer.</p>
            </div>
            {secondary && <div className="exhibition-secondary"><ImageReveal photo={secondary} sizes="(max-width: 640px) 40vw, 28vw" /></div>}
          </div>
        ) : <p className="small-copy">Photos will go here.</p>}
        {filmPhotos.length > 0 && <div className="film-strip">
          {filmPhotos.map(photo => <ImageReveal key={photo.id} photo={photo} sizes="(max-width: 640px) 30vw, 30vw" />)}
        </div>}
      </div>
    </section>
  );
}
