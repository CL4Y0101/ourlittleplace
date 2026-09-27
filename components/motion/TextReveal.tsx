"use client";

import { motion } from "motion/react";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type TextRevealProps = {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  stagger?: number;
  yOffset?: number;
  blur?: number;
  once?: boolean;
};

export function TextReveal({ children, className, duration = .65, delay = 0, stagger = .035, yOffset = 18, blur = 8, once = true }: TextRevealProps) {
  const reducedMotion = useReducedMotion();
  if (reducedMotion) return <span className={className}>{children}</span>;

  const words = children.split(/(\s+)/);
  let wordIndex = 0;
  return (
    <span className={`text-reveal ${className ?? ""}`} role="text" aria-label={children}>
      {words.map((part, index) => {
        if (/^\s+$/.test(part)) return <span key={index} aria-hidden="true">{part}</span>;
        const order = wordIndex++;
        return <motion.span key={index} aria-hidden="true" style={{ display: "inline-block" }} initial={{ opacity: 0, y: yOffset, filter: `blur(${blur}px)` }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once, amount: .6 }} transition={{ duration, delay: delay + order * stagger, ease: motionTokens.ease.standard }}>{part}</motion.span>;
      })}
    </span>
  );
}
