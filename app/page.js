"use client";

import { useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG & CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const HERO_VIDEO_URL = "https://app.box.com/index.php?rm=box_download_shared_file&shared_name=fwul0ubavc9joswlol2xeaceou4ajyr4&file_id=f_161400000000";

const SERVICES = [
  { id: "01", title: "Cinematic Production", tag: "Spatial Storytelling", desc: "High-velocity cinematic production built for heritage properties and remote reserves that refuse to be ordinary." },
  { id: "02", title: "Editorial Photography", tag: "Visual Authority", desc: "Medium-format textural realism conceived as high-fashion spreads, not inventory catalogues." },
  { id: "03", title: "Brand Positioning", tag: "Verbal Luxury Architecture", desc: "We construct the verbal and visual architecture that defines unmatched market pricing power." }
];

const PORTFOLIO = [
  { id: "01", title: "The Aman Collection", location: "Amangiri, Utah", category: "Cinematic Asset Architecture" },
  { id: "02", title: "Soneva Heritage", location: "Maldives", category: "Editorial & Visual Strategy" },
  { id: "03", title: "The Mandrake", location: "London, UK", category: "Brand Positioning Architecture" }
];

// ─────────────────────────────────────────────────────────────────────────────
// CLAUDE DESIGN ALIGNED CSS
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Barlow+Condensed:wght@200;300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-dark:   #090909;
    --bg-card:   #111111;
    --text-pure: #f5f2eb;
    --text-mid:  #9c9890;
    --text-dim:  #4a4742;
    --accent:    #c5a880;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-pure);
    font-family: 'Barlow Condensed', sans-serif;
    overflow-x: hidden;
  }

  /* Smooth reveal classes */
  .fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 1.2s cubic-bezier(0.215, 0.610, 0.355, 1), 
                transform 1.2s cubic-bezier(0.215, 0.610, 0.355, 1);
  }
  .fade-in-section.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Custom Hover Interactions mimicking Claude Share Link */
  .interactive-row {
    transition: all 0.4s ease;
    border-bottom: 1px solid rgba(245,242,235, 0.05);
  }
  .interactive-row:hover {
    background: rgba(245,242,235, 0.015);
    border-bottom: 1px solid var(--accent);
    padding-left: 10px;
  }

  .portfolio-image-placeholder {
    width: 100%;
    height: 450px;
    background: #141414;
    position: relative;
    overflow: hidden;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .portfolio-card:hover .portfolio-image-placeholder {
    transform: scale(1.02);
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────────────────────────────────────
function Navigation() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2rem 4rem", position: "absolute", width: "100%", zIndex: 100 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, letterSpacing: "0.05em" }}>VOYAGE</span>
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.4em", color: "var(--text-dim)" }}>GROUP</span>
      </div>
      <div style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--text-mid)" }}>MEMBER DIRECTORY</span>
        <button style={{ background: "none", border: "1px solid rgba(245,242,235,0.2)", padding: "0.6rem 1.5rem", color: "var(--text-pure)", textTransform: "uppercase", fontSize: "0.6rem", letterSpacing: "0.2em", cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.borderColor="var(--accent)"} onMouseLeave={e => e.currentTarget.style.borderColor="rgba(245,242,235,0.2)"}>Inquire</button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{ height: "100vh", position: "relative", display: "flex", alignItems: "flex-end", padding: "0 4rem 6rem 4rem", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <video src={HERO_VIDEO_URL} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-dark) 15%, transparent 85%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, maxWidth: "900px" }}>
        <span style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.5em", color: "var(--accent)", marginBottom: "1.5rem" }}>PRESTIGE OVER VISIBILITY</span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6.5vw, 6rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.05, marginBottom: "2.5rem" }}>
          We define how the world experiences luxury hospitality.
        </h1>
        <div style={{ width: "120px", height: "1px", background: "var(--accent)" }} />
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="fade-in-section" style={{ padding: "12rem 4rem", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem" }}>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--text-dim)" }}>01 / THE MANIFESTO</span>
      <div>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontStyle: "italic", lineHeight: 1.4, color: "var(--text-pure)", marginBottom: "2rem" }}>
          "True luxury doesn't shout; it commands absolute presence through curated restraint."
        </p>
        <p style={{ fontSize: "0.85rem", letterSpacing: "0.05em", lineHeight: 1.8, color: "var(--text-mid)", maxWidth: "550px" }}>
          Sustained creative direction and cinema-grade asset architecture for properties whose legacies demand preservation, not just market exposure.
        </p>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="fade-in-section" style={{ padding: "8rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4rem", borderBottom: "1px solid rgba(245,242,235,0.05)", paddingBottom: "1.5rem" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--text-dim)" }}>02 / CAPABILITIES</span>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--text-mid)" }}>CORE SPECIALIZATIONS</span>
      </div>
      <div>
        {SERVICES.map(s => (
          <div key={s.id} className="interactive-row" style={{ display: "grid", gridTemplateColumns: "0.5fr 1.5fr 2fr", padding: "2.5rem 0", alignItems: "baseline" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>{s.id}</span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 400, fontStyle: "italic" }}>{s.title}</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-mid)", maxWidth: "400px" }}>{s.desc}</p>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--accent)" }}>{s.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="fade-in-section" style={{ padding: "8rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4rem" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--text-dim)" }}>03 / SELECTED WORKS</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
        {PORTFOLIO.map(p => (
          <div key={p.id} className="portfolio-card" style={{ cursor: "pointer" }}>
            <div className="portfolio-image-placeholder">
              {/* Subtle architectural frame pattern mimicking asset capture grids */}
              <div style={{ position: "absolute", inset: "20px", border: "1px solid rgba(245,242,235,0.02)" }} />
              <div style={{ position: "absolute", bottom: "20px", left: "20px", fontSize: "0.6rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>ASSET FRAME {p.id}</div>
            </div>
            <div style={{ marginTop: "1.5rem" }}>
              <span style={{ fontSize: "0.6rem", color: "var(--accent)", letterSpacing: "0.15em", display: "block", marginBottom: "0.5rem" }}>{p.location.toUpperCase()}</span>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontStyle: "italic", fontWeight: 400, marginBottom: "0.25rem" }}>{p.title}</h4>
              <span style={{ fontSize: "0.65rem", color: "var(--text-mid)" }}>{p.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENTRY DIRECTORY
// ─────────────────────────────────────────────────────────────────────────────
export default function ClaudeDesignIntegration() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".fade-in-section").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <Services />
        <Portfolio />
      </main>
    </>
  );
}
