import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { FinalCta, Footer, Nav, SectionHead } from "@/components/yugtytechnology/Chrome";
import TechIcon from "@/components/yugtytechnology/TechIcons";
import { BRAND, TECH_SERVICES } from "@/lib/yugtytechnology/content";

export const metadata: Metadata = {
  title: "Services",
  description: "Websites, web and mobile apps, software engineering, AI-powered solutions, digital transformation and consulting.",
};

export default function Services() {
  return (
    <>
      <Nav />
      <main id="main-content" className="dv dv-tech yt-page" style={{ "--a": BRAND.accent, "--a2": BRAND.accent2 } as CSSProperties}>
        <section className="dv-sec">
          <SectionHead kicker="SERVICES" title={<>Eight ways we <em>build.</em></>} text="Find the one that matches your problem. If you are unsure, start with consulting and we will recommend an order." />
          <div className="yt-svc">
            {TECH_SERVICES.map((s) => (
              <article key={s.code} id={s.code.toLowerCase()} className="yt-svc-item dv-rv">
                <header>
                  <TechIcon code={s.code} />
                  <div>
                    <span className="dv-bp-code">{s.code}</span>
                    <h2>{s.name}</h2>
                    <p>{s.text}</p>
                  </div>
                </header>
                <div className="yt-cols">
                  <div>
                    <h3>A good fit when</h3>
                    <ul>{s.fit.map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                  <div>
                    <h3>What you get</h3>
                    <ul>{s.deliver.map((f) => <li key={f}>{f}</li>)}</ul>
                  </div>
                </div>
                <Link className="vl-btn vl-btn-ghost vl-btn-sm" href={`/contact?kind=${encodeURIComponent(s.name)}`}>Start a {s.name.toLowerCase()} project</Link>
              </article>
            ))}
          </div>
          <p className="vl-note">No prices or timelines are published here because every project is different.</p>
        </section>
        <FinalCta title="Imagine it. We engineer it." />
      </main>
      <Footer />
    </>
  );
}
