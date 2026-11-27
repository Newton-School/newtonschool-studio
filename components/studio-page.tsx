"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { PixelIcon, caseEmblems, isPixelIconName } from "@/components/pixel-icon";
import { PixelPod } from "@/components/pixel-pod";
import { BackToTop } from "@/components/back-to-top";
import { coverStyle } from "@/lib/case-cover";
import type { CaseStudySummary } from "@/content/case-study-types";
import {
  aiComparison,
  bookingUrl,
  ecosystemPrinciples,
  ecosystemProof,
  faqs,
  iitrTestimonial,
  idealCustomers,
  linkedInUrl,
  packages,
  problemStates,
  stackHighlights,
  studentProjects,
  trustItems,
} from "@/content/site";

const bookingEmailUrl = "mailto:newtonschool-studio@newtonschool.co?subject=Scoping%20call%20request";

type ProjectBrief = {
  name: string;
  email: string;
  company: string;
  outcome: string;
  blocker: string;
  timeline: string;
};

const emptyProjectBrief: ProjectBrief = {
  name: "",
  email: "",
  company: "",
  outcome: "",
  blocker: "",
  timeline: "",
};

const Arrow = () => <PixelIcon name="arrow" />;
const CalendarIcon = () => <PixelIcon name="calendar" />;

function Logo() {
  return <a className="logo" href="#top" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority/></span><span>NewtonSchool <b>Studio</b></span></a>;
}

function Icon({ name }: { name: string }) {
  return <PixelIcon name={isPixelIconName(name) ? name : "cloud"} />;
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
      <PixelIcon name={theme === "light" ? "sun" : "moon"} />
    </button>
  </div>;
}

const calLink = bookingUrl.replace(/^https?:\/\/(?:www\.)?cal\.com\//, "").replace(/\/$/, "");
const loadCal = () => import("@calcom/embed-react").then(mod => mod.getCalApi());

function bookingNotes(brief: ProjectBrief) {
  return [
    `Company: ${brief.company}`,
    `Desired outcome: ${brief.outcome}`,
    `Current blocker: ${brief.blocker || "Not provided"}`,
    `Timeline: ${brief.timeline}`,
  ].join("\n");
}

function hostedBookingUrl(brief: ProjectBrief) {
  const url = new URL(bookingUrl);
  url.searchParams.set("name", brief.name);
  url.searchParams.set("email", brief.email);
  url.searchParams.set("notes", bookingNotes(brief));
  return url.toString();
}

function BookingCard() {
  const [brief, setBrief] = useState<ProjectBrief>(emptyProjectBrief);
  const [opening, setOpening] = useState(false);

  const updateBrief = (field: keyof ProjectBrief, value: string) => setBrief(current => ({ ...current, [field]: value }));

  const openScheduler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOpening(true);
    const theme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    loadCal()
      .then(cal => {
        cal("modal", {
          calLink,
          config: {
            layout: "month_view",
            theme,
            name: brief.name,
            email: brief.email,
            notes: bookingNotes(brief),
          },
        });
      })
      .catch(() => window.open(hostedBookingUrl(brief), "_blank", "noopener,noreferrer"))
      .finally(() => setOpening(false));
  };

  if (!bookingUrl) {
    return <div className="booking-card">
      <span>BOOK A SCOPING CALL</span>
      <h3>Tell us what is getting in the way.</h3>
      <p>We reply within one working day with times for a 20-minute call.</p>
      <a className="button primary" href={bookingEmailUrl}>Email us to book a call <Arrow/></a>
    </div>;
  }
  return <form className="booking-card" onSubmit={openScheduler}>
    <div className="booking-steps" aria-label="Booking steps"><span><b>01</b> Project context</span><span><b>02</b> Choose a time</span></div>
    <h3>Start with the basics.</h3>
    <p>Share enough context for us to make the first conversation useful. You’ll choose a 20-minute time next.</p>
    <div className="brief-grid">
      <label><span>Your name</span><input required autoComplete="name" name="name" value={brief.name} onChange={event => updateBrief("name", event.target.value)} /></label>
      <label><span>Work email</span><input required autoComplete="email" type="email" name="email" value={brief.email} onChange={event => updateBrief("email", event.target.value)} /></label>
      <label><span>Company</span><input required autoComplete="organization" name="company" value={brief.company} onChange={event => updateBrief("company", event.target.value)} /></label>
      <label><span>Desired timeline</span><select required name="timeline" value={brief.timeline} onChange={event => updateBrief("timeline", event.target.value)}><option value="" disabled>Select one</option><option>As soon as possible</option><option>Within 1–2 months</option><option>Within 3–6 months</option><option>Exploring for later</option></select></label>
      <label className="brief-wide"><span>What outcome are you trying to reach?</span><textarea required rows={3} name="outcome" value={brief.outcome} onChange={event => updateBrief("outcome", event.target.value)} placeholder="What should be different when this work succeeds?" /></label>
      <label className="brief-wide"><span>What is currently blocking it? <i>Optional</i></span><textarea rows={2} name="blocker" value={brief.blocker} onChange={event => updateBrief("blocker", event.target.value)} placeholder="A technical constraint, missing team, unclear path, or something else" /></label>
    </div>
    <div className="brief-actions"><button className="button primary large" type="submit" disabled={opening}><CalendarIcon/>{opening ? "Opening calendar…" : "Continue to available times"}</button><small>Your details are passed securely to Cal.com to prefill the booking.</small></div>
    <a className="direct-booking-link" href={bookingUrl} target="_blank" rel="noreferrer">Already know what you need? Pick a time directly.</a>
  </form>;
}

