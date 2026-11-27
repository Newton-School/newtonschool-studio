import type { CSSProperties } from "react";

const coverColors: Record<string, [string, string]> = {
  rishiverse: ["#c2410c", "#7c3aed"],
  zuvees: ["#db2777", "#f59e0b"],
  "maverick-fieldvue": ["#ea580c", "#0ea5e9"],
  "iitr-collaboration": ["#0d9488", "#2563eb"],
  "system-design-simulator": ["#2563eb", "#10b981"],
};

export function coverStyle(slug: string) {
  const [a, b] = coverColors[slug] ?? ["#2563eb", "#7c3aed"];
  return { "--cover-a": a, "--cover-b": b } as CSSProperties;
}
