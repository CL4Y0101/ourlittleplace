"use client";

import { useEffect, useRef, useState } from "react";
import type { Letter } from "@/types/content";

export function LetterCards({ letters }: { letters: Letter[] }) {
  const [active, setActive] = useState<Letter | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  function close() { setActive(null); window.setTimeout(() => triggerRef.current?.focus(), 0); }
  useEffect(() => {
    if (!active) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setActive(null); window.setTimeout(() => triggerRef.current?.focus(), 0); }
      if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  return <>
    <div className="letter-grid">{letters.map(letter => <button key={letter.id} className="letter-card" type="button" onClick={event => { triggerRef.current = event.currentTarget; setActive(letter); }} aria-label={`Open ${letter.title}`}><span className="letter-card-inner"><small>{letter.coverText}</small><strong>{letter.title}</strong><span className="stamp" aria-hidden="true">✳</span></span></button>)}</div>
    {active && <div className="letter-dialog-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) close(); }}><div className="letter-dialog" role="dialog" aria-modal="true" aria-labelledby="letter-title"><button ref={closeRef} className="letter-dialog-close" type="button" onClick={close} aria-label="Close letter">×</button><span className="eyebrow">{active.coverText}</span><h3 id="letter-title">{active.title}</h3><p>{active.preview}</p></div></div>}
  </>;
}