function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="nav-wrap"><nav className="nav container" aria-label="Main navigation">
    <Logo />
    <div className="nav-links"><a href="#work">Work</a><Link href="/ecosystem">Ecosystem</Link><a href="#how">How we work</a><a href="#packages">Packages</a><a href="#faq">FAQ</a></div>
    <div className="nav-actions"><ThemeControls compact/><a className="button primary nav-cta" href="#booking">Discuss a project</a><button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span/><span/></button></div>
    {open && <div className="mobile-menu" id="mobile-menu"><a onClick={() => setOpen(false)} href="#work">Work</a><Link onClick={() => setOpen(false)} href="/ecosystem">Ecosystem</Link><a onClick={() => setOpen(false)} href="#how">How we work</a><a onClick={() => setOpen(false)} href="#packages">Packages</a><a onClick={() => setOpen(false)} href="#faq">FAQ</a><ThemeControls /></div>}
  </nav></header>;
}

function HeroPixelField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const CELL = 32;
    const REACH = 2.6;
    const LEVELS = [0, 0.14, 0.28, 0.44, 0.62];
    const DECAY = 0.9;
    let cols = 0;
    let rows = 0;
    let offsetX = 0;
    let width = 0;
    let height = 0;
    let heat = new Float32Array(0);
    let frame = 0;
    let line = "#dcded8";
    let accent = "#0673f9";
    let last: { x: number; y: number } | null = null;

    const readColors = () => {
      const styles = getComputedStyle(hero);
      line = styles.getPropertyValue("--border").trim() || line;
      accent = styles.getPropertyValue("--accent").trim() || accent;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = accent;
      for (let i = 0; i < heat.length; i += 1) {
        const value = heat[i];
        if (value < 0.08) continue;
        const level = LEVELS[Math.min(LEVELS.length - 1, Math.ceil(value * (LEVELS.length - 1)))];
        ctx.globalAlpha = level;
        const x = offsetX + (i % cols) * CELL;
        const y = Math.floor(i / cols) * CELL;
        ctx.fillRect(x + 2, y + 2, CELL - 3, CELL - 3);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = line;
      for (let x = offsetX; x <= width; x += CELL) ctx.fillRect(Math.round(x), 0, 1, height);
      for (let y = 0; y <= height; y += CELL) ctx.fillRect(0, y, width, 1);
    };

    const tick = () => {
      let active = false;
      for (let i = 0; i < heat.length; i += 1) {
        if (heat[i] > 0) {
          heat[i] = heat[i] < 0.05 ? 0 : heat[i] * DECAY;
          active = true;
        }
      }
      draw();
      frame = active ? requestAnimationFrame(tick) : 0;
    };
    const animate = () => { if (!frame) frame = requestAnimationFrame(tick); };

    const light = (px: number, py: number) => {
      const cx = (px - offsetX) / CELL;
      const cy = py / CELL;
      const r = Math.ceil(REACH);
      for (let y = Math.floor(cy) - r; y <= Math.floor(cy) + r; y += 1) {
        if (y < 0 || y >= rows) continue;
        for (let x = Math.floor(cx) - r; x <= Math.floor(cx) + r; x += 1) {
          if (x < 0 || x >= cols) continue;
          const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy);
          if (d > REACH) continue;
          const value = 1 - d / REACH;
          const i = y * cols + x;
          if (value > heat[i]) heat[i] = value;
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = hero.clientWidth;
      height = hero.clientHeight;
      offsetX = (width / 2) % CELL;
      cols = Math.ceil((width - offsetX) / CELL) + 1;
      rows = Math.ceil(height / CELL);
      heat = new Float32Array(cols * rows);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (last) {
        const steps = Math.max(1, Math.ceil(Math.hypot(x - last.x, y - last.y) / (CELL / 2)));
        for (let step = 1; step <= steps; step += 1) light(last.x + ((x - last.x) * step) / steps, last.y + ((y - last.y) * step) / steps);
      } else {
        light(x, y);
      }
      last = { x, y };
      hero.style.setProperty("--glow-x", `${(x - width / 2) * 0.12}px`);
      hero.style.setProperty("--glow-y", `${(y - height / 3) * 0.12}px`);
      animate();
    };
    const onLeave = () => {
      last = null;
      hero.style.setProperty("--glow-x", "0px");
      hero.style.setProperty("--glow-y", "0px");
    };

    readColors();
    resize();
    canvas.dataset.ready = "true";
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    const themeObserver = new MutationObserver(() => { readColors(); draw(); });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      delete canvas.dataset.ready;
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-grid" aria-hidden="true" />;
}

const realityIcons = ["puzzle", "shield", "clipboard", "handoff"] as const;

function ProductionReality() {
  const realityChecks = [
    ["01", "Fits the real workflow", "Users, roles, exceptions and existing systems shape the build."],
    ["02", "Survives the edge cases", "Failure paths, security and operational constraints are designed in."],
    ["03", "Ships with evidence", "Critical behaviour is verified in the environment it must survive."],
    ["04", "Leaves with your team", "Code, decisions, runbooks and operating context transfer cleanly."],
  ] as const;

  return <section className="reality-section" id="production-reality">
    <div className="reality-grid"/>
    <div className="container reality-layout">
      <div className="reality-copy" data-reveal>
        <span className="eyebrow"><i/>The production reality</span>
        <h2>Software is easier than ever to start. <em>Making it work in the real world is still the hard part.</em></h2>
        <p>A prototype can prove an idea. Production asks whether it works for real users, connects to the systems already in place, survives failure and can be owned after handover.</p>
        <a className="reality-link" href="#how">Explore the delivery system <Arrow/></a>
      </div>
      <div className="reality-stage" data-reveal aria-label="Examples of NewtonSchool Studio products operating in real workflows">
        <div className="reality-window reality-window-main">
          <div className="window-bar"><span><i/><i/><i/></span><b>Production system · university operations</b></div>
          <div className="reality-image"><Image src="/work/rishiverse/cover.jpg" alt="RishiVerse university operations dashboard" fill sizes="(max-width: 760px) calc(100vw - 48px), 670px"/></div>
        </div>
        <div className="reality-window reality-window-mobile">
          <div className="window-bar"><span><i/><i/><i/></span><b>Field workflow</b></div>
          <div className="reality-image"><Image src="/work/maverick-fieldvue/cover-phone.jpg" alt="FieldVue mobile scope and quoting workflow" fill sizes="220px"/></div>
        </div>
        <div className="reality-signal signal-one"><span>VERIFIED PATH</span><strong>Real users → real workflow</strong></div>
        <div className="reality-signal signal-two"><span>HANDOVER READY</span><strong>Code · evidence · runbooks</strong></div>
      </div>
    </div>
    <div className="container reality-checks" data-reveal>{realityChecks.map(([number, title, body], index) => <div key={number}><div className="reality-check-top"><span>{number}</span><PixelIcon name={realityIcons[index]} scale={3} /></div><h3>{title}</h3><p>{body}</p></div>)}</div>
  </section>;
}

function EcosystemSection() {
  return <section className="ecosystem-section" id="ecosystem">
    <div className="ecosystem-grid" aria-hidden="true" />
    <div className="container ecosystem-intro" data-reveal>
      <div>
        <span className="eyebrow"><i />THE STUDIO MODEL</span>
        <h2>Built inside Newton School of Technology. Accountable as one delivery team.</h2>
      </div>
      <div className="ecosystem-lede">
        <p>Full-time student engineers from Newton School of Technology work inside a focused pod under a named technical owner.</p>
        <p className="ecosystem-clarifier">The Studio remains accountable for architecture, technical risk, quality and release acceptance through handover.</p>
      </div>
    </div>

    <div className="container ecosystem-pod" data-reveal><PixelPod /></div>

    <div className="container ecosystem-metrics" data-reveal aria-label="Selected NewtonSchool Studio outcomes">
      {ecosystemProof.map((proof, index) => <Link href={proof.href} key={proof.project}><span>0{index + 1} · {proof.project}</span><strong>{proof.value}</strong><p>{proof.label}</p><b>Inspect the case study <Arrow /></b></Link>)}
    </div>

    <div className="container ecosystem-feature" data-reveal>
      <div className="ecosystem-proof-wall" aria-label="Selected products built by NewtonSchool Studio">
        <Link href="/work/rishiverse"><Image src="/work/rishiverse/cover.jpg" alt="RishiVerse university operations product" fill sizes="(max-width: 900px) 50vw, 34vw" /><span>RishiVerse</span></Link>
        <Link href="/work/zuvees"><Image src="/work/zuvees/cover.jpg" alt="Zuvees commerce and inventory product" fill sizes="(max-width: 900px) 50vw, 34vw" /><span>Zuvees</span></Link>
        <Link href="/work/iitr-collaboration"><Image src="/work/iitr-collaboration/cover.jpg" alt="IIT Roorkee welfare scheme discovery platform" fill sizes="(max-width: 900px) 50vw, 34vw" /><span>IIT Roorkee</span></Link>
        <Link href="/work/maverick-fieldvue"><Image src="/work/maverick-fieldvue/cover-phone.jpg" alt="FieldVue field estimation product" fill sizes="(max-width: 900px) 50vw, 34vw" /><span>FieldVue</span></Link>
      </div>
      <div className="ecosystem-feature-copy">
        <span>ONE DELIVERY SYSTEM</span>
        <h3>Focused execution with a clear line of ownership.</h3>
        <p>The pod moves product, services, data, quality and deployment together. Each release is reviewed against explicit acceptance criteria.</p>
        <div className="ecosystem-principles">{ecosystemPrinciples.map(item => <div key={item.number}><span>{item.number}</span><h4>{item.title}</h4><p>{item.body}</p></div>)}</div>
        <Link className="ecosystem-source" href="/ecosystem">Explore the complete Studio model <Arrow /></Link>
      </div>
    </div>

    <div className="container student-preview" data-reveal>
      <div className="student-preview-head"><span>THE WIDER NST BUILDER ECOSYSTEM</span><h3>Builders who start with difficult things.</h3><p>These are student projects from Newton School of Technology. They show the engineering culture behind the Studio, separate from client delivery evidence.</p></div>
      <div className="student-preview-grid">{studentProjects.map(project => <article key={project.number}>
        <div><Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) calc(100vw - 32px), 33vw" /></div>
        <span>{project.number} · {project.label}</span><h4>{project.title}</h4><p>{project.body}</p>
      </article>)}</div>
      <div className="collaboration-preview">
        <div className="collaboration-preview-image"><Image src="/nst-ecosystem/iit-roorkee.avif" alt="IIT Roorkee main building" fill sizes="(max-width: 900px) calc(100vw - 32px), 48vw" /><div><Image src="/nst-ecosystem/nst-iitr-collaboration.avif" alt="Newton School of Technology and IIT Roorkee collaboration" fill sizes="240px" /></div></div>
        <div className="collaboration-preview-copy"><span>INSTITUTIONAL COLLABORATION</span><h3>Six engineers. One platform built with IIT Roorkee and the Social Studies Foundation.</h3><p>The Community Empowerment Portal structures government schemes across 13 states and matches citizens to support they may qualify for.</p><figure className="institution-quote compact"><blockquote>“{iitrTestimonial.quote}”</blockquote><figcaption><strong>{iitrTestimonial.name}</strong><span>{iitrTestimonial.role}</span></figcaption></figure><Link className="ecosystem-source" href="/work/iitr-collaboration">Inspect the IIT Roorkee case study <Arrow /></Link></div>
      </div>
      <a className="ecosystem-source" href="https://www.newtonschool.co/newton-school-of-technology-nst/student-stories" target="_blank" rel="noreferrer">Explore published NST student stories <Arrow /></a>
    </div>
  </section>;
}

