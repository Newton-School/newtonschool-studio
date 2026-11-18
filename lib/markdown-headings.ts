export type MarkdownHeading = {
  id: string;
  label: string;
};

export function slugifyHeading(value: string) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[`'’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getH2Headings(markdown: string): MarkdownHeading[] {
  let insideFence = false;
  const headings: MarkdownHeading[] = [];

  for (const line of markdown.split("\n")) {
    if (/^```/.test(line)) {
      insideFence = !insideFence;
      continue;
    }
    if (insideFence) continue;

    const match = line.match(/^##\s+(.+?)\s*#*$/);
    if (!match) continue;
    const label = match[1].trim();
    headings.push({ id: slugifyHeading(label), label });
  }

  return headings;
}

export function estimateReadingTime(markdown: string, wordsPerMinute = 230) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .match(/[\p{L}\p{N}][\p{L}\p{N}'’+.-]*/gu)?.length ?? 0;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
