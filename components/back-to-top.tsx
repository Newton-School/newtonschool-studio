"use client";

import { useEffect, useState } from "react";
import { PixelIcon } from "@/components/pixel-icon";

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 1400);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const launch = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { window.scrollTo({ top: 0, behavior: "auto" }); return; }
    setLaunching(true);
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 260);
    window.setTimeout(() => setLaunching(false), 1200);
  };

  return <button className={`back-to-top ${visible ? "visible" : ""} ${launching ? "launching" : ""}`} type="button" onClick={launch} aria-label="Back to top" tabIndex={visible ? 0 : -1}>
    <PixelIcon name="rocket" scale={3} />
    <span className="back-to-top-trail" aria-hidden="true" />
  </button>;
}
