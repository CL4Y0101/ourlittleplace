import Image from "next/image";
import type { LoveThing } from "@/types/content";
import { TextReveal } from "@/components/motion/TextReveal";

export function ThingsILove({ items }: { items: LoveThing[] }) {
  return <section className="home-section love-section" aria-labelledby="love-title"><div className="page-shell"><div className="love-heading"><div><span className="eyebrow">AN UNFINISHED LIST</span><h2 id="love-title"><TextReveal>things I love about you.</TextReveal></h2></div><p>not in any particular order.</p></div><ol className="love-list">{items.map((item, index) => <li key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><p>{item.text}</p>{item.photo && <div className="photo-visual"><Image src={item.photo.src} alt={item.photo.alt} fill sizes="130px" style={{ objectFit: "cover" }} /></div>}</li>)}</ol></div></section>;
}
