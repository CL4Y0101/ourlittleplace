"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { motion } from "motion/react";
import { motionTokens } from "@/lib/motion/tokens";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type TransitionContextValue = { navigate: (href: string) => void };
const TransitionContext = createContext<TransitionContextValue | null>(null);
const majorRoutes = new Set(["/", "/story", "/gallery", "/letters"]);

export function PaperTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const target = useRef<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (target.current === pathname) {
      target.current = null;
      const revealTimer = setTimeout(() => setPhase("reveal"), 40);
      const idleTimer = setTimeout(() => setPhase("idle"), 500);
      return () => { clearTimeout(revealTimer); clearTimeout(idleTimer); };
    }
  }, [pathname]);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function navigate(href: string) {
    if (href === pathname) { window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" }); return; }
    if (phase !== "idle") return;
    if (reducedMotion || !majorRoutes.has(href) || !majorRoutes.has(pathname)) { router.push(href); return; }
    target.current = href;
    setPhase("cover");
    timer.current = setTimeout(() => router.push(href), 390);
  }

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <motion.div aria-hidden="true" className="paper-transition-layer" initial={false} animate={{ y: phase === "cover" ? "0%" : phase === "reveal" ? "-100%" : "100%" }} transition={{ duration: phase === "idle" ? 0 : motionTokens.duration.base, ease: motionTokens.ease.standard }} />
    </TransitionContext.Provider>
  );
}

export function PaperLink({ href, onClick, ...props }: ComponentProps<typeof Link>) {
  const context = useContext(TransitionContext);
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !context || typeof href !== "string" || !majorRoutes.has(href)) return;
    event.preventDefault();
    context.navigate(href);
  }
  return <Link href={href} onClick={handleClick} {...props} />;
}
