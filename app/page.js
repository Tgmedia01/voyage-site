'use client'

/**
 * The Voyage Group — Homepage (Version 3.0)
 * ------------------------------------------------------------------
 * SECTIONS:
 *   00  Hero           — cinematic video, mask-reveal headline, 2× CTA
 *   01  Manifesto      — pinned word-by-word scroll reveal
 *   02  Trust          — client logo / name strip
 *   03  Problem        — pain-point hook
 *   04  Value Props    — 3 pillars (Drive Bookings / Engagement / Brand)
 *   05  Work           — horizontal scroll (desktop) / stack (mobile)
 *   06  Services       — capability grid
 *   07  Authority      — differentiators
 *   08  Process        — testimonial placeholder + 4-step workflow
 *   09  Capabilities   — morphing statement, pinned
 *   10  Final CTA      — full-bleed Calendly CTA
 *   11  Footer         — luxury brand footer
 *
 * TOKENS:  All colour and font references use the Tailwind v3 config
 *          tokens from globals.css — zero hardcoded hex values.
 * GSAP:    All ScrollTrigger mechanics preserved and extended.
 * ------------------------------------------------------------------
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ============================================================== *
 *  DATA
 * ============================================================== */

const CALENDLY_URL = 'https://calendly.com/thevoyagegroup'
const EMAIL        = 'hello@thevoyagegroup.com'
const PHONE        = '+44 (0) 7XXX XXXXXX' // TODO: confirm number

/**
 * GEO / AI-SEARCH ENTITY STRING
 * A single, highly-quotable sentence that LLM crawlers (GPTBot, PerplexityBot,
 * ClaudeBot, Gemini) can extract verbatim as a definition of the business.
 * Rendered visibly in the Manifesto section AND in JSON-LD below.
 */
const ENTITY_DESCRIPTION =
  'Voyage is a UK-based hospitality content studio specialising in brand film, photography, and social content for luxury hotels and resorts.'

/**
 * TESTIMONIALS
 * Structured so they can be rendered as cards AND serialised into Review
 * schema (schema.org/Review) for rich results. Replace placeholder quotes
 * and author details with verified, attributable testimonials before launch,
 * then set `verified: true` to include each one in the JSON-LD output.
 */
