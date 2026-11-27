"use client";

import { useEffect, useState } from "react";

export function CaseReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".case-article");
    if (!article) return;
    const headings = [...article.querySelectorAll<HTMLElement>("h2[id]")];
    const links = [...document.querySelectorAll<HTMLAnchorElement>(".case-toc-desktop a, .case-toc-mobile a")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, -rect.top / Math.max(total, 1))));

      let current = "";
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top <= 140) current = heading.id;
        else break;
      }
      for (const link of links) {
        const active = current !== "" && link.getAttribute("href") === `#${current}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return <div className="case-progress" aria-hidden="true"><span style={{ ["--progress" as string]: progress }} /></div>;
}
