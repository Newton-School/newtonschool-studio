"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudySummary } from "@/content/case-study-types";
import {
  aiComparison,
  bookingUrl,
  deliveryForces,
  deliveryGates,
  faqs,
  idealCustomers,
  packages,
  problemStates,
  stack,
  stackHighlights,
} from "@/content/site";

const Cal = dynamic(() => import("@calcom/embed-react"), {
  ssr: false,
  loading: () => <div className="booking-embed-loading">Loading available times…</div>,
});

const bookingEmailUrl = "mailto:newtonschool-studio@newtonschool.co?subject=Scoping%20call%20request";

const Arrow = () => <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 10h11M11 6l4 4-4 4" /></svg>;
const CalendarIcon = () => <svg aria-hidden="true" viewBox="0 0 20 20"><rect x="3" y="4.5" width="14" height="12" rx="2"/><path d="M6.5 2.5v4M13.5 2.5v4M3 8h14"/></svg>;

function Logo() {
  return <a className="logo" href="#top" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority/></span><span>NewtonSchool <b>Studio</b></span></a>;
}

function Icon({ name }: { name: string }) {
  const common = { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.5 };
  if (name === "window") return <svg {...common} aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18M7 6h.01"/></svg>;
  if (name === "workflow") return <svg {...common} aria-hidden="true"><rect x="3" y="4" width="7" height="6" rx="1"/><rect x="14" y="14" width="7" height="6" rx="1"/><path d="M10 7h3a4 4 0 0 1 4 4v3"/></svg>;
  if (name === "spark") return <svg {...common} aria-hidden="true"><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m18 3 .5 1.5L20 5l-1.5.5L18 7l-.5-1.5L16 5l1.5-.5L18 3Z"/></svg>;
  if (name === "rescue") return <svg {...common} aria-hidden="true"><path d="M4 7h10a5 5 0 0 1 0 10H9"/><path d="m8 3-4 4 4 4M9 14l-3 3 3 3"/></svg>;
  if (name === "integration") return <svg {...common} aria-hidden="true"><rect x="3" y="4" width="6" height="6" rx="1"/><rect x="15" y="14" width="6" height="6" rx="1"/><path d="M9 7h3a5 5 0 0 1 5 5v2M15 17h-3a5 5 0 0 1-5-5v-2"/></svg>;
  if (name === "research") return <svg {...common} aria-hidden="true"><path d="M9 3h6M10 3v5l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M7.5 14h9M9.5 11.5h5"/></svg>;
  if (name === "problem") return <svg {...common} aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4V2M20 12h2M12 20v2M4 12H2"/></svg>;
  return <svg {...common} aria-hidden="true"><path d="M7 18h11a4 4 0 0 0 .5-8A6.5 6.5 0 0 0 6 8.5 4.8 4.8 0 0 0 7 18Z"/><path d="M9 14h6M12 11v6"/></svg>;
}

