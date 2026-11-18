import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyThemeToggle } from "@/components/case-study-theme-toggle";
import { MarkdownContent } from "@/components/markdown-content";
import { ScrollToTop } from "@/components/scroll-to-top";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.name} case study | NewtonSchool Studio`,
    description: study.problem,
    openGraph: {
      title: `${study.name} case study | NewtonSchool Studio`,
      description: study.problem,
      url: `/work/${study.slug}`,
      siteName: "NewtonSchool Studio",
      type: "article",
      images: [{ url: study.image, alt: study.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} case study | NewtonSchool Studio`,
      description: study.problem,
      images: [study.image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return <>
    <ScrollToTop />
    <header className="case-nav"><div className="container"><Link className="logo" href="/" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority/></span><span>NewtonSchool <b>Studio</b></span></Link><div><Link className="case-back" href="/#work">← All work</Link><CaseStudyThemeToggle/><Link className="button primary case-book" href="/#booking"><span className="case-book-full">Book a scoping call</span><span className="case-book-short">Book a call</span></Link></div></div></header>
    <main className="case-page">
      <section className="case-hero"><div className="container case-hero-layout"><div className="case-hero-copy"><span className="eyebrow">CASE STUDY · {study.industry}</span>{study.partner && <span className="case-partner">{study.partner}</span>}<h1>{study.name}</h1><p>{study.problem}</p><div className="case-hero-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className={`case-hero-image ${study.imageFit === "contain" ? "contain" : ""}`}><Image src={study.image} alt={study.imageAlt} fill priority sizes="(max-width: 1020px) calc(100vw - 40px), 46vw"/></div></div></section>
      <section className="case-metric-strip"><div className="container">{study.metrics.map((metric) => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></section>
      <section className="case-summary"><div className="container"><div><span>WHAT WE BUILT</span><p>{study.build}</p></div><div><span>KEY RESULT</span><p>{study.result}</p></div></div></section>
      <article className="case-article container"><MarkdownContent content={study.content}/></article>
      <section className="case-cta"><div className="container"><span className="eyebrow">HAVE A SIMILAR PROBLEM?</span><h2>Tell us what you’re building.</h2><p>Use a 20-minute scoping call to identify the smallest useful first release.</p><Link className="button primary large" href="/#booking">Book a 20-minute scoping call</Link></div></section>
    </main>
    <footer className="case-footer"><div className="container"><span>NewtonSchool Studio</span><span>A Newton School of Technology initiative</span></div></footer>
  </>;
}
