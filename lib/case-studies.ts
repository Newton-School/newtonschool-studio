import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { CaseStudy, CaseStudySummary } from "@/content/case-study-types";

const caseStudyDirectory = path.join(process.cwd(), "content", "case-studies");

function markdownFiles() {
  return fs
    .readdirSync(caseStudyDirectory)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_") && file !== "README.md");
}

function readCaseStudy(file: string): CaseStudy {
  const slug = file.replace(/\.md$/, "");
  const source = fs.readFileSync(path.join(caseStudyDirectory, file), "utf8");
  const { data, content } = matter(source);

  const required = ["name", "industry", "problem", "build", "result", "image", "imageAlt", "logo", "logoAlt"] as const;
  for (const field of required) {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      throw new Error(`Case study ${file} is missing required front matter field: ${field}`);
    }
  }

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string")) {
    throw new Error(`Case study ${file} must define tags as a string array`);
  }

  if (!Array.isArray(data.metrics) || data.metrics.some((metric) =>
    typeof metric !== "object" || metric === null ||
    typeof metric.value !== "string" || !metric.value.trim() ||
    typeof metric.label !== "string" || !metric.label.trim()
  )) {
    throw new Error(`Case study ${file} must define metrics with value and label strings`);
  }

  if (data.imageFit !== undefined && data.imageFit !== "cover" && data.imageFit !== "contain") {
    throw new Error(`Case study ${file} imageFit must be cover or contain`);
  }

  if (data.partner !== undefined && (typeof data.partner !== "string" || !data.partner.trim())) {
    throw new Error(`Case study ${file} partner must be a non-empty string`);
  }

  return {
    slug,
    name: data.name,
    industry: data.industry,
    problem: data.problem,
    build: data.build,
    tags: data.tags,
    result: data.result,
    image: data.image,
    imageAlt: data.imageAlt,
    imageFit: data.imageFit,
    logo: data.logo,
    logoAlt: data.logoAlt,
    metrics: data.metrics,
    partner: data.partner,
    order: typeof data.order === "number" ? data.order : 999,
    content,
  };
}

export function getAllCaseStudies(): CaseStudySummary[] {
  return markdownFiles()
    .map(readCaseStudy)
    .sort((a, b) => a.order - b.order)
    .map(({ content: _content, ...summary }) => summary);
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = markdownFiles().find((item) => item.replace(/\.md$/, "") === slug);
  return file ? readCaseStudy(file) : null;
}

export function getCaseStudySlugs() {
  return markdownFiles().map((file) => file.replace(/\.md$/, ""));
}