function ThemeControls({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("newtonschool-studio-theme") as "light" | "dark" | null;
    const nextTheme = savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);
  const changeTheme = () => { const value = theme === "light" ? "dark" : "light"; setTheme(value); document.documentElement.dataset.theme = value; localStorage.setItem("newtonschool-studio-theme", value); };
  return <div className={`theme-controls ${compact ? "compact" : ""}`} aria-label="Appearance controls">
    <button className="theme-toggle" onClick={changeTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
      <svg aria-hidden="true" viewBox="0 0 20 20"><path d={theme === "light" ? "M10 2v2M10 16v2M2 10h2M16 10h2M4.3 4.3l1.4 1.4M14.3 14.3l1.4 1.4M15.7 4.3l-1.4 1.4M5.7 14.3l-1.4 1.4M14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" : "M17 12.5A7 7 0 0 1 7.5 3 7 7 0 1 0 17 12.5Z"}/></svg>
    </button>
  </div>;
}

function BookingScheduler() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const syncTheme = () => setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    const observer = new MutationObserver(syncTheme);
    syncTheme();
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!bookingUrl) {
    return <div className="booking-fallback">
      <span>BOOK A SCOPING CALL</span>
      <h3>Tell us what is getting in the way.</h3>
      <p>We reply within one working day with times for a 20-minute call.</p>
      <a className="button primary" href={bookingEmailUrl}>Email us to book a call <Arrow/></a>
    </div>;
  }

  const calLink = bookingUrl.replace(/^https?:\/\/(?:www\.)?cal\.com\//, "").replace(/\/$/, "");

  return <div className="booking-embed" aria-label="Book a 20-minute scoping call">
    <Cal
      key={theme}
      calLink={calLink}
      config={{ layout: "month_view", theme }}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
    />
  </div>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation">
    <Logo />
    <div className="nav-links"><a href="#work">Work</a><a href="#how">How we work</a><a href="#packages">Packages</a><a href="#faq">FAQ</a></div>
    <div className="nav-actions"><ThemeControls compact/><a className="button primary nav-cta" href="#booking">Book a scoping call</a><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span/><span/></button></div>
    {open && <div className="mobile-menu" id="mobile-menu"><a onClick={() => setOpen(false)} href="#work">Work</a><a onClick={() => setOpen(false)} href="#how">How we work</a><a onClick={() => setOpen(false)} href="#packages">Packages</a><a onClick={() => setOpen(false)} href="#faq">FAQ</a><ThemeControls /></div>}
  </nav></header>;
}

function DeliverySystemDiagram() {
  return <div className="delivery-map-frame"><svg className="delivery-map" viewBox="0 0 420 760" role="img" aria-labelledby="delivery-map-title delivery-map-description">
    <title id="delivery-map-title">NewtonSchool Studio delivery system</title>
    <desc id="delivery-map-description">Product requirements and existing systems move through architecture, application development, services, data, artificial intelligence, quality assurance and cloud delivery into production software.</desc>
    <defs><marker id="map-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 8 4 0 8Z"/></marker></defs>

    <rect className="map-region map-region-inputs" x="10" y="10" width="400" height="96" rx="3"/>
    <text className="map-region-label" x="24" y="31">PROJECT INPUTS</text>
    <g className="map-node map-node-input"><rect x="28" y="44" width="170" height="44" rx="2"/><text x="42" y="63">Product requirements</text><text className="map-node-detail" x="42" y="78">users · workflows · outcomes</text></g>
    <g className="map-node map-node-input"><rect x="222" y="44" width="170" height="44" rx="2"/><text x="236" y="63">Existing systems</text><text className="map-node-detail" x="236" y="78">data · stack · integrations</text></g>

    <rect className="map-region" x="54" y="128" width="312" height="550" rx="3"/>
    <text className="map-region-label" x="70" y="150">ENGINEERING SYSTEM</text>

    <path className="map-link" d="M113 88V116H210V166"/>
    <path className="map-link" d="M307 88V116H210"/>
    <path className="map-link" d="M210 210V242" markerEnd="url(#map-arrow)"/>
    <path className="map-link" d="M210 286V306H132V330" markerEnd="url(#map-arrow)"/>
    <path className="map-link" d="M210 306H288V330" markerEnd="url(#map-arrow)"/>
    <path className="map-link" d="M132 374V394H210V410"/>
    <path className="map-link" d="M288 374V394H210"/>
    <path className="map-link" d="M210 454V474H132V494" markerEnd="url(#map-arrow)"/>
    <path className="map-link" d="M210 474H288V494" markerEnd="url(#map-arrow)"/>
    <path className="map-link" d="M132 538V554H210V570"/>
    <path className="map-link" d="M288 538V554H210"/>
    <path className="map-link" d="M210 614V646" markerEnd="url(#map-arrow)"/>

    <g className="map-node"><rect x="125" y="166" width="170" height="44" rx="2"/><text x="141" y="185">Architecture</text><text className="map-node-detail" x="141" y="200">scope · interfaces · data</text></g>
    <g className="map-node map-node-primary"><rect x="125" y="242" width="170" height="44" rx="2"/><text x="141" y="261">Application layer</text><text className="map-node-detail" x="141" y="276">interfaces · workflows</text></g>
    <g className="map-node"><rect x="70" y="330" width="124" height="44" rx="2"/><text x="84" y="349">API services</text><text className="map-node-detail" x="84" y="364">auth · logic</text></g>
    <g className="map-node"><rect x="226" y="330" width="124" height="44" rx="2"/><text x="240" y="349">AI workflows</text><text className="map-node-detail" x="240" y="364">models · review</text></g>
    <g className="map-node"><rect x="125" y="410" width="170" height="44" rx="2"/><text x="141" y="429">System integration</text><text className="map-node-detail" x="141" y="444">APIs · events · automation</text></g>
    <g className="map-node"><rect x="70" y="494" width="124" height="44" rx="2"/><text x="84" y="513">Data layer</text><text className="map-node-detail" x="84" y="528">database · cache</text></g>
    <g className="map-node"><rect x="226" y="494" width="124" height="44" rx="2"/><text x="240" y="513">Quality assurance</text><text className="map-node-detail" x="240" y="528">tests · security</text></g>
    <g className="map-node map-node-deploy"><rect x="125" y="570" width="170" height="44" rx="2"/><text x="141" y="589">Cloud delivery</text><text className="map-node-detail" x="141" y="604">CI/CD · infrastructure</text></g>
    <g className="map-node"><rect x="125" y="646" width="170" height="44" rx="2"/><text x="141" y="665">Operations</text><text className="map-node-detail" x="141" y="680">observability · handover</text></g>

    <rect className="map-region map-region-output" x="10" y="712" width="400" height="38" rx="3"/>
    <path className="map-link" d="M210 690V704H78V722M210 704V722M210 704H342V722"/>
    <g className="map-output"><rect x="28" y="722" width="100" height="25" rx="2"/><text x="78" y="738">WEB PRODUCT</text></g>
    <g className="map-output"><rect x="160" y="722" width="100" height="25" rx="2"/><text x="210" y="738">INTERNAL TOOL</text></g>
    <g className="map-output"><rect x="292" y="722" width="100" height="25" rx="2"/><text x="342" y="738">AI FEATURE</text></g>
  </svg></div>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <article className={`card ${className}`}>{children}</article>; }
