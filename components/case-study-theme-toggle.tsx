"use client";

import { useEffect, useState } from "react";
import { PixelIcon } from "@/components/pixel-icon";

export function CaseStudyThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("newtonschool-studio-theme") as "light" | "dark" | null;
    const next = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("newtonschool-studio-theme", next);
  };

  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
    <PixelIcon name={theme === "light" ? "sun" : "moon"} />
  </button>;
}
