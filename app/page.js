"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// HERO CONFIG (BOX DIRECT STREAM INTEGRATION)
// ─────────────────────────────────────────────────────────────────────────────
const HERO_VIDEO_URL = "https://app.box.com/index.php?rm=box_download_shared_file&shared_name=fwul0ubavc9joswlol2xeaceou4ajyr4&file_id=f_161400000000";

const MAX_HEADLINE_CHARS    = 60;
const MAX_DESCRIPTION_CHARS = 160;

const RAW_HEADLINE    = "We define how the world experiences luxury hospitality.";
const RAW_DESCRIPTION = "Sustained creative direction and cinema-grade asset architecture for the world’s most distinguished legacy icons, remote boutique reserves, and emergent travel concepts.";

const HEADLINE    = RAW_HEADLINE.length    > MAX_HEADLINE_CHARS
  ? RAW_HEADLINE.slice(0, MAX_HEADLINE_CHARS - 1).trimEnd()    + "…"
  : RAW_HEADLINE;

const DESCRIPTION = RAW_DESCRIPTION.length > MAX_DESCRIPTION_CHARS
  ? RAW_DESCRIPTION.slice(0, MAX_DESCRIPTION_CHARS - 1).trimEnd() + "…"
  : RAW_DESCRIPTION;

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO / CASE STUDIES DATA
// ─────────────────────────────────────────────────────────────────────────────
const CASE_STUDIES = [
  { id: "01", title: "Amangiri Retreat", location: "Utah, USA", type: "Cinematic Narrative", scale: "Full Scale" },
  { id: "02", title: "Soneva Jani", location: "Noonu Atoll", type: "Visual Authority Campaign", scale: "Digital Retainer" },
  { id: "03", title: "The New Mandrake", location: "London, UK", type: "Brand Architecture", scale: "Launch Strategy" }
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES DATA
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    index:    "01",
    title:    "Cinematic Production",
    tag:      "Spatial Storytelling",
    desc:     "High-velocity cinematic production built for heritage properties and remote reserves that refuse to be ordinary. Low-light architectural capture, atmospheric pacing, and spatial storytelling engineered to command permanent emotional memory.",
    detail:   "Aerial direction · Low-light capture · Atmospheric grade · Sound design",
  },
  {
    index:    "02",
    title:    "Editorial Photography",
    tag:      "Visual Authority",
    desc:     "Medium-format textural realism conceived as high-fashion spreads, not inventory catalogues. We capture moments of profound isolation, culinary narratives of rare discipline, and architectural details that establish visual authority before a single word is read.",
    detail:   "Medium-format · Interiors · Culinary narrative · Lifestyle · Aerial",
  },
  {
    index:    "03",
    title:    "Brand Positioning",
    tag:      "Verbal Luxury Architecture",
    desc:     "We construct the verbal and visual architecture that defines unmatched market pricing power and carves out historic distinction. Positioning that does not compete for attention — it renders competition irrelevant.",
    detail:   "Market positioning · Verbal identity · Pricing authority · Heritage narrative",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Barlow+Condensed:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:      #0d0d0d;
    --ink:     #f2efe9;
    --ink-mid: #a6a29a;
    --ink-dim: #595651;
  }

  html { scroll-behavior: smooth; background: var(--bg); color: var(--ink); }

  @keyframes vg-slice { from { clip-path: inset(0 100% 0 0); opacity: 0; } to { clip-path: inset(0 0% 0 0); opacity: 1; } }
  @keyframes vg-rise { from { transform: translateY(28px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes vg-fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes vg-line { from { transform: scaleY(0); transform-origin: top; } to { transform: scaleY(1); transform-origin: top; } }
  @keyframes vg-scroll-pip { 0% { transform: translateY(-100%); opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { transform: translateY(200%); opacity: 0; } }

  .vg-slice { animation: vg-slice 1.1s cubic-bezier(0.77,0,0.18,1) both; }
  .vg-rise  { animation: vg-rise  0.9s cubic-bezier(0.22,1,0.36,1) both; }
  .vg-fade  { animation: vg-fade  0.8s ease both; }
  .vg-line  { animation: vg-line  1s   cubic-bezier(0.22,1,0.36,1) both; }

  .vs-reveal { opacity: 0; transform: translateY(40px); transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1), transform 1.1s cubic-bezier(0.16, 1, 0.3, 1); }
  .vs-reveal.vs-visible { opacity: 1; transform: translateY(0); }
  
  .portfolio-card { transition: border-color 0.4s ease, transform 0.4s ease; border: 1px solid rgba(242,239,233,0.06); }
  .portfolio-card:hover { border-color: rgba(242,239,233,0.35); transform: translateY(-4px); }

  @media (max-width: 768px) {
    .vg-headline { font-size: clamp(2.2rem, 10vw, 4rem) !important; }
    .vg-grid { grid-template-columns: 1fr !important; }
    .vg-aside { display: none !important; }
    .vs-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
    .portfolio-grid { grid-template-columns: 1fr !important; }
  }
`;

function HeroSection() {
  const videoRef = useRef(null);

  return (
    <section style={{ position: "relative", width: "100%", height: "100dvh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          loop muted playsInline autoPlay
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }}
          onError={(e) => {
            // Fallback gracefully to luxury gradient structure if link requires session authentication token
            e.currentTarget.style.display = 'none';
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(13,13,13,0.9) 0%, rgba(13,13,13,0.4) 100%)" }} />
      </div>

      <header className="vg-fade" style={{ position: "relative", zIndex: 50, display: "flex", justifyContent: "space-between", padding: "2rem 2.75rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.55rem" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 700, letterSpacing: "0.04em" }}>VOYAGE</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.38em", color: "var(--ink-dim)" }}>GROUP</span>
        </div>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.6rem", letterSpacing: "0.32em", color: "var(--ink-dim)" }}>LUXURY HOSPITALITY MEDIA</span>
      </header>

      <div className="vg-grid" style={{ position: "relative", zIndex: 20, flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "flex-end", padding: "0 2.75rem 4rem" }}>
        <div>
          <h1 className="vg-headline vg-slice" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem, 6vw, 6.5rem)", fontWeight: 900, fontStyle: "italic", lineHeight: 0.95, marginBottom: "2rem" }}>
            {HEADLINE}
          </h1>
          <p className="vg-rise" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.85rem", lineHeight: 1.75, color: "var(--ink-mid)", maxWidth: "360px" }}>
            {DESCRIPTION}
          </p>
        </div>
        
        <div className="vg-aside" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <div style={{ width: "1px", height: "4rem", background: "rgba(242,239,233,0.15)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", width: "100%", height: "40%", background: "var(--ink)", animation: "vg-scroll-pip 2.2s infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ManifestoSection() {
  return (
    <section className="vs-reveal" style={{ padding: "10rem 2.75rem", background: "#0a0a0a", borderTop: "1px solid rgba(242,239,233,0.05)" }}>
      <div style={{ maxWidth: "800px" }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "var(--ink-dim)", display: "block", marginBottom: "2rem" }}>02 / MANIFESTO</span>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.8rem)", fontStyle: "italic", lineHeight: 1.3, fontWeight: 400 }}>
          "Prestige is not built on visibility; it is forged through profound restraint. We render competition completely irrelevant by establishing absolute aesthetic authority."
        </h2>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="vs-reveal" style={{ padding: "6rem 2.75rem", background: "var(--bg)" }}>
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "var(--ink-dim)", display: "block", marginBottom: "3rem" }}>03 / CAPABILITIES</span>
      {SERVICES.map((s) => (
        <div key={s.index} className="vs-row" style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", padding: "2.5rem 0", borderBottom: "1px solid rgba(242,239,233,0.05)" }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--ink-dim)" }}>{s.index}</span>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontStyle: "italic", marginBottom: "0.5rem" }}>{s.title}</h3>
            <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.85rem", color: "var(--ink-mid)", maxWidth: "500px" }}>{s.desc}</p>
          </div>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.65rem", color: "var(--ink-dim)", textAlign: "right" }}>{s.tag}</span>
        </div>
      ))}
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className="vs-reveal" style={{ padding: "6rem 2.75rem", background: "#080808" }}>
      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "var(--ink-dim)", display: "block", marginBottom: "3rem" }}>04 / RECENT PROJECTS</span>
      <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
        {CASE_STUDIES.map((c) => (
          <div key={c.id} className="portfolio-card" style={{ padding: "2.5rem", background: "rgba(255,255,255,0.01)" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", color: "var(--ink-dim)" }}>{c.location}</span>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontStyle: "italic", margin: "0.5rem 0 1.5rem" }}>{c.title}</h4>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.65rem", color: "var(--ink-mid)" }}>
              <span>{c.type}</span>
              <span style={{ color: "var(--ink-dim)" }}>{c.scale}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function CombinedWebsitePreview() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("vs-visible"); });
    }, { threshold: 0.05 });
    document.querySelectorAll(".vs-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <main>
        <HeroSection />
        <ManifestoSection />
        <ServicesSection />
        <PortfolioSection />
      </main>
    </>
  );
}
