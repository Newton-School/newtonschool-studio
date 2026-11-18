export type CaseStudySummary = {
  slug: string;
  name: string;
  industry: string;
  problem: string;
  build: string;
  tags: string[];
  result: string;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  logo: string;
  logoAlt: string;
  metrics: { value: string; label: string }[];
  partner?: string;
  order: number;
};

export type CaseStudy = CaseStudySummary & {
  content: string;
};
