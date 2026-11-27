import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaseStudyThemeToggle } from "@/components/case-study-theme-toggle";
import { PixelIcon } from "@/components/pixel-icon";

export const metadata: Metadata = {
  title: "Page not found | NewtonSchool Studio",
};

export default function NotFound() {
  return <>
    <header className="case-nav"><div className="container"><Link className="logo" href="/" aria-label="NewtonSchool Studio home"><span className="logo-image-wrap"><Image className="logo-image" src="/newtonschool-studio-logo.png" width={32} height={32} alt="" priority/></span><span>NewtonSchool <b>Studio</b></span></Link><div><CaseStudyThemeToggle/></div></div></header>
    <main className="not-found">
      <div className="container not-found-layout">
        <PixelIcon name="broken-pipe" scale={8} className="not-found-scene" />
        <span className="eyebrow">Error 404 · pipeline broken</span>
        <h1>This page didn’t make it to production.</h1>
        <p>The link may be old, or the page may have moved. Everything else is still running.</p>
        <div className="not-found-actions">
          <Link className="button primary large" href="/">Back to the homepage</Link>
          <Link className="button secondary large" href="/#work">See our work</Link>
        </div>
      </div>
    </main>
  </>;
}