const storySteps = [
  {
    label: "01 · FRAME",
    title: "First, make the problem precise.",
    body: "We turn an unclear brief into a problem contract: the outcome, user, constraints, exclusions and success measures become explicit.",
    proof: "A buildable problem, not a longer wish list.",
  },
  {
    label: "02 · ARCHITECT",
    title: "Design the system around reality.",
    body: "Architecture follows the workflow, existing systems, data boundaries and failure behaviour. The risky decisions are surfaced before they become expensive code.",
    proof: "Interfaces, trade-offs and ownership made visible.",
  },
  {
    label: "03 · BUILD",
    title: "Move the connected work in parallel.",
    body: "A focused engineering pod advances product, services, data, quality and deployment together. AI accelerates bounded work; people own ambiguity and integration.",
    proof: "More execution density without fragmented ownership.",
  },
  {
    label: "04 · PROVE",
    title: "Evidence decides when it is ready.",
    body: "Critical behaviour becomes executable acceptance. The system is tested in the environment and conditions it must survive, not only demonstrated on the happy path.",
    proof: "Production evidence instead of task-count theatre.",
  },
  {
    label: "05 · TRANSFER",
    title: "The system leaves with your team.",
    body: "Code, architecture decisions, credentials, runbooks and operating context transfer cleanly. You receive a system your team can continue owning.",
    proof: "A working product with an accountable next chapter.",
  },
] as const;

