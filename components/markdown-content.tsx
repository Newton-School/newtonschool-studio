import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import { PixelIcon, type PixelIconName } from "@/components/pixel-icon";
import { slugifyHeading } from "@/lib/markdown-headings";
import { rehypeCaseFormat } from "@/lib/rehype-case-format";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children);
  return "";
}

const factIcons: Record<string, PixelIconName> = {
  client: "building",
  partners: "building",
  partner: "building",
  "what we built": "blocks",
  "what we did": "blocks",
  shape: "blocks",
  scale: "blocks",
  team: "people",
  duration: "hourglass",
  delivery: "hourglass",
  engagement: "hourglass",
  outcome: "flag",
  principle: "spark",
};

function calloutFacts(paragraph: ReactNode) {
  if (!isValidElement<{ children?: ReactNode }>(paragraph) || paragraph.type !== "p") return null;
  const facts: { label: string; value: ReactNode[] }[] = [];
  for (const part of Children.toArray(paragraph.props.children)) {
    if (isValidElement<{ children?: ReactNode }>(part) && part.type === "b") {
      const label = textFromNode(part.props.children).trim();
      if (!label.endsWith(":")) return null;
      facts.push({ label: label.slice(0, -1), value: [] });
    } else if (facts.length) {
      facts[facts.length - 1].value.push(typeof part === "string" ? part.trim() : part);
    } else if (typeof part !== "string" || part.trim()) {
      return null;
    }
  }
  if (facts.length < 2) return null;
  return <dl className="callout-facts" key="callout-facts">{facts.map((fact) => <div key={fact.label}><dt>{factIcons[fact.label.toLowerCase()] && <PixelIcon name={factIcons[fact.label.toLowerCase()]} />}{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>;
}

const components: Components = {
  aside({ className, children, ...props }) {
    if (!className?.includes("callout")) return <aside className={className} {...props}>{children}</aside>;
    const items = Children.map(children, (child) => calloutFacts(child) ?? child);
    return <aside className={className} {...props}>{items}</aside>;
  },
  pre({ children }) {
    const child = Children.only(children);
    if (isValidElement(child)) {
      const props = (child as ReactElement<{ className?: string; children?: unknown }>).props;
      if (props.className?.includes("language-mermaid")) {
        return <MermaidDiagram chart={String(props.children ?? "").replace(/\n$/, "")} />;
      }
    }
    return <pre>{children}</pre>;
  },
  a({ href = "", children, ...props }) {
    const external = href.startsWith("http://") || href.startsWith("https://");
    return <a href={href} {...props} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>{children}</a>;
  },
  img({ alt = "", ...props }) {
    return <img alt={alt} loading="lazy" {...props} />;
  },
  table({ children, ...props }) {
    return <div className="table-scroll" role="region" aria-label="Scrollable table" tabIndex={0}><table {...props}>{children}</table></div>;
  },
  h2({ children }) {
    const id = slugifyHeading(textFromNode(children));
    return <h2 id={id}>{children}</h2>;
  },
};

export function MarkdownContent({ content }: { content: string }) {
  return <div className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeCaseFormat, rehypeHighlight]} components={components}>{content}</ReactMarkdown></div>;
}
