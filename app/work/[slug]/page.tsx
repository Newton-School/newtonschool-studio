import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyThemeToggle } from "@/components/case-study-theme-toggle";
import { MarkdownContent } from "@/components/markdown-content";
import { BackToTop } from "@/components/back-to-top";
import { CaseReadingProgress } from "@/components/case-reading-progress";
import { PixelIcon, caseEmblems } from "@/components/pixel-icon";
import { PixelPod } from "@/components/pixel-pod";
import { ScrollToTop } from "@/components/scroll-to-top";
import { bookingUrl, iitrTestimonial } from "@/content/site";
import { coverStyle } from "@/lib/case-cover";
import { getAllCaseStudies, getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
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
  const allStudies = getAllCaseStudies();
  const position = allStudies.findIndex((item) => item.slug === study.slug);
  const next = allStudies.length > 1 ? allStudies[(position + 1) % allStudies.length] : null;
  const bookingHref = bookingUrl || "mailto:newtonschool-studio@newtonschool.co?subject=Scoping%20call%20request";

  return <>
    <ScrollToTop />
    <header className="case-nav"><div className="container"><Link className="logo" href="/" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority/></span><span>NewtonSchool <b>Studio</b></span></Link><div><Link className="case-back" href="/#work"><PixelIcon name="arrow-left" />All work</Link><CaseStudyThemeToggle/><Link className="button primary case-book" href="/#booking"><span className="case-book-full">Book a scoping call</span><span className="case-book-short">Book a call</span></Link></div></div><CaseReadingProgress/></header>
    <main className="case-page">
      <section className="case-hero" style={coverStyle(study.slug)}><div className="container case-hero-layout"><div className="case-hero-copy"><Link className="case-top-link" href="/#work"><PixelIcon name="arrow-left" />Back to work</Link><div className="case-emblem-row"><PixelIcon name={caseEmblems[study.slug] ?? "window"} scale={3} className="case-emblem" /><span className="eyebrow">CASE STUDY · {study.industry}</span></div>{study.partner && <span className="case-partner">{study.partner}</span>}<h1>{study.name}</h1><p>{study.problem}</p><div className="case-hero-meta"><span className="case-reading-time">{readingTime} min read</span><div className="case-hero-tags">{study.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div><div className={`case-hero-image ${study.imageFit === "contain" ? "contain" : ""}`}><Image src={study.image} alt={study.imageAlt} fill priority sizes="(max-width: 1020px) calc(100vw - 40px), 46vw"/></div></div></section>
      <section className="case-metric-strip"><div className="container">{study.metrics.map((metric) => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div></section>
      <section className="case-summary"><div className="container"><div><span><PixelIcon name="blocks" />WHAT WE BUILT</span><p>{study.build}</p></div><div><span><PixelIcon name="flag" />KEY RESULT</span><p>{study.result}</p></div></div></section>
      {study.slug === "iitr-collaboration" && <section className="case-testimonial"><div className="container"><PixelIcon name="quote" scale={4} className="case-quote-mark" /><span>FROM THE RESEARCH PARTNER</span><blockquote>“{iitrTestimonial.quote}”</blockquote><footer><div><strong>{iitrTestimonial.name}</strong><small>{iitrTestimonial.role}</small></div><a href={iitrTestimonial.source} target="_blank" rel="noreferrer">Read the published story ↗</a></footer></div></section>}
      <div className="case-reading-layout container"><TableOfContents headings={headings}/><div className="case-reading-column"><TableOfContents headings={headings} mobile/><article className="case-article"><MarkdownContent content={study.content}/></article></div></div>
      {next && <section className="case-next"><div className="container"><Link className="case-next-card" href={`/work/${next.slug}`}><div className="case-next-copy"><span>NEXT CASE STUDY · {next.industry}</span><strong>{next.name}</strong><p>{next.problem}</p><em>Read the case study →</em></div><div className={`case-next-image ${next.imageFit === "contain" ? "contain" : ""}`}><Image src={next.image} alt={next.imageAlt} fill sizes="(max-width: 760px) calc(100vw - 32px), 40vw"/></div></Link></div></section>}
      <section className="case-model-strip"><div className="container"><div className="case-model-label"><PixelPod compact /><span>THE DELIVERY MODEL</span></div><p>Full-time student engineers work inside a focused pod under a named technical owner. Architecture, quality and release acceptance stay accountable through handover.</p><Link href="/ecosystem">See how the Studio model works →</Link></div></section>
      <section className="case-cta"><div className="container"><PixelIcon name="scene-launch" scale={4} className="case-cta-scene" /><span className="eyebrow">HAVE A SIMILAR PROBLEM?</span><h2>Tell us what you’re building.</h2><p>Use a 20-minute scoping call to identify the smallest useful first release.</p><a className="button primary large" href={bookingHref}>Book a 20-minute scoping call</a></div></section>
    </main>
    <BackToTop />
    <footer className="case-footer"><div className="container"><span>NewtonSchool Studio</span><span>A Newton School of Technology initiative</span></div></footer>
  </>;
}