function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  return <Link className="case-card-link" href={`/work/${item.slug}`} aria-label={`View ${item.name} case study`}><Card className="case-card"><div className={`case-card-image ${item.imageFit === "contain" ? "contain" : ""}`}><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) calc(100vw - 32px), (max-width: 1200px) 50vw, 580px"/></div><div className="case-content"><div className="case-head"><span>{item.industry}</span><span className={`client-logo ${item.slug}`}><Image src={item.logo} alt={item.logoAlt} fill sizes="150px"/></span></div><h3>{item.name}</h3><p className="problem">{item.problem}</p><p>{item.build}</p><div className="case-metrics">{item.metrics.map(metric => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="result"><span>KEY RESULT</span><strong>{item.result}</strong></div><span className="case-link">View case study <Arrow/></span></div></Card></Link>;
}

export function PackageCard({ item }: { item: typeof packages[number] }) {
  return <Card className={`package-card ${"featured" in item && item.featured ? "featured" : ""}`}>
    {"featured" in item && item.featured && <span className="featured-label">WHERE MOST CLIENTS START</span>}
    <div className="package-top"><h3>{item.title}</h3><span>{item.time}</span></div>
    <div className="package-field"><span>USE WHEN</span><p>{item.useWhen}</p></div>
    <div className="package-field"><span>WHAT YOU GET</span><ul>{item.deliverables.map(deliverable => <li key={deliverable}>{deliverable}</li>)}</ul></div>
    <div className="package-field"><span>SUCCESS LOOKS LIKE</span><p>{item.success}</p></div>
    <div className="package-field compact"><span>WE NEED</span><p>{item.clientNeeds}</p></div>
    <strong className="price">{item.price}</strong>
    <a className={`button ${"featured" in item && item.featured ? "primary" : "secondary"}`} href="#booking">Discuss this package <Arrow/></a>
  </Card>;
}

