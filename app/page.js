"use client";

import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// HERO CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const HERO_VIDEO_URL = "https://app.box.com/shared/static/54z78jazdeo9lwzk01m8d2n5h9n5m879.mp4";

const MAX_HEADLINE_CHARS    = 60;
const MAX_DESCRIPTION_CHARS = 160;

const RAW_HEADLINE    = "We define how the world experiences luxury hospitality.";
const RAW_DESCRIPTION = "Sustained creative direction and cinema-grade asset architecture for the world\u2019s most distinguished legacy icons, remote boutique reserves, and emergent travel concepts.";

const HEADLINE    = RAW_HEADLINE.length    > MAX_HEADLINE_CHARS
  ? RAW_HEADLINE.slice(0, MAX_HEADLINE_CHARS - 1).trimEnd()    + "\u2026"
  : RAW_HEADLINE;

const DESCRIPTION = RAW_DESCRIPTION.length > MAX_DESCRIPTION_CHARS
  ? RAW_DESCRIPTION.slice(0, MAX_DESCRIPTION_CHARS - 1).trimEnd() + "\u2026"
  : RAW_DESCRIPTION;

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES DATA
// ─────────────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    index:    "01",
    title:    "Cinematic Production",
    tag:      "Spatial Storytelling",
    desc:     "High-velocity cinematic production built for heritage properties and remote reserves that refuse to be ordinary. Low-light architectural capture, atmospheric pacing, and spatial storytelling engineered to command permanent emotional memory.",
    detail:   "Aerial direction \u00b7 Low-light capture \u00b7 Atmospheric grade \u00b7 Sound design",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-by-the-ocean-41655-large.mp4",
  },
  {
    index:    "02",
    title:    "Editorial Photography",
    tag:      "Visual Authority",
    desc:     "Medium-format textural realism conceived as high-fashion spreads, not inventory catalogues. We capture moments of profound isolation, culinary narratives of rare discipline, and architectural details that establish visual authority before a single word is read.",
    detail:   "Medium-format \u00b7 Interiors \u00b7 Culinary narrative \u00b7 Lifestyle \u00b7 Aerial",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-luxury-living-room-42223-large.mp4",
  },
  {
    index:    "03",
    title:    "Brand Positioning",
    tag:      "Verbal Luxury Architecture",
    desc:     "We construct the verbal and visual architecture that defines unmatched market pricing power and carves out historic distinction. Positioning that does not compete for attention \u2014 it renders competition irrelevant.",
    detail:   "Market positioning \u00b7 Verbal identity \u00b7 Pricing authority \u00b7 Heritage narrative",
    videoUrl: null,
  },
  {
    index:    "04",
    title:    "Social Architecture",
    tag:      "Prestige Over Visibility",
    desc:     "Hyper-curated, low-frequency content strategies that treat digital feeds as physical open-air galleries. We establish prestige over visibility \u2014 building desire through restraint, not volume, so each release commands attention rather than competing for it.",
    detail:   "Feed curation \u00b7 Campaign architecture \u00b7 Frequency strategy \u00b7 Platform direction",
    videoUrl: null,
  },
  {
    index:    "05",
    title:    "Retainer Custodianship",
    tag:      "Long-Term Brand Evolution",
    desc:     "Multi-season creative integration for properties whose legacy demands protection, not management. We embed as custodians of your brand\u2019s heritage \u2014 evolving the visual narrative across years, not campaigns, with absolute creative authority and continuity.",
    detail:   "Multi-season evolution \u00b7 Creative integration \u00b7 Heritage stewardship \u00b7 Priority access",
    videoUrl: null,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES — single source of truth for the combined preview
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Barlow+Condensed:wght@200;300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Design tokens — hardcoded per brief ── */
  :root {
    --bg:      #0d0d0d;
    --ink:     #f2efe9;
    --ink-mid: #a6a29a;
    --ink-dim: #595651;
  }

  html { scroll-behavior: smooth; }

  /* ════════════════════════════════════════
     HERO KEYFRAMES & UTILITY CLASSES
  ════════════════════════════════════════ */
  @keyframes vg-slice {
    from { clip-path: inset(0 100% 0 0); opacity: 0; }
    to   { clip-path: inset(0 0%   0 0); opacity: 1; }
  }
  @keyframes vg-rise {
    from { transform: translateY(28px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes vg-fade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes vg-line {
    from { transform: scaleY(0); transform-origin: top; }
    to   { transform: scaleY(1); transform-origin: top; }
  }
  @keyframes vg-scroll-pip {
    0%   { transform: translateY(-100%); opacity: 0; }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { transform: translateY(200%);  opacity: 0; }
  }
  @keyframes vg-grain {
    0%, 100% { transform: translate(0,0);     }
    10%      { transform: translate(-1%,-1%); }
    20%      { transform: translate(1%,1%);   }
    30%      { transform: translate(-1%,0);   }
    40%      { transform: translate(0,1%);    }
    50%      { transform: translate(1%,-1%);  }
    60%      { transform: translate(-1%,1%);  }
    70%      { transform: translate(1%,0);    }
    80%      { transform: translate(0,-1%);   }
    90%      { transform: translate(-1%,1%);  }
  }

  .vg-slice { animation: vg-slice 1.1s cubic-bezier(0.77,0,0.18,1) both; }
  .vg-rise  { animation: vg-rise  0.9s cubic-bezier(0.22,1,0.36,1) both; }
  .vg-fade  { animation: vg-fade  0.8s ease both; }
  .vg-line  { animation: vg-line  1s   cubic-bezier(0.22,1,0.36,1) both; }

  /* ════════════════════════════════════════
     SERVICES SCROLL-REVEAL & ROW CLASSES
  ════════════════════════════════════════ */
  .vs-reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1),
                transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .vs-reveal.vs-visible {
    opacity:   1;
    transform: translateY(0);
  }
  .vs-title {
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease;
  }
  .vs-row:hover .vs-title {
    color:     var(--ink);
    transform: translateX(10px);
  }

  /* ════════════════════════════════════════
     RESPONSIVE — HERO
  ════════════════════════════════════════ */
  @media (max-width: 768px) {
    .vg-headline  { font-size: clamp(2.2rem, 10vw, 4rem) !important; margin-bottom: 1.5rem !important; }
    .vg-desc      { max-width: 100% !important; font-size: 0.85rem !important; }
    .vg-grid      { grid-template-columns: 1fr !important; }
    .vg-aside     { display: none !important; }
    .vg-pad       { padding: 0 1.5rem !important; }
    .vg-nav-pad   { padding: 1.6rem 1.5rem !important; }
    .vg-bottom    { padding: 2rem 1.5rem !important; }
    .vg-desc-row  { flex-direction: column !important; align-items: flex-start !important; gap: 1.5rem !important; }
    .vg-cta-stack { align-items: flex-start !important; width: 100%; }
    .vg-cta-stack button { width: 100%; text-align: center; justify-content: center; }
  }

  /* ════════════════════════════════════════
     RESPONSIVE — SERVICES
  ════════════════════════════════════════ */
  @media (max-width: 1024px) {
    .vs-grid-even           { grid-template-columns: 5.5rem 1.2fr 1.8fr 1fr !important; }
    .vs-grid-odd            { grid-template-columns: 5.5rem 1.8fr 1.2fr 1fr !important; }
    .vs-video-preview-wrap  { display: none !important; }
  }
  @media (max-width: 768px) {
    .vs-row {
      grid-template-columns: 3rem 1fr !important;
      gap: 1.5rem 0 !important;
      padding: 2.5rem 0 !important;
    }
    .vs-row > div:nth-child(3) {
      grid-column: 2 / 3 !important;
      padding-left: 0 !important;
      padding-right: 1.5rem !important;
    }
    .vs-row > div:nth-child(4) {
      grid-column: 2 / 3 !important;
      padding-left: 0 !important;
      padding-right: 1.5rem !important;
      margin-top: 1rem;
    }
    .vs-row > div:first-child { padding-left: 1.5rem !important; }
    .vs-title  { font-size: clamp(1.8rem, 7vw, 2.6rem) !important; }
    .vs-section-header {
      grid-template-columns: 1fr !important;
      gap: 3rem !important;
      padding: 6rem 1.5rem 3rem !important;
    }
    .vs-footer     { padding: 1.5rem !important; }
    .vs-cta-strip  { flex-direction: column !important; align-items: flex-start !important; padding: 4rem 1.5rem !important; }
    .vs-cta-button { width: 100% !important; text-align: center; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────
function HeroSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      style={{
        position:      "relative",
        width:         "100%",
        height:        "100dvh",
        minHeight:     "600px",
        background:    "var(--bg)",
        overflow:      "hidden",
        display:       "flex",
        flexDirection: "column",
      }}
    >
      {/* ══════════════════════════════════════
          BACKGROUND — VIDEO + OVERLAYS
      ══════════════════════════════════════ */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>

        {HERO_VIDEO_URL ? (
          <video
            ref={videoRef}
            src={HERO_VIDEO_URL}
            loop muted playsInline autoPlay
            style={{
              position:       "absolute",
              inset:          0,
              width:          "100%",
              height:         "100%",
              objectFit:      "cover",
              objectPosition: "center",
              opacity:        0.55,
            }}
          />
        ) : (
          <div style={{
            position:   "absolute",
            inset:      0,
            background: `
              radial-gradient(ellipse 120% 80% at 65% 40%, rgba(255,255,255,0.03) 0%, transparent 65%),
              radial-gradient(ellipse 60% 50% at 80% 70%,  rgba(255,255,255,0.02) 0%, transparent 60%),
              #0d0d0d
            `,
          }} />
        )}

        {/* Top hairline */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: "6px", background: "var(--ink)", opacity: 0.06,
        }} />

        {/* Directional gradient */}
        <div style={{
          position:   "absolute",
          inset:      0,
          background: `linear-gradient(105deg,
            rgba(13,13,13,0.88) 0%,
            rgba(13,13,13,0.60) 35%,
            rgba(13,13,13,0.20) 65%,
            rgba(13,13,13,0.05) 100%)`,
        }} />

        {/* Bottom vignette */}
        <div style={{
          position:   "absolute",
          bottom:     0, left: 0, right: 0,
          height:     "55%",
          background: "linear-gradient(to top, rgba(13,13,13,0.95) 0%, transparent 100%)",
        }} />

        {/* Film grain */}
        <div style={{
          position:        "absolute",
          inset:           "-50%",
          width:           "200%",
          height:          "200%",
          opacity:         0.055,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize:  "256px 256px",
          animation:       "vg-grain 0.8s steps(1) infinite",
          pointerEvents:   "none",
        }} />
      </div>

      {/* ══════════════════════════════════════
          NAV
      ══════════════════════════════════════ */}
      <header
        className="vg-nav-pad vg-fade"
        style={{
          position:          "relative",
          zIndex:            50,
          display:           "flex",
          alignItems:        "center",
          justifyContent:    "space-between",
          padding:           "2rem 2.75rem",
          animationDelay:    "0.1s",
          animationFillMode: "both",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.55rem" }}>
          <span style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "1.05rem",
            fontWeight:    700,
            letterSpacing: "0.04em",
            color:         "var(--ink)",
            lineHeight:    1,
          }}>
            VOYAGE
          </span>
          <span style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "0.55rem",
            fontWeight:    300,
            letterSpacing: "0.38em",
            color:         "var(--ink-dim)",
            textTransform: "uppercase",
            lineHeight:    1,
          }}>
            Group
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          <span style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "0.6rem",
            fontWeight:    300,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color:         "var(--ink-dim)",
          }}>
            Luxury Hospitality Media
          </span>

          <button
            style={{
              fontFamily:    "'Barlow Condensed', sans-serif",
              fontSize:      "0.6rem",
              fontWeight:    400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color:         "var(--ink)",
              background:    "transparent",
              border:        "1px solid rgba(242,239,233,0.28)",
              padding:       "0.55rem 1.4rem",
              cursor:        "pointer",
              transition:    "border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--ink)";
              e.currentTarget.style.background  = "rgba(242,239,233,0.06)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(242,239,233,0.28)";
              e.currentTarget.style.background  = "transparent";
            }}
          >
            Inquire
          </button>
        </div>
      </header>

      {/* ══════════════════════════════════════
          MAIN CONTENT — asymmetric bottom-left
      ══════════════════════════════════════ */}
      <div
        className="vg-grid"
        style={{
          position:            "relative",
          zIndex:              20,
          flex:                1,
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows:    "1fr auto",
          alignItems:          "flex-end",
        }}
      >
        {/* Left: editorial copy */}
        <div className="vg-pad vg-bottom" style={{ padding: "0 2.75rem 3.5rem" }}>

          {/* Eyebrow */}
          <div
            className="vg-fade"
            style={{
              display: "flex", alignItems: "center", gap: "1rem",
              marginBottom: "1.5rem",
              animationDelay: "0.5s", animationFillMode: "both",
            }}
          >
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ink-dim)" }}>01</span>
            <span style={{ display: "block", width: "2rem", height: "1px", background: "rgba(242,239,233,0.25)" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ink-dim)" }}>Spatial Storytelling & Visual Authority</span>
          </div>

          {/* Headline */}
          <h1
            className="vg-headline vg-slice"
            style={{
              fontFamily:        "'Playfair Display', serif",
              fontSize:          "clamp(3.8rem, 6.5vw, 7rem)",
              fontWeight:        900,
              fontStyle:         "italic",
              lineHeight:        0.94,
              letterSpacing:     "-0.025em",
              color:             "var(--ink)",
              margin:            0,
              marginBottom:      "2.25rem",
              animationDelay:    "0.65s",
              animationFillMode: "both",
            }}
          >
            {HEADLINE}
          </h1>

          {/* Hairline */}
          <div
            className="vg-line"
            style={{
              width: "100%", height: "1px",
              background: "rgba(242,239,233,0.12)",
              marginBottom: "1.75rem",
              animationDelay: "1s", animationFillMode: "both",
            }}
          />

          {/* Description + CTAs */}
          <div
            className="vg-rise vg-desc-row"
            style={{
              display: "flex", alignItems: "flex-start",
              justifyContent: "space-between", gap: "2rem",
              animationDelay: "1.1s", animationFillMode: "both",
            }}
          >
            <p
              className="vg-desc"
              style={{
                fontFamily:    "'Barlow Condensed', sans-serif",
                fontSize:      "0.8rem",
                fontWeight:    300,
                lineHeight:    1.75,
                letterSpacing: "0.05em",
                color:         "var(--ink-mid)",
                maxWidth:      "340px",
                margin:        0,
              }}
            >
              {DESCRIPTION}
            </p>

            <div
              className="vg-cta-stack"
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem", flexShrink: 0 }}
            >
              <button
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "0.6rem",
                  fontWeight:    400,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color:         "var(--bg)",
                  background:    "var(--ink)",
                  border:        "none",
                  padding:       "0.85rem 2rem",
                  cursor:        "pointer",
                  transition:    "opacity 0.25s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
              >
                Start a Conversation
              </button>

              <button
                style={{
                  fontFamily:    "'Barlow Condensed', sans-serif",
                  fontSize:      "0.6rem",
                  fontWeight:    300,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color:         "var(--ink-dim)",
                  background:    "transparent",
                  border:        "none",
                  padding:       0,
                  cursor:        "pointer",
                  display:       "flex",
                  alignItems:    "center",
                  gap:           "0.5rem",
                  transition:    "color 0.25s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "var(--ink-dim)"; }}
              >
                View Our Work
                <span style={{ fontSize: "0.75rem" }}>{"\u2197"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: void + aside */}
        <div
          className="vg-aside"
          style={{
            display: "flex", flexDirection: "column",
            justifyContent: "flex-end", alignItems: "flex-end",
            padding: "0 2.75rem 3.5rem", gap: "3rem",
          }}
        >
          {/* Scroll pip */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}>
            <div style={{ width: "1px", height: "5rem", background: "rgba(242,239,233,0.1)", position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                height: "40%", background: "rgba(242,239,233,0.55)",
                animation: "vg-scroll-pip 2.2s cubic-bezier(0.4,0,0.2,1) 2.5s infinite",
              }} />
            </div>
            <span style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.5rem",
              fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase",
              color: "var(--ink-dim)", writingMode: "vertical-rl", transform: "rotate(180deg)",
            }}>
              Scroll
            </span>
          </div>

          {/* Metadata */}
          <div
            className="vg-fade"
            style={{
              display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.4rem",
              animationDelay: "1.6s", animationFillMode: "both",
            }}
          >
            {["Est. London", "Luxury Hospitality Media"].map(t => (
              <span key={t} style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.52rem",
                fontWeight: 300, letterSpacing: "0.34em", textTransform: "uppercase",
                color: "rgba(242,239,233,0.2)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════ */}
      <div
        className="vg-fade"
        style={{
          position: "relative", zIndex: 30,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1rem 2.75rem",
          borderTop: "1px solid rgba(242,239,233,0.07)",
          animationDelay: "1.8s", animationFillMode: "both",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          {[true, false, false, false, false].map((active, i) => (
            <span key={i} style={{
              display: "block",
              width:      active ? "1.4rem" : "0.35rem",
              height:     "1px",
              background: active ? "var(--ink)" : "rgba(242,239,233,0.2)",
              transition: "width 0.3s ease",
            }} />
          ))}
        </div>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.52rem",
          fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase",
          color: "rgba(242,239,233,0.22)",
        }}>
          01 / 05 {"\u2014"} Hero
        </span>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES SECTION
// ─────────────────────────────────────────────────────────────────────────────
function ServicesSection() {
  const containerRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el    = entry.target;
            const delay = el.getAttribute("data-delay") || "0";
            el.style.transitionDelay = delay + "ms";
            el.classList.add("vs-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    container.querySelectorAll(".vs-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{ position: "relative", width: "100%", background: "var(--bg)", overflow: "hidden" }}
    >

      {/* ════════════════════════════════════════
          STICKY VIDEO PREVIEW
      ════════════════════════════════════════ */}
      <div
        className="vs-video-preview-wrap"
        style={{
          position: "absolute", top: 0, right: "2.75rem",
          width: "30vw", height: "100%",
          pointerEvents: "none", zIndex: 2,
        }}
      >
        <div style={{
          position:   "sticky",
          top:        "20vh",
          height:     "55vh",
          width:      "100%",
          overflow:   "hidden",
          opacity:    activeVideo ? 1 : 0,
          transform:  activeVideo ? "scale(1) translateY(0)" : "scale(0.96) translateY(15px)",
          transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          border:     "1px solid rgba(242,239,233,0.08)",
        }}>
          {SERVICES.map(svc => svc.videoUrl && (
            <video
              key={svc.index}
              src={svc.videoUrl}
              autoPlay loop muted playsInline
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%", objectFit: "cover",
                opacity:    activeVideo === svc.videoUrl ? 0.35 : 0,
                filter:     "grayscale(100%) contrast(110%)",
                transition: "opacity 0.5s ease-in-out",
              }}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          SECTION HEADER
      ════════════════════════════════════════ */}
      <div
        className="vs-section-header vs-reveal"
        data-delay="0"
        style={{
          padding:             "8rem 2.75rem 5rem",
          display:             "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap:                 "0 4rem",
          alignItems:          "flex-end",
          borderBottom:        "1px solid rgba(242,239,233,0.07)",
        }}
      >
        {/* Left */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ink-dim)" }}>02</span>
            <span style={{ display: "block", width: "2rem", height: "1px", background: "rgba(242,239,233,0.25)" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ink-dim)" }}>What We Do</span>
          </div>

          <div style={{ position: "relative" }}>
            {/* Ghost watermark */}
            <span style={{
              position: "absolute", top: "-2.5rem", left: "-0.5rem",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(6rem, 15vw, 15rem)",
              fontWeight: 900, fontStyle: "italic", lineHeight: 1,
              color: "rgba(242,239,233,0.025)", whiteSpace: "nowrap",
              pointerEvents: "none", userSelect: "none", letterSpacing: "-0.04em",
            }}>
              Work
            </span>
            <h2 style={{
              fontFamily:    "'Playfair Display', serif",
              fontSize:      "clamp(2.8rem, 5vw, 5.5rem)",
              fontWeight:    900,
              fontStyle:     "italic",
              lineHeight:    0.92,
              letterSpacing: "-0.025em",
              color:         "var(--ink)",
              margin:        0,
              position:      "relative",
              zIndex:        1,
            }}>
              Disciplines that<br />
              <em style={{ fontWeight: 400 }}>define markets.</em>
            </h2>
          </div>
        </div>

        {/* Right */}
        <div style={{ paddingBottom: "0.5rem" }}>
          <p style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "0.82rem",
            fontWeight:    300,
            lineHeight:    1.85,
            letterSpacing: "0.05em",
            color:         "var(--ink-mid)",
            maxWidth:      "420px",
            margin:        "0 0 2rem 0",
          }}>
            We operate at the intersection of spatial storytelling and commercial strategy. Every discipline we deploy is built around a single imperative: establishing visual authority so complete that your property occupies a category of one.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ display: "block", width: "2rem", height: "1px", background: "rgba(242,239,233,0.2)" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
              Five disciplines. One visual authority.
            </span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          SERVICE ROWS
      ════════════════════════════════════════ */}
      <div style={{ borderBottom: "1px solid rgba(242,239,233,0.07)", position: "relative", zIndex: 5 }}>
        {SERVICES.map((service, i) => {
          const isOdd = i % 2 !== 0;
          return (
            <div
              key={service.index}
              className={`vs-row vs-reveal ${isOdd ? "vs-grid-odd" : "vs-grid-even"}`}
              data-delay={i * 120}
              onMouseEnter={() => service.videoUrl && setActiveVideo(service.videoUrl)}
              onMouseLeave={() => setActiveVideo(null)}
              style={{
                display:             "grid",
                gridTemplateColumns: isOdd ? "5.5rem 1fr 2fr 1fr" : "5.5rem 2fr 1fr 1fr",
                gap:          "0",
                alignItems:   "baseline",
                padding:      "3.5rem 0",
                borderBottom: "1px solid rgba(242,239,233,0.04)",
                position:     "relative",
                cursor:       "pointer",
              }}
            >
              {/* Row hover wash */}
              <div style={{
                position:      "absolute", inset: 0,
                background:    "rgba(242,239,233,0.012)",
                opacity:       activeVideo && service.videoUrl === activeVideo ? 1 : 0,
                transition:    "opacity 0.4s ease",
                pointerEvents: "none",
                zIndex:        -1,
              }} />

              {/* Index */}
              <div style={{ paddingLeft: "2.75rem" }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.38em", textTransform: "uppercase", color: "var(--ink-dim)", lineHeight: 1 }}>
                  {service.index}
                </span>
              </div>

              {/* Title */}
              <div style={{ gridColumn: isOdd ? "2 / 4" : "2 / 3", paddingRight: "3rem" }}>
                <h2
                  className="vs-title"
                  style={{
                    fontFamily:    "'Playfair Display', serif",
                    fontSize:      "clamp(1.9rem, 3.4vw, 3.4rem)",
                    fontWeight:    900,
                    fontStyle:     "italic",
                    lineHeight:    0.95,
                    letterSpacing: "-0.02em",
                    color:         "var(--ink-mid)",
                    margin:        0,
                  }}
                >
                  {service.title}
                </h2>
              </div>

              {/* Description */}
              <div style={{ gridColumn: isOdd ? "4 / 5" : "3 / 5", paddingRight: "2.75rem", paddingLeft: isOdd ? "0" : "2rem" }}>
                <span style={{ display: "block", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.55rem", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-dim)", marginBottom: "0.85rem" }}>
                  {service.tag}
                </span>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", fontWeight: 300, lineHeight: 1.8, letterSpacing: "0.04em", color: "var(--ink-mid)", margin: "0 0 1rem 0", maxWidth: "340px" }}>
                  {service.desc}
                </p>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.52rem", fontWeight: 300, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
                  {service.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ════════════════════════════════════════
          CTA STRIP
      ════════════════════════════════════════ */}
      <div
        className="vs-reveal vs-cta-strip"
        data-delay="250"
        style={{
          padding:        "5rem 2.75rem",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          gap:            "2rem",
        }}
      >
        <div style={{ maxWidth: "480px" }}>
          <p style={{
            fontFamily:    "'Playfair Display', serif",
            fontSize:      "clamp(1.2rem, 2.2vw, 1.85rem)",
            fontWeight:    400,
            fontStyle:     "italic",
            lineHeight:    1.35,
            letterSpacing: "-0.01em",
            color:         "var(--ink)",
            margin:        "0 0 1.25rem 0",
          }}>
            Every retained custodianship begins with a single conversation about your property\u2019s legacy.
          </p>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.6rem", fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
            Heritage properties \u00b7 Boutique reserves \u00b7 Emergent travel concepts
          </span>
        </div>

        <button
          className="vs-cta-button"
          style={{
            fontFamily:    "'Barlow Condensed', sans-serif",
            fontSize:      "0.6rem",
            fontWeight:    400,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color:         "var(--bg)",
            background:    "var(--ink)",
            border:        "none",
            padding:       "1rem 2.5rem",
            cursor:        "pointer",
            flexShrink:    0,
            transition:    "opacity 0.25s ease",
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
        >
          Start a Conversation
        </button>
      </div>

      {/* ════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════ */}
      <div
        className="vs-footer"
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          padding:        "1.5rem 2.75rem",
          borderTop:      "1px solid rgba(242,239,233,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          {[false, true, false, false, false].map((active, i) => (
            <span key={i} style={{
              display:    "block",
              width:      active ? "1.4rem" : "0.35rem",
              height:     "1px",
              background: active ? "var(--ink)" : "rgba(242,239,233,0.2)",
              transition: "width 0.3s ease",
            }} />
          ))}
        </div>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.52rem", fontWeight: 300, letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(242,239,233,0.22)" }}>
          02 / 05 {"\u2014"} Services
        </span>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT EXPORT — combined scrolling experience
// ─────────────────────────────────────────────────────────────────────────────
export default function CombinedWebsitePreview() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <main style={{ background: "var(--bg)", minHeight: "100dvh" }}>
        <HeroSection />
        <ServicesSection />
      </main>
    </>
  );
}
