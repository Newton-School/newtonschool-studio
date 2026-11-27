// Turns the recurring patterns in case study Markdown into richer layouts:
// sections, decision cards, option comparisons, incident cards, timelines,
// result and lesson cards, and stack chips. Content files stay plain Markdown.

type HastNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

type SectionKind = "summary" | "decisions" | "incidents" | "timeline" | "results" | "lessons" | "stack" | "hard" | "default";

const el = (tagName: string, className: string | string[], children: HastNode[] = [], properties: Record<string, unknown> = {}): HastNode => ({
  type: "element",
  tagName,
  properties: { className: Array.isArray(className) ? className : [className], ...properties },
  children,
});
const txt = (value: string): HastNode => ({ type: "text", value });

const isElement = (node: HastNode | undefined, tagName?: string): node is HastNode =>
  !!node && node.type === "element" && (!tagName || node.tagName === tagName);

function textOf(node: HastNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

const elementChildren = (node: HastNode) => (node.children ?? []).filter((child) => isElement(child));

function kindOf(heading: string): SectionKind {
  const value = heading.toLowerCase();
  if (value.startsWith("summary")) return "summary";
  if (value.includes("key decisions")) return "decisions";
  if (value.includes("what went wrong") || value.includes("what made it hard")) return "incidents";
  if (value.startsWith("timeline")) return "timeline";
  if (value.startsWith("results")) return "results";
  if (value.includes("lessons")) return "lessons";
  if (value.startsWith("stack")) return "stack";
  if (value.includes("why this is hard")) return "hard";
  return "default";
}

function firstContent(node: HastNode): HastNode | undefined {
  return (node.children ?? []).find((child) => !(child.type === "text" && !child.value?.trim()));
}

function startsWithStrong(node: HastNode): boolean {
  let first = firstContent(node);
  if (isElement(first, "p")) first = firstContent(first);
  return isElement(first, "strong");
}

function markLeadStrong(node: HastNode) {
  let host = node;
  let first = firstContent(host);
  if (isElement(first, "p")) { host = first; first = firstContent(host); }
  if (!isElement(first, "strong")) return;
  first.properties = { ...first.properties, className: ["md-head"] };
  const siblings = host.children ?? [];
  const next = siblings[siblings.indexOf(first) + 1];
  if (next?.type === "text" && next.value) next.value = next.value.replace(/^\s*[,;:]\s*/, " ");
}

function tableParts(table: HastNode) {
  const thead = elementChildren(table).find((child) => child.tagName === "thead");
  const tbody = elementChildren(table).find((child) => child.tagName === "tbody");
  const headRow = thead ? elementChildren(thead)[0] : undefined;
  const headers = headRow ? elementChildren(headRow).map((cell) => textOf(cell).trim()) : [];
  const rows = tbody ? elementChildren(tbody).map((row) => elementChildren(row).map((cell) => cell.children ?? [])) : [];
  return { headers, rows };
}

function part(label: string, children: HastNode[], extra = ""): HastNode {
  return el("div", ["md-part", extra].filter(Boolean), [el("span", "md-part-label", [txt(label)]), el("div", "md-part-body", children)]);
}

function convertTable(table: HastNode, kind: SectionKind): HastNode | null {
  const { headers, rows } = tableParts(table);
  if (!headers.length || !rows.length) return null;
  const first = headers[0].toLowerCase();

  if (["problem", "challenge", "issue"].includes(first) && headers.length >= 3) {
    return el("div", "md-incidents", rows.map((cells) => el("article", "md-incident", [
      el("h4", "md-incident-title", cells[0]),
      ...cells.slice(1).map((cell, index) => part(headers[index + 1], cell, index === cells.length - 2 ? "md-part-final" : "")),
    ])));
  }

  if (["when", "weeks"].includes(first) && headers.length >= 2) {
    return el("ol", "md-timeline", rows.map((cells) => el("li", "md-timeline-item", [
      el("span", "md-time", first === "weeks" ? [txt(`${headers[0]} `), ...cells[0]] : cells[0]),
      el("div", "md-milestone", [
        el("p", "md-milestone-text", cells[1]),
        ...(cells[2] ? [part(headers[2], cells[2])] : []),
      ]),
    ])));
  }

  if (first === "difficulty" && headers.length === 2) {
    return el("div", "md-cards", rows.map((cells) => el("article", "md-card", [el("h4", "md-card-title", cells[0]), el("p", "md-card-text", cells[1])])));
  }

  if (first === "option" && headers.length >= 2) {
    return el("div", "md-options", rows.map((cells) => {
      const title = textOf({ type: "element", children: cells[0] });
      const chosen = /\(chosen\)/i.test(title);
      return el("article", ["md-option", chosen ? "md-chosen" : ""].filter(Boolean), [
        el("div", "md-option-head", [
          el("h4", "md-option-title", [txt(title.replace(/\s*\(chosen\)\s*/i, "").trim())]),
          ...(chosen ? [el("span", "md-badge", [txt("Chosen")])] : []),
        ]),
        ...cells.slice(1).map((cell, index) => part(headers[index + 1], cell)),
      ]);
    }));
  }

  if (kind === "stack" && headers.length === 2) {
    return el("dl", "md-stack", rows.map((cells) => el("div", "md-stack-row", [
      el("dt", "md-stack-layer", cells[0]),
      el("dd", "md-stack-items", textOf({ type: "element", children: cells[1] }).split(/,\s*(?![^()]*\))/).map((item) => el("span", "md-chip", [txt(item.trim())]))),
    ])));
  }

  return null;
}