const storyScenes = ["scene-frame", "scene-system", "scene-build", "scene-proof", "scene-handover"] as const;

function ScrollStory() {
  const [activeScene, setActiveScene] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveScene(Number((visible.target as HTMLElement).dataset.scene));
    }, { threshold: [0.35, 0.5, 0.65], rootMargin: "-12% 0px -12% 0px" });
    stepRefs.current.forEach(step => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <section className="scroll-story" id="how">
    <div className="story-aura"/>
    <div className="container story-layout">
      <div className="story-copy">
        <div className="story-intro"><span>THE PROBLEM-TO-PRODUCTION SYSTEM</span><p>Scroll through the operating model</p></div>
        {storySteps.map((step, index) => <article className={`story-step ${activeScene === index ? "active" : ""}`} data-scene={index} key={step.label} ref={element => { stepRefs.current[index] = element; }}>
          <PixelIcon name={storyScenes[index]} scale={4} className="story-step-scene" /><span>{step.label}</span><h2>{step.title}</h2><p>{step.body}</p><strong>{step.proof}</strong>
        </article>)}
      </div>
      <div className="story-sticky" aria-live="polite">
        <div className="story-console">
          <div className="story-console-head"><span>NEWTONSCHOOL STUDIO / DELIVERY OS</span><b><i/>SCENE 0{activeScene + 1}</b></div>
          <div className="story-viewport">
            <div className={`story-scene story-scene-frame ${activeScene === 0 ? "active" : ""}`}>
              <span className="floating-input input-one">Urgent launch</span><span className="floating-input input-two">Real users</span><span className="floating-input input-three">Existing systems</span><span className="floating-input input-four">Failure paths</span>
              <div className="problem-core"><small>PROBLEM CONTRACT</small><strong>One outcome.<br/>Explicit constraints.</strong><i/></div>
            </div>
            <div className={`story-scene story-scene-system ${activeScene === 1 ? "active" : ""}`}>
              <div className="system-node node-outcome">Outcome</div><div className="system-line line-a"/><div className="system-node node-architecture">Architecture</div><div className="system-line line-b"/><div className="system-node node-services">Services</div><div className="system-node node-data">Data</div><div className="system-node node-interfaces">Interfaces</div><div className="system-line line-c"/><div className="system-node node-production">Production</div>
            </div>
            <div className={`story-scene story-scene-build ${activeScene === 2 ? "active" : ""}`}>
              {["PRODUCT", "SERVICES", "DATA + AI", "QUALITY", "CLOUD"].map((lane, index) => <div className="build-lane" key={lane}><span>{lane}</span><i><b style={{ width: `${88 - index * 7}%` }}/></i><strong>{index === 4 ? "RELEASE" : "IN MOTION"}</strong></div>)}
              <div className="build-owner"><span>TECHNICAL OWNER</span><strong>One system · one release standard</strong></div>
            </div>
            <div className={`story-scene story-scene-proof ${activeScene === 3 ? "active" : ""}`}>
              {["Problem contract", "System contract", "Executable acceptance", "Production evidence"].map((gate, index) => <div className="proof-gate" key={gate}><span>0{index + 1}</span><strong>{gate}</strong><i>✓</i></div>)}
              <div className="proof-stamp">RELEASE<br/>ACCEPTED</div>
            </div>
            <div className={`story-scene story-scene-transfer ${activeScene === 4 ? "active" : ""}`}>
              <div className="transfer-folder"><span>OWNERSHIP TRANSFER</span><strong>production-system/</strong>{["source + history", "architecture decisions", "tests + evidence", "runbooks + access"].map(item => <p key={item}><i>✓</i>{item}</p>)}</div>
              <div className="transfer-owner"><span>OWNED BY</span><strong>Your team</strong><i/></div>
            </div>
          </div>
          <div className="story-console-foot"><span>AMBIGUITY</span><i><b style={{ width: `${(activeScene + 1) * 20}%` }}/></i><span>OWNERSHIP</span></div>
        </div>
        <div className="story-counter"><strong>0{activeScene + 1}</strong><span>/ 05</span></div>
      </div>
    </div>
  </section>;
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <article className={`card ${className}`}>{children}</article>; }
function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