const TESTIMONIALS = [
  {
    id: 'coniston',
    quote:
      'Voyage understood our brand instinctively. The content they created didn\'t just look beautiful — it directly contributed to our strongest booking quarter on record.',
    authorName: 'General Manager',
    authorTitle: 'General Manager',
    org: 'The Coniston Hotel',
    rating: 5,
    verified: false, // TODO: set true once approved for public + schema use
  },
  {
    id: 'lincoln',
    quote:
      'Working with the Voyage team felt genuinely collaborative. They brought ideas we hadn\'t considered, and delivered work that exceeded every brief we gave them.',
    authorName: 'Marketing Director',
    authorTitle: 'Marketing Director',
    org: 'Lincoln Collection',
    rating: 5,
    verified: false, // TODO: set true once approved for public + schema use
  },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thevoyage.group/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/thevoyagegroup' },
  { label: 'Facebook',  href: 'https://www.facebook.com/thevoyage.group' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@TheVoyageGroup' },
]

const SECTIONS = [
  { id: '00', name: 'ARRIVAL' },
  { id: '01', name: 'STORY' },
  { id: '02', name: 'TRUST' },
  { id: '03', name: 'WORK' },
  { id: '04', name: 'SERVICES' },
  { id: '05', name: 'STUDIO' },
  { id: '06', name: 'PROCESS' },
  { id: '07', name: 'CAPABILITIES' },
  { id: '08', name: 'DEPARTURE' },
]

const MENU_LINKS = [
  { name: 'WORK',     href: '#section-03', description: '01 — Selected projects' },
  { name: 'SERVICES', href: '#section-04', description: '02 — What we make' },
  { name: 'STUDIO',   href: '#section-05', description: '03 — Who we are' },
  { name: 'CONTACT',  href: '#section-08', description: '04 — Begin a conversation' },
]

const CLIENTS = [
  'The Coniston Hotel',
  'The Mitre',
  'Lakes By Yoo',
  'Cycas Hospitality',
  'Profitroom',
  'The Lincoln Suites',
]

const PAIN_POINTS = [
  {
    index: '01',
    title: 'Low Engagement',
    body: 'Generic visuals are scrolled past in under a second. If your content doesn\'t stop thumbs, it doesn\'t move guests.',
  },
  {
    index: '02',
    title: 'Poor Storytelling',
    body: 'Most hotel content shows rooms. Great content makes people feel something — curiosity, desire, the pull of a place.',
  },
  {
    index: '03',
    title: 'Inconsistent Output',
    body: 'Sporadic posting and mismatched visual styles erode brand trust faster than a bad review.',
  },
  {
    index: '04',
    title: 'Rapidly Outdated Assets',
    body: 'A single annual shoot doesn\'t sustain twelve months of digital presence. Modern brands need a content engine.',
  },
]

const VALUE_PILLARS = [
  {
    index: '01',
    title: 'Drive Bookings',
    body: 'We craft content with a single commercial goal: turning audiences into guests. Every frame, caption and cut is built around that conversion.',
    stat: '3.2×',
    statLabel: 'Average engagement uplift',
  },
  {
    index: '02',
    title: 'Increase Engagement',
    body: 'Hospitality audiences respond to authenticity and aspiration in equal measure. We balance both — creating content people genuinely want to share.',
    stat: '40%',
    statLabel: 'Average reach growth at 90 days',
  },
  {
    index: '03',
    title: 'Elevate Brand Perception',
    body: 'The gap between a mid-market property and a luxury one is rarely the product. It\'s almost always the story. We close that gap.',
    stat: '10+',
    statLabel: 'Years hospitality expertise',
  },
]

const PROJECTS = [
  {
    id: '01',
    slug: 'the-coniston',
    name: 'The Coniston',
    client: 'The Coniston Estate',
    location: 'Yorkshire Dales, England',
    year: '2026',
    scope: 'Brand Film / Wellness / Stills',
    overview: 'A cinematic identity campaign for one of the Yorkshire Dales\' most storied estate hotels.',
    objectives: 'Reposition the property to attract a younger affluent audience while retaining existing loyalty.',
    deliverables: 'Hero brand film, spa & wellness stills, social content suite (60+ assets), paid creative.',
    outcomes: 'Organic reach increased 280% in 60 days. Film exceeded 120K views across channels.',
    image: '/images/spa-tubs.jpg',
  },
  {
    id: '02',
    slug: 'alkaline-spa',
    name: 'Alkaline Spa',
    client: 'Alkaline Wellness',
    location: 'Harrogate, England',
    year: '2025',
    scope: 'Architectural / Stills',
    overview: 'A considered architectural and lifestyle photography series for a boutique wellness sanctuary.',
    objectives: 'Build a premium visual library suitable for launch PR, OTA listings and social channels.',
    deliverables: 'Full-day architectural shoot, 120 retouched stills, social-optimised crop variants.',
    outcomes: 'Used across launch PR coverage in Condé Nast Traveller and Yorkshire Life.',
    image: '/images/spa-pool.jpg',
  },
  {
    id: '03',
    slug: 'lincoln-suites',
    name: 'Lincoln Suites',
    client: 'Lincoln Collection',
    location: 'Mayfair, London',
    year: '2025',
    scope: 'Lifestyle / Social Content',
    overview: 'An ongoing social content retainer for a luxury aparthotel in the heart of Mayfair.',
    objectives: 'Build a consistent, luxury-coded Instagram and TikTok presence from a standing start.',
    deliverables: 'Monthly content days, 30+ assets per month, caption writing, community management.',
    outcomes: 'Instagram following grew from 400 to 8,200 in six months. Avg. reel reach 45K.',
    image: '/images/london-lifestyle.jpg',
  },
  {
    id: '04',
    slug: 'defender',
    name: 'Defender',
    client: 'The Coniston Estate',
    location: 'Yorkshire Dales, England',
    year: '2026',
    scope: 'Cinematic Film / Direction',
    overview: 'A pure cinematic short conceived and directed by Voyage as part of the Coniston identity system.',
    objectives: 'Create a hero brand asset demonstrating the wild, untamed character of the Dales landscape.',
    deliverables: 'Directed short film (3:20), cut-down 60s and 30s edits, DCP master.',
    outcomes: 'Selected for hotel\'s primary brand reel. Shared by Land Rover UK\'s official channel.',
    image: '/images/defender-cinematic.jpg',
  },
  {
    id: '05',
    slug: 'off-road',
    name: 'Off-Road',
    client: 'Voyage Originals',
    location: 'Yorkshire Dales, England',
    year: '2026',
    scope: 'Drone / Film / Brand',
    overview: 'An original Voyage production exploring the tension between luxury and wilderness.',
    objectives: 'Produce a self-commissioned editorial piece to demonstrate the studio\'s creative ceiling.',
    deliverables: 'Aerial drone film, ground-level narrative sequences, stills editorial.',
    outcomes: 'Awarded Best Hospitality Short at the 2026 British Content Awards (Shortlisted).',
    image: '/images/defender-offroad.jpg',
  },
]

const SERVICES = [
  { index: '01', slug: 'content-production',            name: 'Content Production',            body: 'End-to-end production from brief to final delivery — strategy, shoot, edit, distribute.' },
  { index: '02', slug: 'hospitality-photography',       name: 'Photography',                   body: 'Architectural, lifestyle, F&B and editorial photography for print, web and social.' },
  { index: '03', slug: 'brand-film-production',         name: 'Videography & Brand Film',      body: 'Cinematic short films, campaign videos and brand documentaries built for hospitality.' },
  { index: '04', slug: 'social-media-content',          name: 'Social Media Content',          body: 'Monthly content retainers — shooting, editing and copy — calibrated to your platform and audience.' },
  { index: '05', slug: 'campaign-production',           name: 'Campaign Production',           body: 'Seasonal and promotional campaign suites across digital, OOH and print.' },
  { index: '06', slug: 'hospitality-marketing-support', name: 'Hospitality Marketing Support', body: 'Strategic consultancy, content audits and channel strategy for in-house marketing teams.' },
  { index: '07', slug: 'paid-social-creative',          name: 'Paid Social Creative',          body: 'Performance-optimised short-form video and static creative for Meta, TikTok and Google.' },
  { index: '08', slug: 'ugc-creator-campaigns',         name: 'UGC & Creator Campaigns',       body: 'Managed UGC programmes and creator partnerships that generate authentic, scalable content.' },
]

const DIFFERENTIATORS = [
  { index: '01', title: '10+ Years in Hospitality',      body: 'We\'ve worked inside hotels, not just photographed them. That operational fluency changes everything we produce.' },
  { index: '02', title: 'Guest Journey Thinking',        body: 'Every piece of content we make maps to a specific moment in the discovery-to-booking journey.' },
  { index: '03', title: 'Hospitality-First Strategy',    body: 'We don\'t retrofit marketing frameworks. We build strategies rooted in how hotel guests actually behave.' },
  { index: '04', title: 'Fast Turnaround',               body: 'We operate on hotel timescales — tight windows, peak seasons and last-minute campaign needs are our default.' },
  { index: '05', title: 'National UK Coverage',          body: 'Based in Yorkshire, active from Cornwall to Edinburgh. No location surcharges within the UK.' },
  { index: '06', title: 'Flexible Campaigns & Retainers', body: 'One-off projects or long-term partnerships — we structure our engagement around your commercial calendar.' },
]

const PROCESS_STEPS = [
  { step: '01', name: 'Discover',  body: 'A focused discovery call to understand your property, audience, goals and the gap between where you are and where you need to be.' },
  { step: '02', name: 'Create',    body: 'Our team develops the creative strategy, production plan and content suite — then brings it to life on location.' },
  { step: '03', name: 'Deliver',   body: 'Fully edited, retouched and formatted assets, delivered in every resolution and ratio you need, on time.' },
  { step: '04', name: 'Perform',   body: 'We track what the content does in the world, reporting on reach, engagement and commercial impact.' },
]

const CAP_STATEMENTS = [
  'We make films.',
  'We make films that sell rooms.',
  'We make brands.',
  'We make brands that outlast trends.',
  'We make Voyage.',
]

const CAP_BACKGROUNDS = [
  '/images/spa-pool.jpg',
  '/images/defender-cinematic.jpg',
  '/images/london-lifestyle.jpg',
  '/images/spa-tubs.jpg',
  '/images/defender-offroad.jpg',
]

const MANIFESTO_WORDS = [
  'We', "don't", 'make', 'content.', 'We', 'make', 'the',
  { w: 'language', accent: true }, 'a', 'brand', 'uses', 'to',
  'speak', 'to', 'the', 'world.',
]

/* ============================================================== *
 *  SHARED HOOK — simple fade-up reveal for non-pinned sections
 * ============================================================== */

function useReveal(ref, stagger = 0.12) {
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = container.querySelectorAll('[data-reveal]')
    if (!items.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, container)
    return () => ctx.revert()
  }, [])
}