export function FAQItem({ item, open, onClick }: { item: typeof faqs[number]; open: boolean; onClick: () => void }) {
  return <div className={`faq-item ${open ? "open" : ""}`}><h3><button onClick={onClick} aria-expanded={open}><span>{item.q}</span><i aria-hidden="true"/></button></h3><div className="faq-answer" aria-hidden={!open}><p>{item.a}</p></div></div>;
}

export function StudioPage({ caseStudies }: { caseStudies: CaseStudySummary[] }) {
  const [faqOpen, setFaqOpen] = useState(0);
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    items.forEach(item => observer.observe(item)); return () => observer.disconnect();
  }, []);
  return <>
    <Navigation />
    <main id="top">
      <section className="hero">
        <div className="hero-grid"/>
        <div className="container hero-layout">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow"><i/>Problem-to-production engineering</span>
            <h1>From a hard problem to <em>software in production.</em></h1>
            <p>NewtonSchool Studio takes important product and operational problems through architecture, build, verification, deployment and handover.</p>
            <div className="hero-actions">
              <a className="button primary large" href="#booking"><CalendarIcon/>Book a 20-minute scoping call</a>
              <a className="text-link" href="/newtonschool-studio-one-pager.pdf" download>Download the one-pager <Arrow/></a>
            </div>
          </div>
          <div data-reveal><DeliverySystemDiagram/></div>
        </div>
      </section>

      <section className="section alt fit-section" id="fit"><div className="container" data-reveal>
        <SectionHeading eyebrow="01 · BEST FIT" title="For teams with a real problem and a production deadline." text="The strongest fit is a validated need, one person who owns the outcome, and access to the users, systems and decisions needed to ship."/>
        <div className="customer-grid">{idealCustomers.map(item => <Card className="customer-card" key={item.title}><span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p><ul>{item.signals.map(signal => <li key={signal}>{signal}</li>)}</ul></Card>)}</div>
      </div></section>

      <section className="section" id="services"><div className="container" data-reveal>
        <SectionHeading eyebrow="02 · PROBLEMS" title="Bring us the problem that is not getting over the line." text="We work from the obstacle and the outcome, then assemble the product and engineering work needed to solve it."/>
        <div className="service-grid">{problemStates.map((item, index) => <Card className="service-card" key={item.title}><div className="service-icon"><Icon name={item.icon}/></div><span className="card-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div>
      </div></section>

      <section className="section alt ai-section"><div className="container" data-reveal>
        <SectionHeading eyebrow="03 · AI AND DELIVERY" title="AI increases output. We turn it into a production outcome." text="The gap is no longer access to generated code. It is deciding what matters, coordinating the system and proving that it works in the real environment."/>
        <div className="comparison-grid">
          <div className="comparison-head"><span>AI CAN</span><span>THE STUDIO OWNS</span></div>
          {aiComparison.map(([ai, studio], index) => <div className="comparison-row" key={ai}><i>0{index + 1}</i><p>{ai}</p><Arrow/><strong>{studio}</strong></div>)}
        </div>
      </div></section>

      <section className="section proof-section" id="work"><div className="container" data-reveal>
        <SectionHeading eyebrow="04 · DELIVERY EVIDENCE" title="Work you can inspect" text="Each case study opens the problem, constraints, system decisions and available delivery evidence."/>
        <div className="case-grid">{caseStudies.map(item => <CaseStudyCard item={item} key={item.name}/>)}</div>
      </div></section>

      <section className="section alt" id="how"><div className="container" data-reveal>
        <SectionHeading eyebrow="05 · DELIVERY SYSTEM" title="One team owns the path from ambiguity to operation." text="The pod combines judgment, parallel execution and AI-accelerated capacity. Five evidence gates keep speed connected to the outcome."/>
        <div className="force-grid">{deliveryForces.map((item, index) => <Card className="force-card" key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div>
        <div className="model-statement"><span>DELIVERY ACCOUNTABILITY</span><p>Student engineers from Newton School of Technology work full-time inside focused engineering pods. Every engagement has a named technical owner responsible for architecture, technical risk, the quality standard and release acceptance through handover.</p></div>
        <div className="gate-heading"><span>FIVE EVIDENCE GATES</span><p>Progress is marked by evidence, not task count.</p></div>
        <div className="process gate-process"><div className="process-line"/>{deliveryGates.map((gate, index) => <div className="process-step" key={gate.title}><span>{index + 1}</span><h3>{gate.title}</h3><p>{gate.body}</p></div>)}</div>
      </div></section>

      <section className="section" id="packages"><div className="container" data-reveal>
        <SectionHeading eyebrow="06 · ENGAGEMENTS" title="Choose the next proof point." text="Each engagement is shaped around a decision or production outcome, with the evidence expected at the end made explicit."/>
        <div className="package-grid">{packages.map(item => <PackageCard item={item} key={item.title}/>)}</div>
        <div className="pricing-note"><p>Pricing is fixed against scope and expected evidence. Technical leadership is concentrated on high-risk decisions while the pod moves research, implementation and verification in parallel. If your budget is tighter, we reduce scope or phase delivery.</p><div className="addons"><span>CAPABILITIES</span>{["UX/UI design", "Security and compliance", "Data and analytics", "Migration and modernisation"].map(item => <i key={item}>{item}</i>)}</div></div>
      </div></section>

      <section className="section stack-section alt" id="stack"><div className="container" data-reveal>
        <SectionHeading eyebrow="07 · ENGINEERING APPROACH" title="We choose the system around the problem." text="Architecture follows the outcome, operational constraints and systems already in place. These are representative areas of work, connected to delivered examples."/>
        <div className="stack-highlights">{stackHighlights.map(item => <Card className="stack-highlight" key={item.group}><span>{item.group}</span><p>{item.body}</p><div className="tags">{item.items.map(technology => <i key={technology}>{technology}</i>)}</div><Link href={`/work/${item.proof.slug}`}>{item.proof.label} <Arrow/></Link></Card>)}</div>
        <details className="stack-details"><summary>View full technology coverage <span>PRODUCT · PLATFORM · DATA · AI</span></summary><div className="stack-grid">{Object.entries(stack).map(([group, items]) => <div className="stack-group" key={group}><h3>{group}</h3><div>{items.map(item => <span key={item}><i>{item.slice(0,2).toUpperCase()}</i>{item}</span>)}</div></div>)}</div></details>
      </div></section>

      <section className="section alt" id="faq"><div className="container faq-layout" data-reveal>
        <SectionHeading eyebrow="08 · FAQ" title="Questions we expect" text="Straight answers before you spend time on a call."/>
        <div className="faq-list">{faqs.map((item, index) => <FAQItem key={item.q} item={item} open={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}/>)}</div>
      </div></section>

      <section className="section booking" id="booking"><div className="container booking-panel" data-reveal>
        <div className="booking-copy"><span className="eyebrow">09 · START HERE</span><h2>Bring us the problem that is not getting over the line.</h2><p>A 20-minute call to identify the obstacle, the next useful proof point and whether we are the right team to own it.</p><div className="call-points"><div><span>01</span><p>Describe the outcome, users and current obstacle.</p></div><div><span>02</span><p>We separate the knowns, risks and decisions.</p></div><div><span>03</span><p>You leave with a recommended next step.</p></div></div></div>
        <BookingScheduler />
      </div></section>
    </main>
    <footer><div className="container footer-grid"><div><Logo/><p>From a hard problem to software in production.</p></div><div><span>START</span><a href="#booking">Book a scoping call</a><a href="/newtonschool-studio-one-pager.pdf" download>Download the one-pager</a></div><div><span>INITIATIVE</span><p>A Newton School of Technology initiative</p><small>© 2026 NewtonSchool Studio</small></div></div></footer>
    <div className="mobile-book"><a className="button primary" href="#booking"><CalendarIcon/>Book a 20-minute scoping call</a></div>
  </>;
}