export function CaseStudyCard({ item, featured = false }: { item: CaseStudySummary; featured?: boolean }) {
  return <Link className={`case-card-link ${featured ? "featured-case" : ""}`} href={`/work/${item.slug}`} aria-label={`View ${item.name} case study`} style={coverStyle(item.slug)}><Card className="case-card"><div className={`case-card-image ${item.imageFit === "contain" ? "contain" : ""}`}><Image src={item.image} alt={item.imageAlt} fill sizes={featured ? "(max-width: 760px) calc(100vw - 32px), 58vw" : "(max-width: 760px) calc(100vw - 32px), 32vw"}/>{featured && <span className="featured-case-label">Featured delivery</span>}</div><div className="case-content"><div className="case-head"><span className="case-head-label"><PixelIcon name={caseEmblems[item.slug] ?? "window"} className="case-card-emblem" />{item.industry}</span><span className={`client-logo ${item.slug}`}><Image src={item.logo} alt={item.logoAlt} fill sizes="150px"/></span></div><h3>{item.name}</h3><p className="problem">{item.problem}</p><p className="build">{item.build}</p><div className="case-metrics">{item.metrics.map(metric => <div key={`${metric.value}-${metric.label}`}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="result"><span>KEY RESULT</span><strong>{item.result}</strong></div><span className="case-link">View case study <Arrow/></span></div></Card></Link>;
}

export function PackageCard({ item }: { item: typeof packages[number] }) {
  return <Card className={`package-card ${"featured" in item && item.featured ? "featured" : ""}`}>
    {"featured" in item && item.featured && <span className="featured-label">WHERE MOST CLIENTS START</span>}
    <div className="package-top"><PixelIcon name={item.icon} scale={"featured" in item && item.featured ? 4 : 3} className="package-icon" /><h3>{item.title}</h3><span>{item.time}</span></div>
    <div className="package-use"><span>USE WHEN</span><p>{item.useWhen}</p></div>
    <div className="package-details">
      <div className="package-field"><span>WHAT YOU GET</span><ul>{item.deliverables.map(deliverable => <li key={deliverable}>{deliverable}</li>)}</ul></div>
      <div className="package-field"><span>SUCCESS LOOKS LIKE</span><p>{item.success}</p></div>
      <div className="package-field compact"><span>WE NEED</span><p>{item.clientNeeds}</p></div>
    </div>
    <a className={`package-action ${"featured" in item && item.featured ? "featured-action" : ""}`} href="#booking">Discuss this engagement <Arrow/></a>
  </Card>;
}

export function FAQItem({ item, open, onClick }: { item: typeof faqs[number]; open: boolean; onClick: () => void }) {
  return <div className={`faq-item ${open ? "open" : ""}`}><h3><button onClick={onClick} aria-expanded={open}><span>{item.q}</span><i aria-hidden="true"/></button></h3><div className="faq-answer" aria-hidden={!open}><p>{item.a}</p></div></div>;
}

export function StudioPage({ caseStudies }: { caseStudies: CaseStudySummary[] }) {
  const [faqOpen, setFaqOpen] = useState(0);
  const [bookingVisible, setBookingVisible] = useState(false);
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("revealed"); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    items.forEach(item => observer.observe(item)); return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const booking = document.querySelector("#booking");
    if (!booking) return;
    const observer = new IntersectionObserver(([entry]) => setBookingVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(booking);
    return () => observer.disconnect();
  }, []);
  return <>
    <Navigation />
    <main id="top">
      <section className="hero">
        <HeroPixelField/>
        <div className="container hero-layout">
          <div className="hero-copy" data-reveal>
            <span className="eyebrow"><i/>Problem-to-production engineering</span>
            <h1>Hard problems. <em>Software in production.</em></h1>
            <p>One accountable engineering team takes important product and operational problems from architecture through release and handover.</p>
            <div className="hero-actions">
              <a className="button primary large" href="#booking"><CalendarIcon/>Discuss your project</a>
              <a className="button secondary large" href="/newtonschool-studio-one-pager.pdf" download>Download the one-pager <Arrow/></a>
            </div>
            <div className="hero-reassurance"><span>20-minute scoping call</span><span>No prepared brief required</span></div>
          </div>
        </div>
        <div className="container hero-proof-rail" data-reveal aria-label="Selected delivery outcomes">
          <div><strong>80%</strong><span>less manual admin work</span></div>
          <div><strong>99.8%</strong><span>production uptime</span></div>
          <div><strong>&lt;200ms</strong><span>API response at p95</span></div>
          <div><strong>3×</strong><span>faster field estimates</span></div>
        </div>
      </section>

      <section className="section proof-section" id="work"><div className="container" data-reveal>
        <SectionHeading eyebrow="01 · DELIVERY EVIDENCE" title="Serious work. Inspectable outcomes." text="Each case study opens the problem, constraints, system decisions and available delivery evidence."/>
        <div className="case-grid">{caseStudies.map((item, index) => <CaseStudyCard item={item} featured={index === 0} key={item.name}/>)}</div>
      </div></section>

      <ProductionReality/>

      <EcosystemSection/>

      <section className="section alt fit-section audience-section" id="fit"><div className="container" data-reveal>
        <SectionHeading eyebrow="02 · BEST FIT" title="For teams with a real problem and a production deadline." text="The strongest fit is a validated need, one person who owns the outcome, and access to the users, systems and decisions needed to ship."/>
        <div className="customer-grid">{idealCustomers.map(item => <Card className="customer-card" key={item.title}><span>{item.label}</span><PixelIcon name={item.icon} scale={4} className="customer-icon" /><h3>{item.title}</h3><p>{item.body}</p><ul>{item.signals.map(signal => <li key={signal}>{signal}</li>)}</ul></Card>)}</div>
      </div></section>

      <section className="section problems-section" id="services"><div className="container" data-reveal>
        <SectionHeading eyebrow="03 · PROBLEMS" title="Bring us the problem that is not getting over the line." text="We work from the obstacle and the outcome, then assemble the product and engineering work needed to solve it."/>
        <div className="service-grid">{problemStates.map((item, index) => <Card className="service-card" key={item.title}><div className="service-leading"><span className="card-number">0{index + 1}</span><div className="service-icon"><Icon name={item.icon}/></div></div><div className="service-body"><h3>{item.title}</h3><p>{item.body}</p></div><Arrow/></Card>)}</div>
      </div></section>

      <section className="section alt ai-section"><div className="container ai-layout" data-reveal>
        <div className="ai-intro"><SectionHeading eyebrow="04 · AI AND DELIVERY" title="AI increases output. We turn it into a production outcome." text="The gap is no longer access to generated code. It is deciding what matters, coordinating the system and proving that it works in the real environment."/><div className="ai-principle"><span>OUR PRINCIPLE</span><p>Give AI bounded work. Keep architecture, ambiguity and release decisions human-owned.</p></div></div>
        <div className="comparison-grid">
          <div className="comparison-head"><span>AI CAN</span><span>THE STUDIO OWNS</span></div>
          {aiComparison.map(([ai, studio], index) => <div className="comparison-row" key={ai}><i>0{index + 1}</i><p>{ai}</p><Arrow/><strong>{studio}</strong></div>)}
        </div>
      </div></section>

      <ScrollStory/>

      <section className="section" id="packages"><div className="container" data-reveal>
        <SectionHeading eyebrow="06 · ENGAGEMENTS" title="Choose the next proof point." text="Each engagement is shaped around a decision or production outcome, with the evidence expected at the end made explicit."/>
        <div className="package-grid">{packages.map(item => <PackageCard item={item} key={item.title}/>)}</div>
        <div className="capabilities-note"><div className="addons"><span>CAPABILITIES</span>{["UX/UI design", "Security and compliance", "Data and analytics", "Migration and modernisation"].map(item => <i key={item}>{item}</i>)}</div></div>
      </div></section>

      <section className="section alt trust-section" id="trust"><div className="container" data-reveal>
        <SectionHeading eyebrow="TRUST" title="Your data, your environment, your code." text="The operating rules are agreed before delivery starts and carried through handover."/>
        <div className="trust-grid">{trustItems.map((item, index) => <Card className="trust-card" key={item.title}><div className="trust-card-top"><span>0{index + 1}</span><PixelIcon name={item.icon} scale={3} /></div><h3>{item.title}</h3><p>{item.body}</p></Card>)}</div>
      </div></section>

      <section className="section stack-section" id="stack"><div className="container" data-reveal>
        <SectionHeading eyebrow="07 · ENGINEERING APPROACH" title="We choose the system around the problem." text="Architecture follows the outcome, operational constraints and systems already in place. These are representative areas of work, connected to delivered examples."/>
        <div className="stack-highlights">{stackHighlights.map((item, index) => <Card className="stack-highlight" key={item.group}><span className="stack-number">0{index + 1}</span><div className="stack-description"><PixelIcon name={item.icon} scale={3} className="stack-icon" /><strong>{item.group}</strong><p>{item.body}</p></div><div className="tags">{item.items.map(technology => <i key={technology}>{technology}</i>)}</div><Link href={`/work/${item.proof.slug}`}>{item.proof.label} <Arrow/></Link></Card>)}</div>
        <p className="stack-note">We work inside your existing stack when it fits the outcome, and recommend a focused change when it does not.</p>
      </div></section>

      <section className="section alt" id="faq"><div className="container faq-layout" data-reveal>
        <div className="faq-aside"><SectionHeading eyebrow="08 · FAQ" title="Questions we expect" text="Straight answers before you spend time on a call."/><PixelIcon name="scene-faq" scale={4} className="faq-scene" /></div>
        <div className="faq-list">{faqs.map((item, index) => <FAQItem key={item.q} item={item} open={faqOpen === index} onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}/>)}</div>
      </div></section>

      <section className="section booking" id="booking"><div className="container booking-panel" data-reveal>
        <div className="booking-copy"><PixelIcon name="scene-call" scale={4} className="booking-scene" /><span className="eyebrow">09 · START HERE</span><h2>Tell us what’s stuck. We’ll tell you what it takes.</h2><p>A 20-minute call to identify the obstacle, the next useful proof point and whether we are the right team to own it.</p><div className="call-points"><div><span>01</span><p>Describe the outcome, users and current obstacle.</p></div><div><span>02</span><p>We separate the knowns, risks and decisions.</p></div><div><span>03</span><p>You leave with a recommended next step.</p></div></div></div>
        <BookingCard />
      </div></section>
    </main>
    <footer><div className="container footer-grid"><div><Logo/><p>From a hard problem to software in production.</p><PixelIcon name="scene-launch" scale={3} className="footer-scene" /></div><div><span>START</span><a className="footer-book" href="#booking">Discuss a project</a><a href="/newtonschool-studio-one-pager.pdf" download>Download the one-pager</a></div><div><span>CONTACT</span><a href="mailto:newtonschool-studio@newtonschool.co">newtonschool-studio@newtonschool.co</a>{linkedInUrl && <a href={linkedInUrl} target="_blank" rel="noreferrer">LinkedIn</a>}</div><div><span>INITIATIVE</span><p>A Newton School of Technology initiative</p><small>© 2026 NewtonSchool Studio</small></div></div></footer>
    <BackToTop />
    <div className={`mobile-book ${bookingVisible ? "hidden" : ""}`}><a className="button primary" href="#booking"><CalendarIcon/>Discuss your project</a></div>
  </>;
}
