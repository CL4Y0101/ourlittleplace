"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import type { Photo } from "@/types/content";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export function LivingPhoto({ photo }: { photo: Photo }) {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 24 });
  const photoX = useTransform(x, value => value * 3);
  const photoY = useTransform(y, value => value * 3);
  const tapeX = useTransform(x, value => value * 5);
  const tapeY = useTransform(y, value => value * 5);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - .5);
    pointerY.set((event.clientY - rect.top) / rect.height - .5);
  }

  return (
    <div className="hero-photo-wrap" onPointerMove={onMove} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }}>
      <div className="paper-photo hero-photo">
        <motion.div className="photo-visual" style={reducedMotion ? undefined : { x: photoX, y: photoY }}>
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 86vw, (max-width: 1000px) 46vw, 580px" loading="eager" fetchPriority="high" style={{ objectFit: "cover" }} />
        </motion.div>
        <motion.span className="tape" aria-hidden="true" style={reducedMotion ? undefined : { x: tapeX, y: tapeY }} />
        <span className="paper-photo-caption">{photo.title} / PLACEHOLDER</span>
      </div>
      <span className="handwriting hero-photo-note">the beginning of a little collection</span>
      <span className="hero-side-note">AN ONGOING COLLECTION OF LITTLE THINGS</span>
    </div>
  );
}
