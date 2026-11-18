import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyThemeToggle } from "@/components/case-study-theme-toggle";
import { MarkdownContent } from "@/components/markdown-content";
import { ScrollToTop } from "@/components/scroll-to-top";
import { bookingUrl } from "@/content/site";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { estimateReadingTime, getH2Headings, type MarkdownHeading } from "@/lib/markdown-headings";

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
    alternates: { canonical: `/work/${study.slug}` },
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

function TableOfContents({ headings, mobile = false }: { headings: MarkdownHeading[]; mobile?: boolean }) {
  const links = <ol>{headings.map((heading) => <li key={heading.id}><a href={`#${heading.id}`}>{heading.label}</a></li>)}</ol>;
  if (mobile) return <details className="case-toc-mobile"><summary>On this page</summary>{links}</details>;
  return <aside className="case-toc-desktop"><span>On this page</span>{links}</aside>;
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const headings = getH2Headings(study.content);
  const readingTime = estimateReadingTime(study.content);
  const bookingHref = bookingUrl || "mailto:newtonschool-studio@newtonschool.co?subject=Scoping%20call%20request";

  return <>
    <ScrollToTop />
    <header className="case-nav"><div className="container"><Link className="logo" href="/" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority/></span><span>NewtonSchool <b>Studio</b></span></Link><div><Link className="case-back" href="/#work">← All work</Link><CaseStudyThemeToggle/><Link className="button primary case-book" href="/#booking"><span className="case-book-full">Book a scoping call</span><span className="case-book-short">Book a call</span></Link></div></div></header>
    <main className="case-page">
      <section className="case-hero"><div className="container case-hero-layout"><div className="case-hero-copy"><Link className="case-top-link" href="/#work">← Back to work</Link><span className="eyebrow">CASE STUDY · {study.industry}</span>{study.partner && <span className="case-partner">{study.partner}</span>}<h1>{study.name}</h1><span className="case-reading-time">{readingTime} min read</span><p>{study.problem}</p><div className="case-hero-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><div className={`case-hero-image ${study.imageFit === "contain" ? "contain" : ""}`}><Image src={study.image} alt={study.imageAlt} fill priority sizes="(max-width: 1020px) calc(100vw - 40px), 46vw"/></div></div></section>
      <section className="case-metric-strip"><div className="container">{study.metrics.map((metric) => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></section>
      <section className="case-summary"><div className="container"><div><span>WHAT WE BUILT</span><p>{study.build}</p></div><div><span>KEY RESULT</span><p>{study.result}</p></div></div></section>
      <div className="case-reading-layout container"><TableOfContents headings={headings}/><div className="case-reading-column"><TableOfContents headings={headings} mobile/><article className="case-article"><MarkdownContent content={study.content}/></article></div></div>
      <section className="case-cta"><div className="container"><span className="eyebrow">HAVE A SIMILAR PROBLEM?</span><h2>Tell us what you’re building.</h2><p>Use a 20-minute scoping call to identify the smallest useful first release.</p><a className="button primary large" href={bookingHref}>Book a 20-minute scoping call</a></div></section>
    </main>
    <footer className="case-footer"><div className="container"><span>NewtonSchool Studio</span><span>A Newton School of Technology initiative</span></div></footer>
  </>;
}