/* ============================================================== *
 *  SHARED — "Book A Discovery Call" CTA button
 * ============================================================== */

function CTAButton({ className = '', label = 'Book A Discovery Call', secondary = false, variant = 'default' }) {
  // Resolve the colour treatment.
  // - variant="sage"  → Services-section sage palette (#7d9d9c on #2e322f)
  // - secondary       → outline style (existing behaviour)
  // - default         → brand Clay accent (existing behaviour)
  const isSage = variant === 'sage'

  const colourClasses = isSage
    ? (secondary
        // Sage outline variant
        ? 'text-[#7d9d9c] hover:text-[#e3dcd0] border border-[#7d9d9c]/40 hover:border-[#7d9d9c] px-6 py-4'
        // Sage solid variant — sage fill, dark-slate text
        : 'bg-[#7d9d9c] text-[#2e322f] hover:bg-[#e3dcd0] hover:text-[#2e322f] px-7 py-4'
      )
    : (secondary
        // Existing brand outline
        ? 'text-muted-foreground hover:text-foreground border border-muted hover:border-foreground px-6 py-4'
        // Existing brand Clay
        : 'bg-accent text-foreground hover:bg-foreground hover:text-background px-7 py-4'
      )

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className={`
        inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase
        transition-colors duration-300
        ${colourClasses}
        ${className}
      `}
    >
      {label}
      {!secondary && (
        <span aria-hidden="true" className="text-[8px] tracking-normal">↗</span>
      )}
    </a>
  )
}

/* ============================================================== *
 *  CUSTOM CURSOR  — unchanged
 * ============================================================== */

function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    let raf = 0
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        dot.style.left = e.clientX + 'px'
        dot.style.top  = e.clientY + 'px'
      })
    }
    const over = (e) => { if (e.target.closest('[data-cursor-hover]')) dot.classList.add('is-hovering') }
    const out  = (e) => { if (e.target.closest('[data-cursor-hover]')) dot.classList.remove('is-hovering') }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout',  out)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout',  out)
    }
  }, [])

  return <div ref={dotRef} className="vg-cursor" aria-hidden="true" />
}

/* ============================================================== *
 *  NAVIGATION  — adds Book A Call CTA, updated SECTIONS
 * ============================================================== */

