"use client";

import Image from "next/image";
import { useRef } from "react";
import type { PointerEvent } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import type { Memory } from "@/types/content";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type SpreadPosition = { x: number; y: number; rotate: number; scale?: number };
type Props = { memories: Memory[]; positions?: SpreadPosition[] };

function defaultPosition(index: number, count: number): SpreadPosition {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / Math.max(count, 1);
  const ring = index % 2 === 0 ? 1 : .84;
  return { x: Math.cos(angle) * 430 * ring, y: Math.sin(angle) * 250 * ring, rotate: Math.sin(angle * 1.4) * 14, scale: .88 + (index % 3) * .045 };
}

function SpreadCard({ memory, index, count, position, progress, pointerX, pointerY }: { memory: Memory; index: number; count: number; position: SpreadPosition; progress: MotionValue<number>; pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  const spread = useTransform(progress, [.12, .72], [0, 1], { clamp: true });
  const depth = .65 + (index % 3) * .25;
  const x = useTransform(() => spread.get() * position.x + pointerX.get() * depth * spread.get());
  const y = useTransform(() => spread.get() * position.y + pointerY.get() * depth * spread.get());
  const rotate = useTransform(spread, [0, 1], [(-count / 2 + index) * 2.1, position.rotate]);
  const scale = useTransform(spread, [0, 1], [1 - index * .018, position.scale ?? 1]);
  return (
    <motion.figure className="spread-card paper-photo" style={{ x, y, rotate, scale, zIndex: count - index }}>
      <div className="photo-visual"><Image src={memory.photo.src} alt={memory.photo.alt} fill sizes="(max-width: 900px) 220px, 260px" style={{ objectFit: "cover" }} /></div>
      <figcaption className="paper-photo-caption">{memory.dateLabel}</figcaption>
    </motion.figure>
  );
}

export function MemorySpread({ memories, positions }: Props) {
  const section = useRef<HTMLElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", progress => {
    if (!center.current) return;
    const visible = Math.min(1, Math.max(0, (progress - .18) / .2));
    center.current.style.opacity = String(visible);
    center.current.style.transform = `translateY(${(1 - visible) * 24}px)`;
  });

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches || scrollYProgress.get() < .7) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - .5) * 12);
    pointerY.set(((event.clientY - rect.top) / rect.height - .5) * 12);
  }

  if (!memories.length) return null;
  return (
    <section ref={section} className="memory-spread" aria-label="Little moments collage">
      <div className="spread-desktop" onPointerMove={onPointerMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
        <div ref={center} className="spread-center"><span className="eyebrow">A COLLECTION IN PROGRESS</span><p>things that probably<br />don&apos;t matter<br /><em>to anyone else.</em></p></div>
        {memories.map((memory, index) => <SpreadCard key={memory.id} memory={memory} index={index} count={memories.length} position={positions?.[index] ?? defaultPosition(index, memories.length)} progress={scrollYProgress} pointerX={pointerX} pointerY={pointerY} />)}
      </div>
      <div className="spread-mobile"><p className="section-copy">things that probably don&apos;t matter <em>to anyone else.</em></p><div className="spread-mobile-grid">{memories.map((memory, index) => <figure key={memory.id} className="paper-photo"><div className="photo-visual"><Image src={memory.photo.src} alt={memory.photo.alt} fill sizes="(max-width: 640px) 42vw, 220px" style={{ objectFit: "cover" }} /></div><figcaption className="paper-photo-caption">{memory.dateLabel}</figcaption>{index === 1 && <span className="tape" aria-hidden="true" />}</figure>)}</div></div>
    </section>
  );
}
