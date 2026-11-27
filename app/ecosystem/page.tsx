import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyThemeToggle } from "@/components/case-study-theme-toggle";
import { PixelPod } from "@/components/pixel-pod";
import { ecosystemPrinciples, ecosystemProof, iitrTestimonial, studentProjects } from "@/content/site";

export const metadata: Metadata = {
  title: "Engineering ecosystem | NewtonSchool Studio",
  description: "How NewtonSchool Studio combines full-time student engineers, named technical ownership, release evidence and clean handover into one delivery system.",
  alternates: { canonical: "/ecosystem" },
  openGraph: {
    title: "Engineering ecosystem | NewtonSchool Studio",
    description: "A focused engineering pod under one named technical owner, built to deliver dependable software and transfer ownership cleanly.",
    url: "/ecosystem",
    siteName: "NewtonSchool Studio",
    type: "website",
    images: [{ url: "/og-pixel.png", width: 1200, height: 630, alt: "NewtonSchool Studio engineering ecosystem" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering ecosystem | NewtonSchool Studio",
    description: "A focused engineering pod under one named technical owner, built to deliver dependable software and transfer ownership cleanly.",
    images: ["/og-pixel.png"],
  },
};

const caseProof = [
  {
    name: "RishiVerse",
    type: "University operations",
    href: "/work/rishiverse",
    image: "/work/rishiverse/cover.jpg",
    alt: "RishiVerse university operations dashboard",
    statement: "25+ modules brought attendance, fees, hostel, gate passes, academics and helpdesk into one operating system.",
    metrics: ["80% less manual administrative work", "99.8% uptime over six months", "API response below 200ms at p95"],
  },
  {
    name: "Zuvees",
    type: "Commerce operations",
    href: "/work/zuvees",
    image: "/work/zuvees/cover.jpg",
    alt: "Zuvees commerce and inventory product",
    statement: "One shared inventory now supports five sales channels and the operational promise of delivery within 60 minutes.",
    metrics: ["5 sales channels", "1 central inventory", "60-minute delivery promise"],
  },
  {
    name: "IIT Roorkee",
    type: "Applied technology research",
    href: "/work/iitr-collaboration",
    image: "/work/iitr-collaboration/cover.jpg",
    alt: "IIT Roorkee welfare scheme discovery platform",
    statement: "A six-stage data pipeline standardised welfare scheme information across 13 states and was handed over to the partner team.",
    metrics: ["13 states standardised", "6-stage data pipeline", "System handed over"],
  },
  {
    name: "FieldVue",
    type: "AI field workflow",
    href: "/work/maverick-fieldvue",
    image: "/work/maverick-fieldvue/cover-phone.jpg",
    alt: "FieldVue mobile field estimation workflow",
    statement: "The mobile workflow analyses ten site photos in six to seven seconds and produces version-locked quotes for field teams.",
    metrics: ["6 to 7 seconds for 10 photos", "Version-locked sent quotes", "1 app for iOS and Android"],
  },
] as const;

function Arrow() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4" /></svg>;
}

export default function EcosystemPage() {
  return <>
    <header className="case-nav ecosystem-nav"><div className="container"><Link className="logo" href="/" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority /></span><span>NewtonSchool <b>Studio</b></span></Link><div><Link className="case-back" href="/#work">Work</Link><CaseStudyThemeToggle /><Link className="button primary case-book" href="/#booking">Discuss a project</Link></div></div></header>
    <main className="ecosystem-page">
      <section className="ecosystem-page-hero">
        <div className="ecosystem-page-grid" aria-hidden="true" />
        <div className="container ecosystem-page-hero-layout">
          <div><span className="eyebrow"><i />NEWTON SCHOOL OF TECHNOLOGY × STUDIO DELIVERY</span><h1>One accountable engineering team, backed by a living builder ecosystem.</h1><p>Full-time student engineers work inside a focused pod under a named technical owner. The Studio owns architecture, technical risk, quality and release acceptance through handover.</p><div className="ecosystem-page-actions"><Link className="button primary large" href="/#booking">Discuss your project</Link><Link className="text-link" href="/#work">Inspect the work <Arrow /></Link></div></div>
          <div className="ecosystem-orbit" aria-label="The Studio delivery model"><div className="ecosystem-orbit-head"><span>STUDIO / DELIVERY CONTROL</span><b><i />Accountability online</b></div><div className="ecosystem-orbit-body"><div className="orbit-ring orbit-ring-one" /><div className="orbit-ring orbit-ring-two" /><div className="orbit-core"><span>PRODUCTION</span><strong>One named owner</strong><small>Architecture · quality · release</small></div>{ecosystemPrinciples.map((item, index) => <div className={`orbit-node orbit-node-${index + 1}`} key={item.number}><span>{item.number}</span><strong>{item.title}</strong></div>)}</div><div className="ecosystem-orbit-foot"><span>FRAME → BUILD → PROVE → TRANSFER</span><strong>Ownership stays visible</strong></div></div>
        </div>
      </section>

      <section className="ecosystem-page-model"><div className="container"><div className="ecosystem-page-heading"><span>THE OPERATING MODEL</span><h2>Capacity matters. Accountability decides whether it ships.</h2><p>The pod is designed to move connected work in parallel while keeping technical decisions and acceptance in one clear line of ownership.</p></div><div className="ecosystem-page-pod"><PixelPod /></div><div className="ecosystem-model-grid">{ecosystemPrinciples.map(item => <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>

      <section className="ecosystem-page-students"><div className="container">
        <div className="student-stage"><div className="student-stage-image"><Image src="/nst-ecosystem/engineering-culture.avif" alt="NST students coding, presenting, building hardware and working in teams" fill sizes="(max-width: 900px) calc(100vw - 32px), 58vw" /></div><div className="student-stage-copy"><span>THE WIDER NST BUILDER ECOSYSTEM</span><h2>They do not wait for easy problems.</h2><p>Students build software, AI products and physical systems early. That habit of learning through difficult, working systems is part of the environment around the Studio.</p><small>Student work is shown as ecosystem context. Studio client delivery evidence appears separately below.</small></div></div>
        <div className="student-project-grid">{studentProjects.map(project => <article key={project.number}><div><Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) calc(100vw - 32px), 33vw" /></div><span>{project.number} · {project.label}</span><h3>{project.title}</h3><p>{project.body}</p></article>)}</div>
        <a className="student-stories-link" href="https://www.newtonschool.co/newton-school-of-technology-nst/student-stories" target="_blank" rel="noreferrer">See more published student work <Arrow /></a>
        <div className="institution-collaboration"><div className="institution-collaboration-visual"><Image src="/nst-ecosystem/iit-roorkee.avif" alt="IIT Roorkee main building" fill sizes="(max-width: 900px) calc(100vw - 32px), 50vw" /><div><Image src="/nst-ecosystem/nst-iitr-collaboration.avif" alt="Newton School of Technology and IIT Roorkee collaboration" fill sizes="260px" /></div></div><div className="institution-collaboration-copy"><span>INSTITUTIONAL COLLABORATION</span><h2>A public-interest platform with IIT Roorkee.</h2><p>Six engineers led by a NewtonSchool Studio technical owner built the Community Empowerment Portal with IIT Roorkee and the Social Studies Foundation. It structures government schemes across 13 states and helps citizens identify support they may qualify for.</p><figure className="institution-quote"><blockquote>“{iitrTestimonial.quote}”</blockquote><figcaption><div><strong>{iitrTestimonial.name}</strong><span>{iitrTestimonial.role}</span></div><a href={iitrTestimonial.source} target="_blank" rel="noreferrer">Published by India Today ↗</a></figcaption></figure><div className="institution-stats"><div><strong>260M+</strong><small>stated potential audience</small></div><div><strong>13</strong><small>states standardised</small></div><div><strong>6</strong><small>engineers in the delivery team</small></div></div><Link className="student-stories-link" href="/work/iitr-collaboration">Read the complete collaboration case study <Arrow /></Link></div></div>
      </div></section>

      <section className="ecosystem-page-proof"><div className="container"><div className="ecosystem-page-heading"><span>DELIVERY EVIDENCE</span><h2>Proof from systems already in the real world.</h2><p>These outcomes come from the four published Studio case studies. Open any project to inspect the problem, system decisions and available evidence.</p></div><div className="ecosystem-proof-rail">{ecosystemProof.map(item => <Link href={item.href} key={item.project}><span>{item.project}</span><strong>{item.value}</strong><p>{item.label}</p></Link>)}</div><div className="ecosystem-case-grid">{caseProof.map((item, index) => <Link href={item.href} className="ecosystem-case" key={item.name}><div className="ecosystem-case-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) calc(100vw - 32px), 50vw" /></div><div className="ecosystem-case-copy"><span>0{index + 1} · {item.type}</span><h3>{item.name}</h3><p>{item.statement}</p><ul>{item.metrics.map(metric => <li key={metric}>{metric}</li>)}</ul><b>Read the full case study <Arrow /></b></div></Link>)}</div></div></section>

      <section className="ecosystem-page-cta"><div className="container"><span>START WITH THE HARD PART</span><h2>Bring the outcome, the obstacle and the deadline.</h2><p>Use a 20-minute scoping call to identify the smallest useful first release and the evidence it must produce.</p><Link className="button primary large" href="/#booking">Book a 20-minute scoping call</Link></div></section>
    </main>
    <footer className="case-footer"><div className="container"><span>NewtonSchool Studio</span><Link href="/">Back to the main site</Link></div></footer>
  </>;
}
