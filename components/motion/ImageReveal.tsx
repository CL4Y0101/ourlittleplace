"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Photo } from "@/types/content";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type Props = { photo: Photo; className?: string; sizes: string };

export function ImageReveal({ photo, className = "", sizes }: Props) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div className={`photo-visual ${className}`} initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(8% 0 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }} viewport={{ once: true, amount: .15 }} transition={{ duration: motionTokens.duration.slow, ease: motionTokens.ease.standard }}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} style={{ objectFit: "cover" }} />
    </motion.div>
  );
}