function groupDecisions(children: HastNode[]): HastNode[] {
  const out: HastNode[] = [];
  let card: HastNode | null = null;
  for (const child of children) {
    if (isElement(child, "h3")) {
      const match = textOf(child).match(/^decision\s+(\d+)\s*:\s*(.+)$/i);
      if (match) {
        const title = match[2].trim();
        card = el("article", "md-decision", [
          el("span", "md-decision-num", [txt(`Decision ${match[1].padStart(2, "0")}`)]),
          { ...child, children: [txt(title.charAt(0).toUpperCase() + title.slice(1))] },
        ]);
        out.push(card);
        continue;
      }
      card = null;
    }
    if (card) card.children!.push(child);
    else out.push(child);
  }
  return out;
}

function groupLeadParagraphs(children: HastNode[], kind: SectionKind): HastNode[] {
  const out: HastNode[] = [];
  let run: HastNode[] = [];
  const flush = () => {
    run.forEach(markLeadStrong);
    if (run.length >= 2) out.push(el("div", ["md-points", `md-points-${kind}`], run.map((p) => el("div", "md-point", [p]))));
    else out.push(...run);
    run = [];
  };
  for (const child of children) {
    if (child.type === "text" && !child.value?.trim()) continue;
    if (isElement(child, "p") && startsWithStrong(child)) run.push(child);
    else { flush(); out.push(child); }
  }
  flush();
  return out;
}

function transformSection(children: HastNode[], kind: SectionKind): HastNode[] {
  let result = children.map((child) => (isElement(child, "table") ? convertTable(child, kind) ?? child : child));
  if (kind === "decisions") result = groupDecisions(result);
  if (kind === "lessons" || kind === "incidents" || kind === "results") result = groupLeadParagraphs(result, kind);

  for (const child of result) {
    if ((isElement(child, "ul") || isElement(child, "ol")) && (kind === "results" || kind === "lessons")) {
      const items = elementChildren(child).filter((item) => item.tagName === "li");
      const leadCount = items.filter(startsWithStrong).length;
      if (items.length >= 2 && (kind === "results" || leadCount >= Math.ceil(items.length / 2))) {
        const className = (child.properties?.className as string[] | undefined) ?? [];
        child.properties = { ...child.properties, className: [...className, "md-points-list", `md-points-${kind}`] };
        items.forEach(markLeadStrong);
      }
    }
  }

  if (kind === "stack" && !result.some((child) => isElement(child, "dl") || isElement(child, "table"))) {
    result = result.map((child) => {
      const text = isElement(child, "p") ? textOf(child).trim() : "";
      const items = text.replace(/\.$/, "").split(/,\s*(?![^()]*\))/).map((item) => item.trim()).filter(Boolean);
      return items.length >= 4 ? el("div", "md-chips", items.map((item) => el("span", "md-chip", [txt(item)]))) : child;
    });
  }

  if (kind === "summary") {
    const lead = result.find((child) => isElement(child, "p"));
    if (lead) lead.properties = { ...lead.properties, className: ["md-lead"] };
  }
  return result;
}

export function rehypeCaseFormat() {
  return (tree: HastNode) => {
    const out: HastNode[] = [];
    let section: HastNode | null = null;
    let kind: SectionKind = "default";
    const close = () => { if (section) section.children = transformSection(section.children!, kind); };
    for (const child of tree.children ?? []) {
      if (isElement(child, "h2")) {
        close();
        kind = kindOf(textOf(child));
        section = el("section", ["md-section", `md-kind-${kind}`], [child]);
        out.push(section);
      } else if (section) {
        section.children!.push(child);
      } else {
        out.push(child);
      }
    }
    close();
    tree.children = out;
  };
}
