"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { motionTokens } from "@/lib/motion/tokens";
import { site } from "@/lib/mock/site";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const storageKey = "our-little-place:intro-seen";
const introChangeEvent = "our-little-place:intro-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(introChangeEvent, onChange);
  return () => { window.removeEventListener("storage", onChange); window.removeEventListener(introChangeEvent, onChange); };
}
function getSnapshot() {
  try { return localStorage.getItem(storageKey) ? "seen" : "new"; }
  catch { return "new"; }
}
function getServerSnapshot() { return "checking"; }

export function Intro() {
  const seen = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [replay, setReplay] = useState(false);
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const mode = leaving ? "leaving" : replay || (!entered && seen === "new") ? "open" : !entered && seen === "checking" ? "checking" : "closed";
  const reducedMotion = useReducedMotion();
  const enterRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (mode === "open" || mode === "checking") {
      document.body.style.overflow = "hidden";
      for (const element of document.querySelectorAll(".site-header, .site-footer, main > :not(.intro-overlay):not(.intro-replay)")) element.setAttribute("inert", "");
      if (mode === "open") enterRef.current?.focus();
      return () => {
        document.body.style.overflow = "";
        for (const element of document.querySelectorAll(".site-header, .site-footer, main > :not(.intro-overlay):not(.intro-replay)")) element.removeAttribute("inert");
      };
    }
  }, [mode]);

  function enter() {
    try { localStorage.setItem(storageKey, "true"); } catch { /* Local storage may be unavailable. */ }
    setLeaving(true);
    setEntered(true);
    setReplay(false);
    window.setTimeout(() => { window.dispatchEvent(new Event(introChangeEvent)); setLeaving(false); }, reducedMotion ? 0 : 650);
  }

  return <>
    {mode !== "closed" && <motion.div className="intro-overlay" role={mode === "open" ? "dialog" : mode === "checking" ? "status" : undefined} aria-modal={mode === "open" ? "true" : undefined} aria-label={mode === "open" ? "Welcome" : undefined} initial={false} animate={{ opacity: mode === "leaving" ? 0 : 1, y: mode === "leaving" && !reducedMotion ? -25 : 0 }} transition={{ duration: reducedMotion ? 0 : motionTokens.duration.base, ease: motionTokens.ease.standard }}>
      {mode === "checking" && <div className="intro-boot"><span className="brand">our little place<span className="brand-mark">.</span></span><span className="eyebrow">OPENING</span></div>}
      {mode === "open" && <><span className="eyebrow">{site.intro.eyebrow}</span><h2><span>{site.intro.line1}</span><span>{site.intro.line2}</span><span>{site.intro.line3}</span></h2><button ref={enterRef} type="button" onClick={enter}>enter this place ↗</button></>}
    </motion.div>}
    {mode === "closed" && <button className="intro-replay" type="button" onClick={() => { window.scrollTo(0, 0); setReplay(true); }}>replay intro</button>}
  </>;
}