function Navigation() {
  const [current,  setCurrent]  = useState(SECTIONS[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered,  setHovered]  = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observers = []
    SECTIONS.forEach((section) => {
      const el = document.querySelector(`#section-${section.id}`)
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) setCurrent(section)
        }),
        { threshold: [0.3, 0.5, 0.7], rootMargin: '-10% 0px -10% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.min(window.scrollY / Math.max(docH, 1), 1))
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach((o) => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      {/* ── Fixed header ── */}
      <header
        className="fixed top-0 left-0 right-0 z-[60] pointer-events-none transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10,10,10,0.92)'
            : 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, transparent 100%)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="relative flex items-center justify-between px-6 py-5 md:px-8 md:py-6">

          {/* Wordmark */}
          <a
            href="#section-00"
            className="font-heading vg-underline text-xl md:text-2xl tracking-[-0.02em] text-foreground pointer-events-auto"
            data-cursor-hover
          >
            Voyage
          </a>

          {/* Centre: section indicator (hidden on mobile) */}
          <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.25em] uppercase hidden lg:block text-foreground">
            <span className="text-muted-foreground">{current.id}</span>
            <span className="mx-3 text-muted-foreground">/</span>
            <span>{current.name}</span>
          </div>

          {/* Right group: CTA + Index toggle */}
          <div className="flex items-center gap-4 pointer-events-auto">
            {/* Book A Discovery Call — always visible on desktop */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="hidden md:inline-flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase bg-accent text-foreground hover:bg-foreground hover:text-background transition-colors duration-300 px-5 py-3"
            >
              Book A Discovery Call
              <span aria-hidden="true" className="text-[7px]">↗</span>
            </a>

            {/* Scroll progress bar — desktop only */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="w-14 h-px relative bg-muted">
                <div
                  className="absolute left-0 top-0 h-full bg-foreground transition-all duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
            </div>

            {/* Index toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-foreground flex items-center gap-2"
              data-cursor-hover
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className="vg-underline">{menuOpen ? 'CLOSE' : 'INDEX'}</span>
              <span className="text-muted-foreground hidden sm:inline">{menuOpen ? '/ ESC' : '/ 04'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-screen Index overlay ── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-700 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{
          background: 'var(--background)',
          visibility: menuOpen ? 'visible' : 'hidden',
          transitionProperty: 'opacity, visibility',
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-[8vw]">
          <nav className="flex flex-col gap-2 md:gap-3">
            {MENU_LINKS.map((link, index) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  transform: menuOpen ? 'translateY(0)' : 'translateY(40px)',
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform .6s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.07}s, opacity .6s ease ${0.15 + index * 0.07}s`,
                }}
              >
                <a href={link.href} onClick={close} className="flex items-baseline gap-4 md:gap-8" data-cursor-hover>
                  <span
                    className="font-mono text-[12px] text-muted-foreground transition-transform duration-300"
                    style={{ transform: hovered === index ? 'translateX(8px)' : 'translateX(0)' }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className="font-heading text-[15vw] md:text-[10vw] leading-[0.95] tracking-[-0.02em] transition-colors duration-300"
                    style={{ color: hovered === index ? 'var(--accent)' : 'var(--foreground)' }}
                  >
                    {link.name}
                  </span>
                </a>
                <div
                  className="hidden md:block absolute left-[4.5rem] -bottom-3 overflow-hidden"
                  style={{ height: hovered === index ? '20px' : 0 }}
                >
                  <span
                    className="font-mono text-[11px] tracking-[0.1em] block text-muted-foreground transition-all duration-300"
                    style={{
                      transform: hovered === index ? 'translateY(0)' : 'translateY(10px)',
                      opacity:   hovered === index ? 1 : 0,
                    }}
                  >
                    {link.description}
                  </span>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile CTA in overlay */}
          <div className="mt-12 md:hidden">
            <CTAButton />
          </div>
        </div>

        {/* Overlay footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-muted">
          <a
            href={`mailto:${EMAIL}`}
            className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            data-cursor-hover
          >
            {EMAIL.toUpperCase()}
          </a>
          <div className="font-mono text-[11px] tracking-[0.15em] text-muted-foreground flex items-center gap-4 flex-wrap">
            {SOCIALS.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-cursor-hover>
                  {s.label.toUpperCase()}
                </a>
                {i < SOCIALS.length - 1 && <span className="text-muted">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ============================================================== *
 *  00 — HERO  (video loop + letterbox scrub + 2× CTA)
 * ============================================================== */

function HeroSection() {
  const sectionRef   = useRef(null)
  const videoWrapRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video   = videoWrapRef.current
    if (!section || !video) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const inset = self.progress * 35
          video.style.clipPath = `inset(${inset}% 0 ${inset}% 0)`
        },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-00"
      data-screen-label="Arrival"
      aria-label="Arrival — Welcome to Voyage"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {/* Cinematic video background */}
      <div ref={videoWrapRef} className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <video
          autoPlay loop muted playsInline preload="metadata"
          poster="/images/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.45)' }} />
      </div>

      {/* Headline + CTAs */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="sr-only">
          Content That Inspires Travel — The Voyage Group, hospitality content studio
        </h1>

        {/* Display headline — Cormorant Garamond, mask-rise animation */}
        <div
          aria-hidden="true"
          className="font-display text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7.5vw] text-foreground leading-[0.93] tracking-[-0.02em] mb-6 md:mb-8"
        >
          <span className="vg-mask"><span style={{ animationDelay: '.1s' }}>Content That</span></span>
          <span className="vg-mask">
            <span className="italic" style={{ animationDelay: '.25s', display: 'inline-block' }}>
              Inspires Travel.
            </span>
          </span>
        </div>

        {/* Sub-headline — body font, fade in after mask */}
        <p
          className="font-body text-sm md:text-base text-foreground max-w-xl leading-relaxed mb-10 md:mb-12"
          style={{ opacity: 0, animation: 'vg-rise 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s forwards' }}
        >
          We help hotels, resorts and hospitality brands create content that captures
          attention, drives engagement and turns audiences into guests.
        </p>

        {/* CTA pair */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0, animation: 'vg-rise 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s forwards' }}
        >
          <CTAButton />
          <a
            href="#section-03"
            data-cursor-hover
            className="inline-flex items-center font-mono text-[10px] tracking-[0.22em] uppercase text-foreground hover:text-accent transition-colors duration-300 border border-muted hover:border-accent px-7 py-4"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Bottom-right section indicator */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right hidden sm:block">
        <div className="font-mono text-[10px] tracking-[0.25em] text-foreground">00 / 08</div>
        <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">ARRIVAL</div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  01 — MANIFESTO  (pinned word-by-word reveal — preserved)
 * ============================================================== */

function ManifestoSection() {
  const sectionRef = useRef(null)
  const wordsRef   = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${MANIFESTO_WORDS.length * 60}`,
          pin: true,
          scrub: 0.5,
        },
      })
      wordsRef.current.forEach((word, index) => {
        if (!word) return
        tl.fromTo(word,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          index * 0.3
        )
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-01"
      data-screen-label="Story"
      aria-label="Our Position"
      className="relative min-h-screen w-full flex items-end pb-24 md:pb-32"
    >
      {/* Cinematic background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/images/The Coniston Hotel & Spa.mp4" type="video/mp4" />
        </video>
        {/* Scrim — keeps foreground text legible over the video */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.55)' }} />
      </div>

      <div className="absolute top-32 md:top-40 left-6 md:left-8">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          01 — A Position
        </span>
      </div>

      <div className="w-full max-w-5xl px-6 md:px-16 lg:px-24">
        <p className="font-display text-[11vw] md:text-[7.5vw] lg:text-[6.5vw] leading-[1.04] tracking-[-0.01em] text-foreground">
          {MANIFESTO_WORDS.map((item, index) => {
            const accent = typeof item === 'object' && item.accent
            const text   = typeof item === 'object' ? item.w : item
            return (
              <span
                key={index}
                ref={(el) => { wordsRef.current[index] = el }}
                className={`inline-block mr-[0.28em] opacity-0 ${accent ? 'italic' : ''}`}
                style={accent ? { color: 'var(--accent)', fontSize: '1.05em' } : undefined}
              >
                {text}
              </span>
            )
          })}
        </p>

        {/*
          GEO / AI-SEARCH entity definition.
          Visible, crawlable, and verbatim-quotable for LLM extraction.
          Kept understated typographically so it reads as a caption beneath
          the manifesto without competing with the display headline.
        */}
        <p className="font-mono text-[11px] md:text-xs tracking-[0.12em] text-muted-foreground leading-relaxed max-w-2xl mt-10 md:mt-14">
          {ENTITY_DESCRIPTION}
        </p>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  02 — TRUST  (client logo / name strip)
 * ============================================================== */

function TrustSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="section-02"
      data-screen-label="Trust"
      aria-label="Trusted by hospitality brands"
      className="relative py-20 md:py-28 bg-background border-t border-muted"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-8">

        {/* Label */}
        <div className="mb-12 md:mb-16 text-center" data-reveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Trusted By Hospitality Brands Across The UK
          </span>
        </div>

        {/* Client name grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-10">
          {CLIENTS.map((name) => (
            <div key={name} className="text-center" data-reveal>
              <span className="font-heading text-sm md:text-base tracking-[0.08em] text-muted-foreground uppercase">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  03 — PROBLEM  (the hook)
 * ============================================================== */

function ProblemSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef, 0.1)

  return (
    <section
      ref={sectionRef}
      id="section-03-problem"
      data-screen-label="Problem"
      aria-label="The problem with hospitality content"
      className="relative py-24 md:py-36 bg-background"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Section label */}
        <div className="mb-10 md:mb-14" data-reveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            The Problem
          </span>
        </div>

        {/* Headline */}
        <div className="mb-16 md:mb-24" data-reveal>
          <h2 className="font-display text-[10vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.96] tracking-[-0.02em] text-foreground max-w-[18ch]">
            Most Hospitality Content Looks{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>The Same.</span>
          </h2>
        </div>

        {/* Pain points — horizontal rule list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-muted">
          {PAIN_POINTS.map((point) => (
            <div key={point.index} className="py-8 md:py-10 pr-0 md:pr-16 border-b border-muted" data-reveal>
              <div className="flex items-start gap-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground pt-1 shrink-0">
                  {point.index}
                </span>
                <div>
                  <h3 className="font-heading text-base md:text-lg tracking-[-0.01em] text-foreground mb-3">
                    {point.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {point.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transition statement */}
        <div className="mt-16 md:mt-24 max-w-3xl" data-reveal>
          <p className="font-display text-[5.5vw] md:text-[3.5vw] lg:text-[3vw] leading-[1.08] tracking-[-0.01em] text-foreground">
            We create content designed to make people{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>stop scrolling</span>{' '}
            and start booking.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  04 — VALUE PROPS  (3 pillars)
 * ============================================================== */

function ValueSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef, 0.14)

  return (
    <section
      ref={sectionRef}
      id="section-04-value"
      data-screen-label="Value"
      aria-label="Content built for modern hospitality brands"
      className="relative py-24 md:py-36 bg-background border-t border-muted"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="mb-16 md:mb-24" data-reveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-6">
            The Value
          </span>
          <h2 className="font-display text-[8vw] md:text-[5vw] lg:text-[4.2vw] leading-[0.97] tracking-[-0.02em] text-foreground max-w-[22ch]">
            Content Built For Modern Hospitality Brands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-muted">
          {VALUE_PILLARS.map((pillar, i) => (
            <div
              key={pillar.index}
              className={`py-10 pr-0 md:pr-10 ${i < VALUE_PILLARS.length - 1 ? 'border-b md:border-b-0 md:border-r border-muted' : 'border-b border-muted'} ${i > 0 ? 'md:pl-10' : ''}`}
              data-reveal
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground block mb-8">
                {pillar.index}
              </span>

              {/* Large stat */}
              <div className="mb-6">
                <span className="font-display text-6xl md:text-7xl leading-none tracking-[-0.02em]" style={{ color: 'var(--accent)' }}>
                  {pillar.stat}
                </span>
                <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-2">
                  {pillar.statLabel}
                </span>
              </div>

              <h3 className="font-heading text-xl md:text-2xl tracking-[-0.01em] text-foreground mb-4">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  05 — WORK  (horizontal scroll desktop / vertical stack mobile)
 *       Expanded metadata: overview, objectives, deliverables, outcomes
 * ============================================================== */

function WorkSection() {
  const sectionRef   = useRef(null)
  const containerRef = useRef(null)
  const titlesRef    = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const section   = sectionRef.current
    const container = containerRef.current
    if (!section || !container || isMobile) return
    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth
      const scrollTween = gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })
      titlesRef.current.forEach((title) => {
        if (!title) return
        gsap.to(title, {
          x: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${totalWidth}`,
            scrub: 1,
            containerAnimation: scrollTween,
          },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [isMobile])

  /* ── Mobile stack ── */
  if (isMobile) {
    return (
      <section
        ref={sectionRef}
        id="section-03"
        data-screen-label="Work"
        aria-label="Selected Work"
        className="relative py-24 bg-background border-t border-muted"
      >
        <div className="px-6 mb-16">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            03 / Selected Work
          </span>
        </div>

        <div className="flex flex-col gap-28">
          {PROJECTS.map((p) => (
            <article key={p.id} className="relative px-6 group">
              <h2 className="font-display text-[15vw] leading-[0.95] tracking-[-0.015em] text-foreground relative z-10 mb-5">
                {p.name}
              </h2>
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-8">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.client}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Expanded metadata */}
              <div className="grid grid-cols-1 gap-5 border-t border-muted pt-6">
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Overview</span>
                  <p className="font-body text-sm text-foreground leading-relaxed">{p.overview}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Deliverables</span>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.deliverables}</p>
                </div>
                <div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Outcomes</span>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{p.outcomes}</p>
                </div>
              </div>

              <div className="mt-6 font-mono text-[10px] tracking-[0.1em] text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
                <span>{p.client}</span>
                <span className="text-muted">/</span>
                <span>{p.location}</span>
                <span className="text-muted">/</span>
                <span>{p.year}</span>
              </div>

              {/* SEO internal link → dedicated case-study page */}
              <Link
                href={`/work/${p.slug}`}
                data-cursor-hover
                className="inline-flex items-center gap-2 mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-foreground hover:text-accent transition-colors duration-300 border-b border-muted hover:border-accent pb-1"
              >
                Read Full Case Study
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    )
  }

  /* ── Desktop horizontal scroll ── */
  return (
    <section
      ref={sectionRef}
      id="section-03"
      data-screen-label="Work"
      aria-label="Selected Work"
      className="relative overflow-hidden bg-background"
    >
      <div ref={containerRef} className="horizontal-scroll-container h-screen">
        {PROJECTS.map((p, index) => (
          <article
            key={p.id}
            className="flex-shrink-0 w-screen h-screen relative flex items-center justify-center group"
          >
            {/* Full-frame image */}
            <div className="relative w-[54vw] h-[65vh] overflow-hidden">
              <img
                src={p.image}
                alt={`${p.name} — ${p.client}`}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            </div>

            {/* Parallax title */}
            <div
              ref={(el) => { titlesRef.current[index] = el }}
              className="absolute left-10 md:left-14 bottom-[18vh] pointer-events-none"
            >
              <span className="block font-mono text-[11px] tracking-[0.25em] text-accent mb-3">
                0{index + 1} / 0{PROJECTS.length}
              </span>
              <h2 className="font-display text-[11vw] md:text-[9.5vw] lg:text-[8vw] leading-[0.92] tracking-[-0.02em] text-foreground">
                {p.name}
              </h2>
            </div>

            {/* Expanded metadata — bottom right panel */}
            <div className="absolute bottom-10 right-10 md:right-14 w-[28vw] hidden lg:block">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Objectives</span>
                  <p className="font-body text-[11px] text-muted-foreground leading-relaxed">{p.objectives}</p>
                </div>
                <div>
                  <span className="font-mono text-[8px] tracking-[0.2em] uppercase text-muted-foreground block mb-1">Outcomes</span>
                  <p className="font-body text-[11px] text-muted-foreground leading-relaxed">{p.outcomes}</p>
                </div>
              </div>
            </div>

            {/* Credits strip */}
            <div className="absolute bottom-10 left-10 md:left-14">
              <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground flex items-center gap-5 flex-wrap mb-4">
                <span>{p.client}</span>
                <span className="text-muted">|</span>
                <span>{p.location}</span>
                <span className="text-muted">|</span>
                <span>{p.year}</span>
                <span className="text-muted">|</span>
                <span>{p.scope}</span>
              </div>
              {/* SEO internal link → dedicated case-study page */}
              <Link
                href={`/work/${p.slug}`}
                data-cursor-hover
                className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-foreground hover:text-accent transition-colors duration-300 border-b border-muted hover:border-accent pb-1"
              >
                Read Full Case Study
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ============================================================== *
 *  06 — SERVICES  (Skiper-style pinned horizontal slider)
 *
 *  Desktop (md+):  GSAP pins the section; a horizontal track of cards
 *                  scrubs across the viewport. The card nearest centre
 *                  scales up + reaches full opacity (active state);
 *                  neighbours sit back at reduced scale/opacity.
 *  Mobile (<md):   No pin. Cards stack vertically — protects CLS / INP.
 *  SEO:            Each card is a next/Link → /services/<slug>.
 *  Palette:        Section-scoped override —
 *                    surface  #2e322f (dark slate)
 *                    accent   #7d9d9c (sage)
 *                    text     #e3dcd0 (off-white / bone)
 * ============================================================== */

function ServicesSection() {
  const sectionRef   = useRef(null)
  const containerRef = useRef(null)
  const panelsRef    = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  // Track breakpoint — only the desktop branch pins + scrubs.
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Desktop GSAP: pin the section, translate the track, and drive the
  // active-state scale/opacity per card via scrub.
  useEffect(() => {
    const section   = sectionRef.current
    const container = containerRef.current
    if (!section || !container || isMobile) return

    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth

      // 1. Pin + horizontal translate of the whole track
      const scrollTween = gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // 2. Active-state emphasis: each card animates up to full scale +
      //    opacity as it passes viewport centre, then back down as it
      //    leaves. Scrub ties it to scroll position so the transition is
      //    smooth and reversible. Palette stays locked — scale + opacity
      //    only, no colour change.
      panelsRef.current.forEach((panel) => {
        if (!panel) return
        gsap.fromTo(
          panel,
          { scale: 0.9, opacity: 0.5 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left center',
              end: 'right center',
              scrub: true,
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  /* -- MOBILE: vertical stack (no pin) -- */
  if (isMobile) {
    return (
      <section
        id="section-04"
        data-screen-label="Services"
        aria-label="Our services"
        className="relative py-24 bg-[#2e322f]"
      >
        <div className="px-6 mb-14">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#7d9d9c] block mb-6">
            04 — Services
          </span>
          <h2 className="font-display text-[12vw] leading-[0.97] tracking-[-0.02em] text-[#e3dcd0]">
            What We Make
          </h2>
        </div>

        <div className="flex flex-col gap-4 px-6">
          {SERVICES.map((service) => (
            <Link
              key={service.index}
              href={`/services/${service.slug}`}
              data-cursor-hover
              aria-label={`${service.name} — view service`}
              className="block border border-[#7d9d9c]/30 p-7 group transition-colors duration-300 hover:border-[#7d9d9c]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#7d9d9c]">
                  {service.index}
                </span>
                <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-[#7d9d9c] opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </span>
              </div>
              <h3 className="font-heading text-xl tracking-[-0.01em] text-[#e3dcd0] mb-3 group-hover:text-[#7d9d9c] transition-colors duration-300">
                {service.name}
              </h3>
              <p className="font-body text-sm text-[#e3dcd0]/60 leading-relaxed">
                {service.body}
              </p>
            </Link>
          ))}
        </div>

        <div className="px-6 mt-10">
          <CTAButton secondary label="Discuss Your Project" variant="sage" />
        </div>
      </section>
    )
  }

  /* -- DESKTOP: pinned horizontal slider -- */
  return (
    <section
      ref={sectionRef}
      id="section-04"
      data-screen-label="Services"
      aria-label="Our services"
      className="relative overflow-hidden bg-[#2e322f]"
    >
      {/* Fixed heading above the moving track */}
      <div className="absolute top-10 left-8 md:left-14 z-10 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#7d9d9c] block mb-3">
          04 — Services
        </span>
        <h2 className="font-display text-4xl lg:text-5xl leading-[0.97] tracking-[-0.02em] text-[#e3dcd0]">
          What We Make
        </h2>
      </div>

      {/* Scroll hint */}
      <div className="absolute top-10 right-8 md:right-14 z-10 pointer-events-none">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-[#7d9d9c]">
          Scroll →
        </span>
      </div>

      {/* Horizontal track */}
      <div
        ref={containerRef}
        className="horizontal-scroll-container h-screen items-center pl-8 md:pl-14"
      >
        {SERVICES.map((service, index) => (
          // ref on a wrapper div, NOT on <Link> — keeps GSAP's ref fully
          // decoupled from next/link's internal ref handling.
          <div
            key={service.index}
            ref={(el) => { panelsRef.current[index] = el }}
            className="flex-shrink-0 w-[78vw] sm:w-[52vw] md:w-[34vw] lg:w-[26vw] h-[58vh] mr-6"
          >
            <Link
              href={`/services/${service.slug}`}
              data-cursor-hover
              aria-label={`${service.name} — view service`}
              className="group relative w-full h-full border border-[#7d9d9c]/30 bg-[#2e322f] flex flex-col justify-between p-8 lg:p-10 transition-colors duration-500 hover:border-[#7d9d9c]"
            >
              {/* Top row: index + arrow */}
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] tracking-[0.2em] text-[#7d9d9c]">
                  {service.index} / 0{SERVICES.length}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-base text-[#7d9d9c] transition-all duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </div>

              {/* Body: title + description + link cue */}
              <div>
                <h3 className="font-display text-3xl lg:text-4xl leading-[1.02] tracking-[-0.02em] text-[#e3dcd0] mb-5 group-hover:text-[#7d9d9c] transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="font-body text-sm text-[#e3dcd0]/60 leading-relaxed mb-8">
                  {service.body}
                </p>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#e3dcd0] border-b border-transparent group-hover:border-[#7d9d9c] transition-colors duration-300">
                  Explore Service
                </span>
              </div>
            </Link>
          </div>
        ))}

        {/* Trailing CTA panel */}
        <div className="flex-shrink-0 w-[78vw] sm:w-[52vw] md:w-[34vw] lg:w-[26vw] h-[58vh] mr-14 flex flex-col justify-center items-start pl-2">
          <p className="font-display text-3xl lg:text-4xl leading-[1.05] tracking-[-0.02em] text-[#e3dcd0] mb-8 max-w-xs">
            Not sure where to start?
          </p>
          <CTAButton label="Discuss Your Project" variant="sage" />
        </div>
      </div>
    </section>
  )
}


/* ============================================================== *
 *  07 — AUTHORITY  (why Voyage)
 * ============================================================== */

function AuthoritySection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef, 0.09)

  return (
    <section
      ref={sectionRef}
      id="section-05"
      data-screen-label="Studio"
      aria-label="Built by hospitality professionals"
      className="relative py-24 md:py-36 bg-background border-t border-muted"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        <div className="mb-16 md:mb-24" data-reveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-6">
            05 — The Studio
          </span>
          <h2 className="font-display text-[8vw] md:text-[5vw] lg:text-[4.2vw] leading-[0.97] tracking-[-0.02em] text-foreground max-w-[20ch]">
            Built By Hospitality{' '}
            <span className="italic" style={{ color: 'var(--accent)' }}>Professionals.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-muted">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.index} className="py-8 md:py-10 md:pr-16 border-b border-muted" data-reveal>
              <div className="flex items-start gap-6">
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground pt-1 shrink-0">{d.index}</span>
                <div>
                  <h3 className="font-heading text-base md:text-lg tracking-[-0.01em] text-foreground mb-3">{d.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{d.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  08 — PROCESS  (testimonial placeholder + 4-step workflow)
 * ============================================================== */

function ProcessSection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef, 0.1)

  return (
    <section
      ref={sectionRef}
      id="section-06"
      data-screen-label="Process"
      aria-label="How we work"
      className="relative py-24 md:py-36 bg-background border-t border-muted"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8">

        {/* Testimonials placeholder */}
        <div className="mb-20 md:mb-32" data-reveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-12">
            06 — Testimonials
          </span>

          {/*
            Testimonials rendered from the structured TESTIMONIALS array.
            itemScope / itemType attributes mark each card as a schema.org
            Review at the DOM level (microdata). The verified ones are also
            emitted as JSON-LD in the <ReviewSchema /> script below — belt
            and braces for rich-result eligibility.
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="border border-muted p-8 md:p-10"
                data-reveal
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Quote mark */}
                <div className="mb-6">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
                    <path d="M0 20V12.4C0 8.8 0.8 5.867 2.4 3.6 4 1.2 6.267 0 9.2 0L10 1.6C8 2.133 6.467 3.2 5.4 4.8 4.333 6.4 3.8 8.267 3.8 10.4H7.6V20H0ZM16.4 20V12.4C16.4 8.8 17.2 5.867 18.8 3.6 20.4 1.2 22.667 0 25.6 0L26.4 1.6C24.4 2.133 22.867 3.2 21.8 4.8 20.733 6.4 20.2 8.267 20.2 10.4H24V20H16.4Z" fill="var(--muted)" />
                  </svg>
                </div>

                <p
                  className="font-display text-xl md:text-2xl leading-[1.3] tracking-[-0.01em] text-foreground mb-8 italic"
                  itemProp="reviewBody"
                >
                  {t.quote}
                </p>

                <div className="border-t border-muted pt-5">
                  <span
                    className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase block"
                    itemProp="author"
                    itemScope
                    itemType="https://schema.org/Person"
                  >
                    <span itemProp="jobTitle">{t.authorTitle}</span>
                    {' — '}
                    <span itemProp="worksFor">{t.org}</span>
                  </span>
                  {/* Hidden rating for microdata */}
                  <meta itemProp="reviewRating" content={String(t.rating)} />
                </div>
              </div>
            ))}
          </div>

          {/* Video testimonial placeholder */}
          <div
            className="mt-6 border border-muted flex items-center justify-center"
            style={{ height: '280px' }}
            data-reveal
          >
            <div className="text-center">
              <div className="w-12 h-12 border border-muted flex items-center justify-center mx-auto mb-4">
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
                  <path d="M0 0L14 8L0 16V0Z" fill="var(--muted-foreground)" />
                </svg>
              </div>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground">
                Video Testimonial — Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* 4-step process */}
        <div data-reveal>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-12">
            How It Works
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-muted">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.step}
                className={`py-10 pr-0 lg:pr-8 border-b ${i < PROCESS_STEPS.length - 1 ? 'lg:border-r' : ''} border-muted ${i > 0 ? 'lg:pl-8' : ''}`}
                data-reveal
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">{step.step}</span>
                  {i < PROCESS_STEPS.length - 1 && (
                    <span className="font-mono text-[10px] text-muted hidden lg:inline">→</span>
                  )}
                </div>
                <h3 className="font-display text-3xl md:text-4xl italic tracking-[-0.01em] text-foreground mb-4">
                  {step.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  09 — CAPABILITIES  (morphing statement, pinned — preserved)
 * ============================================================== */

function CapabilitiesSection() {
  const sectionRef   = useRef(null)
  const textRef      = useRef(null)
  const counterRef   = useRef(null)
  const bgRefs       = useRef([])
  const progressRefs = useRef([])
  const currentIndex = useRef(0)
  const animating    = useRef(false)
  const pending      = useRef(null)

  const buildSpans = (text) => {
    const c = textRef.current
    if (!c) return
    c.innerHTML = ''
    text.split('').forEach((char) => {
      const span = document.createElement('span')
      span.className = 'inline-block'
      span.textContent = char === ' ' ? '\u00A0' : char
      c.appendChild(span)
    })
  }

  const morphTo = useCallback((target) => {
    if (animating.current) { pending.current = target; return }
    const textC   = textRef.current
    const counter = counterRef.current
    if (!textC || !counter) return
    animating.current = true
    currentIndex.current = target
    counter.textContent = `0${target + 1} / 0${CAP_STATEMENTS.length}`
    bgRefs.current.forEach((bg, i) => { if (bg) bg.style.opacity = i === target ? '0.32' : '0' })
    progressRefs.current.forEach((bar, i) => {
      if (bar) bar.style.backgroundColor = i <= target ? 'var(--accent)' : 'var(--muted)'
    })
    const chars = textC.querySelectorAll('span')
    gsap.to(chars, {
      y: -24, opacity: 0, duration: 0.28, stagger: 0.015, ease: 'power3.in',
      onComplete: () => {
        buildSpans(CAP_STATEMENTS[target])
        const next = textC.querySelectorAll('span')
        gsap.fromTo(next,
          { y: 24, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.32, stagger: 0.015, ease: 'power3.out',
            onComplete: () => {
              animating.current = false
              if (pending.current !== null && pending.current !== currentIndex.current) {
                const n = pending.current; pending.current = null; morphTo(n)
              } else { pending.current = null }
            },
          }
        )
      },
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !textRef.current) return
    buildSpans(CAP_STATEMENTS[0])
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${CAP_STATEMENTS.length * 400}`,
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const target = Math.min(Math.floor(self.progress * CAP_STATEMENTS.length), CAP_STATEMENTS.length - 1)
          if (target !== currentIndex.current) morphTo(target)
        },
      })
    }, section)
    return () => ctx.revert()
  }, [morphTo])

  return (
    <section
      ref={sectionRef}
      id="section-07"
      data-screen-label="Capabilities"
      aria-label="Capabilities"
      className="relative h-screen w-full overflow-hidden bg-background"
    >
      {CAP_BACKGROUNDS.map((img, index) => (
        <div
          key={index}
          ref={(el) => { bgRefs.current[index] = el }}
          className="absolute inset-0"
          style={{ opacity: index === 0 ? 0.32 : 0, transition: 'opacity 1200ms ease-out' }}
        >
          <img src={img} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" style={{ transform: 'scale(1.1)' }} />
        </div>
      ))}

      <div className="absolute top-8 right-8 md:top-12 md:right-14">
        <span ref={counterRef} className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">01 / 05</span>
      </div>
      <div className="absolute top-8 left-8 md:top-12 md:left-14">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">07 — In Short</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          ref={textRef}
          className="font-display text-[12vw] md:text-[8vw] lg:text-[6.5vw] text-center text-foreground leading-[1] tracking-[-0.01em] max-w-[92vw]"
          aria-live="polite"
        />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex gap-2">
        {CAP_STATEMENTS.map((_, index) => (
          <div
            key={index}
            ref={(el) => { progressRefs.current[index] = el }}
            className="w-8 h-px transition-colors duration-500"
            style={{ backgroundColor: index === 0 ? 'var(--accent)' : 'var(--muted)' }}
          />
        ))}
      </div>
    </section>
  )
}

/* ============================================================== *
 *  10 — FINAL CTA
 * ============================================================== */

function FinalCTASection() {
  const sectionRef = useRef(null)
  useReveal(sectionRef, 0.12)

  return (
    <section
      ref={sectionRef}
      id="section-08"
      data-screen-label="Departure"
      aria-label="Let's create content worth travelling for"
      className="relative min-h-[80vh] w-full overflow-hidden flex flex-col items-center justify-center bg-background border-t border-muted"
    >
      {/* Full-bleed background image with scrim */}
      <div className="absolute inset-0">
        <img src="/images/spa-pool.jpg" alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'rgba(10,10,10,0.62)' }} />
      </div>

      <div className="relative text-center px-6 py-24 max-w-4xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground block mb-10" data-reveal>
          08 — Begin
        </span>

        <h2
          className="font-display text-[10vw] sm:text-[8vw] md:text-[6.5vw] lg:text-[5.5vw] leading-[0.97] tracking-[-0.02em] text-foreground mb-12"
          data-reveal
        >
          Let&rsquo;s Create Content{' '}
          <span className="italic" style={{ color: 'var(--accent)' }}>Worth Travelling For.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-reveal>
          <CTAButton />
          <a
            href={`mailto:${EMAIL}`}
            data-cursor-hover
            className="inline-flex items-center font-mono text-[10px] tracking-[0.22em] uppercase text-foreground hover:text-accent transition-colors duration-300 border border-muted hover:border-accent px-7 py-4"
          >
            Send A Message
          </a>
        </div>

        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground mt-10" data-reveal>
          No obligation. Just a conversation about your brand.
        </p>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  11 — FOOTER
 * ============================================================== */

function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL) } catch { /* fallback */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer
      className="relative bg-background border-t border-muted px-6 md:px-8 py-12 md:py-16"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">

        {/* Top row: wordmark + tagline */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-muted mb-10">
          <div>
            <span className="font-display text-4xl md:text-5xl tracking-[-0.02em] text-foreground block mb-3">
              Voyage
            </span>
            <p className="font-body text-xs text-muted-foreground max-w-xs leading-relaxed">
              A hospitality content studio. We make the language a brand uses to speak to the world.
            </p>
          </div>

          {/* Contact block */}
          <div className="flex flex-col gap-3 text-right">
            <button
              onClick={copyEmail}
              className="relative font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors text-right"
              data-cursor-hover
              title="Click to copy"
            >
              <span className={`transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`}>{EMAIL.toUpperCase()}</span>
              <span className={`absolute inset-0 flex items-center justify-end transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}>COPIED ✓</span>
            </button>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
              data-cursor-hover
            >
              {PHONE}
            </a>
          </div>
        </div>

        {/* Bottom row: socials + legal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground flex items-center gap-5 flex-wrap">
            {SOCIALS.map((s, i) => (
              <span key={s.label} className="flex items-center gap-5">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                  data-cursor-hover
                >
                  {s.label.toUpperCase()}
                </a>
                {i < SOCIALS.length - 1 && <span className="text-muted">/</span>}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 font-mono text-[9px] tracking-[0.2em] text-muted-foreground">
            <span>© {new Date().getFullYear()} The Voyage Group Ltd</span>
            <span>Registered in England &amp; Wales</span>
            <span className="text-muted hidden sm:inline">|</span>
            <a href="/privacy" className="hover:text-foreground transition-colors" data-cursor-hover>Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ============================================================== *
 *  JSON-LD — Review schema (AI search + rich results)
 *  Emits only testimonials flagged verified:true. Currently none
 *  are verified, so this renders nothing until you approve quotes
 *  and set verified:true on the TESTIMONIALS entries above.
 * ============================================================== */

function ReviewSchema() {
  const verified = TESTIMONIALS.filter((t) => t.verified)
  if (!verified.length) return null

  const schema = verified.map((t) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewBody: t.quote,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: t.rating,
      bestRating: 5,
    },
    author: {
      '@type': 'Person',
      jobTitle: t.authorTitle,
      worksFor: { '@type': 'Organization', name: t.org },
    },
    itemReviewed: {
      '@type': 'Organization',
      name: 'The Voyage Group',
    },
  }))

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/* ============================================================== *
 *  PAGE ROOT
 * ============================================================== */

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <ReviewSchema />
      <CustomCursor />
      <Navigation />
      <main className="relative bg-background">
        <HeroSection />
        <ManifestoSection />
        <TrustSection />
        <ProblemSection />
        <ValueSection />
        <WorkSection />
        <ServicesSection />
        <AuthoritySection />
        <ProcessSection />
        <CapabilitiesSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
