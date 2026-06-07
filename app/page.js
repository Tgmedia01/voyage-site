'use client'

/**
 * The Voyage Group — Homepage (Version 2.0)
 * ------------------------------------------------------------------
 * LAYOUT BASE:   v0 concept (Tgmedia01/v0-voyage-group-homepage)
 *                — same sections, flow, navigation grid + wireframes.
 * TYPE BLEND:    Syne (display) · Newsreader italic (accents) · DM Mono (meta)
 * MEDIA:         HTML5 hero video loop + clean /images/* asset paths.
 *
 * Self-contained: every section, the custom cursor, and the index nav
 * live in this one file. Depends only on gsap / ScrollTrigger (already
 * in the repo) and the colour tokens in app/globals.css.
 * ------------------------------------------------------------------
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ============================================================== *
 *  DATA
 * ============================================================== */

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thevoyage.group/' },
  { label: 'Facebook', href: 'https://www.facebook.com/thevoyage.group' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@thevoyage.group' },
  { label: 'YouTube', href: 'https://www.youtube.com/@TheVoyageGroup' },
]

const SECTIONS = [
  { id: '00', name: 'ARRIVAL', href: '#section-00' },
  { id: '01', name: 'THRESHOLD', href: '#section-01' },
  { id: '02', name: 'WORK', href: '#section-02' },
  { id: '03', name: 'CAPABILITIES', href: '#section-03' },
  { id: '04', name: 'DEPARTURE', href: '#section-04' },
]

const MENU_LINKS = [
  { name: 'WORK', href: '#section-02', description: '01 \u2014 Selected projects' },
  { name: 'CAPABILITIES', href: '#section-03', description: '02 \u2014 What we make' },
  { name: 'STUDIO', href: '#section-01', description: '03 \u2014 Who we are' },
  { name: 'CONTACT', href: '#section-04', description: '04 \u2014 Begin a conversation' },
]

const PROJECTS = [
  { id: '01', name: 'The Coniston', client: 'The Coniston Estate', location: 'Yorkshire Dales, England', year: '2026', scope: 'Brand Film / Wellness / Stills', image: '/images/spa-tubs.jpg' },
  { id: '02', name: 'Alkaline Spa', client: 'Alkaline Wellness', location: 'Harrogate, England', year: '2025', scope: 'Architectural / Stills', image: '/images/spa-pool.jpg' },
  { id: '03', name: 'Lincoln Suites', client: 'Lincoln Collection', location: 'Mayfair, London', year: '2025', scope: 'Lifestyle / Social Content', image: '/images/london-lifestyle.jpg' },
  { id: '04', name: 'Defender', client: 'The Coniston Estate', location: 'Yorkshire Dales, England', year: '2026', scope: 'Cinematic Film / Direction', image: '/images/defender-cinematic.jpg' },
  { id: '05', name: 'Off-Road', client: 'Voyage Originals', location: 'Yorkshire Dales, England', year: '2026', scope: 'Drone / Film / Brand', image: '/images/defender-offroad.jpg' },
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

const THRESHOLD_WORDS = [
  'We', 'don\u2019t', 'make', 'content.', 'We', 'make', 'the',
  { w: 'language', accent: true }, 'a', 'brand', 'uses', 'to',
  'speak', 'to', 'the', 'world.',
]

/* ============================================================== *
 *  SCOPED STYLES — fonts, reveals, helpers (all in-file)
 * ============================================================== */

function StyleInjector() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Newsreader:ital,opsz,wght@1,6..72,400;1,6..72,500;1,6..72,600&family=DM+Mono:wght@400;500&display=swap');

      .font-syne { font-family: 'Syne', sans-serif; font-weight: 800; letter-spacing: -0.03em; }
      .font-news { font-family: 'Newsreader', 'Times New Roman', serif; font-style: italic; font-weight: 500; letter-spacing: -0.01em; }
      .font-dm   { font-family: 'DM Mono', 'SFMono-Regular', monospace; }

      /* Mask-reveal hero lines */
      .vg-mask { display: block; overflow: hidden; }
      .vg-mask > span {
        display: block;
        transform: translateY(110%);
        animation: vg-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      @keyframes vg-rise { to { transform: translateY(0); } }

      /* Custom cursor */
      .vg-cursor {
        position: fixed; top: 0; left: 0; z-index: 9999;
        width: 10px; height: 10px; border-radius: 50%;
        background: var(--foreground, #EDE7DD);
        pointer-events: none; mix-blend-mode: difference;
        transform: translate(-50%, -50%);
        transition: width .25s ease, height .25s ease, opacity .3s ease;
      }
      .vg-cursor.is-hovering { width: 46px; height: 46px; }

      @media (hover: none) { .vg-cursor { display: none; } * { cursor: auto !important; } }
      @media (prefers-reduced-motion: reduce) {
        .vg-mask > span { animation: none; transform: none; }
      }

      .vg-underline { position: relative; }
      .vg-underline::after {
        content: ''; position: absolute; left: 0; bottom: -2px;
        width: 0; height: 1px; background: currentColor;
        transition: width .4s cubic-bezier(0.16,1,0.3,1);
      }
      .vg-underline:hover::after { width: 100%; }

      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .horizontal-scroll-container { display: flex; flex-wrap: nowrap; }
    `}</style>
  )
}

/* ============================================================== *
 *  CUSTOM CURSOR
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
        dot.style.top = e.clientY + 'px'
      })
    }
    const over = (e) => {
      if (e.target.closest('[data-cursor-hover]')) dot.classList.add('is-hovering')
    }
    const out = (e) => {
      if (e.target.closest('[data-cursor-hover]')) dot.classList.remove('is-hovering')
    }
    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return <div ref={dotRef} className="vg-cursor" aria-hidden="true" />
}

/* ============================================================== *
 *  NAVIGATION (v0 grid: logo · indicator · index toggle · progress)
 * ============================================================== */

function Navigation() {
  const [current, setCurrent] = useState(SECTIONS[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hovered, setHovered] = useState(null)

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
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent pointer-events-none" />
        <div className="relative flex items-center justify-between px-6 py-6 md:px-8 md:py-7">
          {/* Logo */}
          <a
            href="#section-00"
            className="font-syne text-lg md:text-xl tracking-[-0.04em] text-foreground pointer-events-auto vg-underline"
            data-cursor-hover
          >
            VOYAGE
          </a>

          {/* Section indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 font-dm text-[10px] tracking-[0.25em] text-foreground uppercase hidden sm:block">
            <span className="text-muted-foreground">{current.id}</span>
            <span className="mx-3 text-muted-foreground">/</span>
            <span>{current.name}</span>
          </div>

          {/* Index toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="font-dm text-[10px] tracking-[0.25em] text-foreground uppercase pointer-events-auto flex items-center gap-2"
            data-cursor-hover
          >
            <span className="vg-underline">{menuOpen ? 'CLOSE' : 'INDEX'}</span>
            <span className="text-muted-foreground">{menuOpen ? '/ ESC' : '/ 04'}</span>
          </button>
        </div>

        {/* Progress line */}
        <div className="absolute top-6 right-32 md:top-7 md:right-36 w-16 hidden sm:block">
          <div className="h-px bg-muted relative">
            <div
              className="absolute left-0 top-0 h-full bg-foreground transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </header>

      {/* Index overlay */}
      <div
        className="fixed inset-0 z-40 bg-background transition-transform duration-700"
        style={{
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!menuOpen}
      >
        <div className="h-full flex flex-col justify-center px-6 md:px-[8vw]">
          <nav className="relative">
            {MENU_LINKS.map((link, index) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  transform: menuOpen ? 'translateY(0)' : 'translateY(60px)',
                  opacity: menuOpen ? 1 : 0,
                  transition: `transform .6s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.06}s, opacity .6s ease ${0.15 + index * 0.06}s`,
                }}
              >
                <a href={link.href} onClick={close} className="flex items-baseline gap-4 md:gap-6" data-cursor-hover>
                  <span
                    className="font-dm text-[12px] text-muted-foreground transition-transform duration-300"
                    style={{ transform: hovered === index ? 'translateX(8px)' : 'translateX(0)' }}
                  >
                    0{index + 1}
                  </span>
                  <span
                    className="font-syne text-[15vw] md:text-[11vw] leading-[1] tracking-[-0.05em] transition-colors duration-300"
                    style={{ color: hovered === index ? 'var(--accent)' : 'var(--foreground)' }}
                  >
                    {link.name}
                  </span>
                </a>
                <div className="hidden md:block absolute left-[4.5rem] -bottom-5 overflow-hidden" style={{ height: hovered === index ? '20px' : 0 }}>
                  <span
                    className="font-dm text-[11px] tracking-[0.1em] text-muted-foreground block transition-all duration-300"
                    style={{
                      transform: hovered === index ? 'translateY(0)' : 'translateY(10px)',
                      opacity: hovered === index ? 1 : 0,
                    }}
                  >
                    {link.description}
                  </span>
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Overlay bottom bar — email + live socials */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-muted px-6 py-6 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <a
            href="mailto:hello@thevoyagegroup.com"
            className="font-dm text-[11px] tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
            data-cursor-hover
          >
            HELLO@THEVOYAGEGROUP.COM
          </a>
          <div className="font-dm text-[11px] tracking-[0.15em] text-muted-foreground flex items-center gap-4 flex-wrap">
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
 *  00 — HERO / ARRIVAL  (video loop + letterbox crop on scroll)
 * ============================================================== */

function HeroSection() {
  const sectionRef = useRef(null)
  const videoWrapRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const video = videoWrapRef.current
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
      className="relative h-screen w-full overflow-hidden"
    >
      <div ref={videoWrapRef} className="absolute inset-0" style={{ clipPath: 'inset(0 0 0 0)' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/35" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <h1 className="sr-only">We make hospitality unforgettable — Voyage, a studio for hospitality brands</h1>
        <div
          aria-hidden="true"
          className="font-syne text-[15vw] md:text-[9vw] lg:text-[8vw] text-foreground text-center leading-[0.86] tracking-[-0.055em]"
        >
          <span className="vg-mask"><span style={{ animationDelay: '.15s' }}>We make</span></span>
          <span className="vg-mask"><span style={{ animationDelay: '.3s' }}>hospitality</span></span>
          <span className="vg-mask">
            <span className="font-news" style={{ animationDelay: '.45s', display: 'inline-block', fontSize: '1.04em' }}>
              unforgettable.
            </span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-right hidden sm:block">
        <div className="font-dm text-[10px] tracking-[0.25em] text-foreground">00 / 04</div>
        <div className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground uppercase mt-1">ARRIVAL</div>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  01 — THRESHOLD  (word-by-word reveal, pinned)
 * ============================================================== */

function ThresholdSection() {
  const sectionRef = useRef(null)
  const wordsRef = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: `+=${THRESHOLD_WORDS.length * 60}`, pin: true, scrub: 0.5 },
      })
      wordsRef.current.forEach((word, index) => {
        if (!word) return
        tl.fromTo(word, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, index * 0.3)
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-01"
      data-screen-label="Threshold"
      aria-label="Threshold — Our Position"
      className="relative min-h-screen w-full bg-background flex items-end pb-24 md:pb-32"
    >
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 overflow-hidden">
        <video autoPlay loop muted playsInline preload="metadata" className="w-full h-[50vh] object-cover" style={{ transform: 'translateY(-35%)' }}>
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/30" />
      </div>

      <div className="absolute top-32 md:top-40 left-6 md:left-8">
        <span className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground uppercase">01 \u2014 A POSITION</span>
      </div>

      <div className="w-full max-w-5xl px-6 md:px-16 lg:px-24">
        <p className="font-syne text-[10vw] md:text-[7vw] lg:text-[6vw] leading-[0.92] tracking-[-0.045em] text-foreground">
          {THRESHOLD_WORDS.map((item, index) => {
            const accent = typeof item === 'object' && item.accent
            const text = typeof item === 'object' ? item.w : item
            return (
              <span
                key={index}
                ref={(el) => { wordsRef.current[index] = el }}
                className={`inline-block mr-[0.25em] opacity-0 ${accent ? 'font-news text-accent' : ''}`}
                style={accent ? { fontSize: '1.05em' } : undefined}
              >
                {text}
              </span>
            )
          })}
        </p>
      </div>
    </section>
  )
}

/* ============================================================== *
 *  02 — WORK  (horizontal scroll desktop / vertical stack mobile)
 * ============================================================== */

function WorkSection() {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const titlesRef = useRef([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container || isMobile) return
    const ctx = gsap.context(() => {
      const totalWidth = container.scrollWidth - window.innerWidth
      const scrollTween = gsap.to(container, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: `+=${totalWidth}`, pin: true, scrub: 1, anticipatePin: 1 },
      })
      titlesRef.current.forEach((title) => {
        if (!title) return
        gsap.to(title, {
          x: -300, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: `+=${totalWidth}`, scrub: 1, containerAnimation: scrollTween },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section ref={sectionRef} id="section-02" data-screen-label="Work" aria-label="Selected Work" className="relative bg-background py-24">
        <div className="px-6 mb-16">
          <span className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground uppercase">02 / SELECTED WORK</span>
        </div>
        <div className="space-y-24">
          {PROJECTS.map((p) => (
            <article key={p.id} className="relative px-6 group">
              <h2 className="font-syne text-[20vw] leading-[0.86] tracking-[-0.05em] text-foreground relative z-10 -mb-[7vw]">{p.name}</h2>
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img src={p.image} alt={`${p.name} — ${p.client}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-6 font-dm text-[10px] tracking-[0.1em] text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
                <span>{p.client}</span><span className="text-muted">/</span>
                <span>{p.location}</span><span className="text-muted">/</span>
                <span>{p.year}</span><span className="text-muted">/</span>
                <span>{p.scope}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="section-02" data-screen-label="Work" aria-label="Selected Work" className="relative overflow-hidden bg-background">
      <div ref={containerRef} className="horizontal-scroll-container h-screen">
        {PROJECTS.map((p, index) => (
          <article key={p.id} className="flex-shrink-0 w-screen h-screen relative flex items-center justify-center group">
            <div className="relative w-[58vw] h-[68vh] overflow-hidden">
              <img src={p.image} alt={`${p.name} — ${p.client}`} loading={index === 0 ? 'eager' : 'lazy'} className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
            </div>
            <div ref={(el) => { titlesRef.current[index] = el }} className="absolute left-8 md:left-16 bottom-[20vh] pointer-events-none">
              <span className="block font-dm text-[11px] tracking-[0.25em] text-accent mb-4">0{index + 1} / 0{PROJECTS.length}</span>
              <h2 className="font-syne text-[16vw] md:text-[14vw] lg:text-[12vw] leading-[0.84] tracking-[-0.05em] text-foreground">{p.name}</h2>
            </div>
            <div className="absolute bottom-8 left-8 right-8 md:left-16 md:right-16">
              <div className="font-dm text-[10px] tracking-[0.15em] text-muted-foreground flex items-center gap-6 flex-wrap">
                <span>{p.client}</span><span className="text-muted">|</span>
                <span>{p.location}</span><span className="text-muted">|</span>
                <span>{p.year}</span><span className="text-muted">|</span>
                <span>{p.scope}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ============================================================== *
 *  03 — CAPABILITIES  (morphing statements, pinned)
 * ============================================================== */

function CapabilitiesSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const counterRef = useRef(null)
  const bgRefs = useRef([])
  const progressRefs = useRef([])
  const currentIndex = useRef(0)
  const animating = useRef(false)
  const pending = useRef(null)

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
    const textC = textRef.current
    const counter = counterRef.current
    if (!textC || !counter) return
    animating.current = true
    currentIndex.current = target
    counter.textContent = `0${target + 1} / 0${CAP_STATEMENTS.length}`
    bgRefs.current.forEach((bg, i) => { if (bg) bg.style.opacity = i === target ? '0.32' : '0' })
    progressRefs.current.forEach((bar, i) => { if (bar) bar.style.backgroundColor = i <= target ? '#C2412E' : '#3A3A38' })

    const chars = textC.querySelectorAll('span')
    gsap.to(chars, {
      y: -24, opacity: 0, duration: 0.28, stagger: 0.015, ease: 'power3.in',
      onComplete: () => {
        buildSpans(CAP_STATEMENTS[target])
        const next = textC.querySelectorAll('span')
        gsap.fromTo(next, { y: 24, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.32, stagger: 0.015, ease: 'power3.out',
          onComplete: () => {
            animating.current = false
            if (pending.current !== null && pending.current !== currentIndex.current) {
              const n = pending.current; pending.current = null; morphTo(n)
            } else { pending.current = null }
          },
        })
      },
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || !textRef.current) return
    buildSpans(CAP_STATEMENTS[0])
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section, start: 'top top', end: `+=${CAP_STATEMENTS.length * 400}`, pin: true, scrub: 0.5,
        onUpdate: (self) => {
          const target = Math.min(Math.floor(self.progress * CAP_STATEMENTS.length), CAP_STATEMENTS.length - 1)
          if (target !== currentIndex.current) morphTo(target)
        },
      })
    }, section)
    return () => ctx.revert()
  }, [morphTo])

  return (
    <section ref={sectionRef} id="section-03" data-screen-label="Capabilities" aria-label="Capabilities" className="relative h-screen w-full overflow-hidden bg-background">
      {CAP_BACKGROUNDS.map((img, index) => (
        <div key={index} ref={(el) => { bgRefs.current[index] = el }} className="absolute inset-0" style={{ opacity: index === 0 ? 0.32 : 0, transition: 'opacity 1200ms ease-out' }}>
          <img src={img} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" style={{ transform: 'scale(1.1)' }} />
        </div>
      ))}

      <div className="absolute top-8 right-8 md:top-12 md:right-16">
        <span ref={counterRef} className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground">01 / 05</span>
      </div>
      <div className="absolute top-8 left-8 md:top-12 md:left-16">
        <span className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground uppercase">03 \u2014 Capabilities</span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div ref={textRef} className="font-syne text-[11vw] md:text-[7vw] lg:text-[6vw] text-foreground text-center leading-[0.88] tracking-[-0.045em] max-w-[92vw]" aria-live="polite" />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex gap-2">
        {CAP_STATEMENTS.map((_, index) => (
          <div key={index} ref={(el) => { progressRefs.current[index] = el }} className="w-8 h-px transition-colors duration-500" style={{ backgroundColor: index === 0 ? '#C2412E' : '#3A3A38' }} />
        ))}
      </div>
    </section>
  )
}

/* ============================================================== *
 *  04 — DEPARTURE  (full-bleed contact, fluid type, live socials)
 * ============================================================== */

function DepartureSection() {
  const [copied, setCopied] = useState(false)
  const email = 'hello@thevoyagegroup.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="section-04" data-screen-label="Departure" aria-label="Departure — Contact" className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        <img src="/images/spa-pool.jpg" alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/45" />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <span className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-10">04 \u2014 Departure</span>
        <h2
          className="font-syne text-foreground leading-[0.86] tracking-[-0.05em] mb-14"
          style={{ fontSize: 'clamp(2.75rem, 11vw, 9rem)', maxWidth: '14ch' }}
        >
          Begin the next <span className="font-news text-accent" style={{ fontSize: '1.02em' }}>chapter.</span>
        </h2>

        <button onClick={copyEmail} className="group relative font-dm tracking-[0.2em] text-foreground hover:text-accent transition-colors duration-300" style={{ fontSize: 'clamp(10px, 2.4vw, 13px)' }} data-cursor-hover>
          <span className={`transition-opacity duration-300 ${copied ? 'opacity-0' : 'opacity-100'}`}>{email.toUpperCase()}</span>
          <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>COPIED</span>
        </button>

        <div className="mt-9 flex flex-col items-center gap-4">
          <span className="font-dm text-[10px] tracking-[0.25em] text-muted-foreground">OR</span>
          <a href="https://calendly.com/thevoyagegroup" target="_blank" rel="noopener noreferrer" className="font-dm tracking-[0.2em] text-foreground hover:text-accent transition-colors duration-300 vg-underline" style={{ fontSize: 'clamp(10px, 2.4vw, 13px)' }} data-cursor-hover>
            BOOK A CALL \u2014 CALENDLY.COM/THEVOYAGEGROUP
          </a>
        </div>
      </div>

      {/* Footer — brand + live socials */}
      <footer className="relative border-t border-muted/60 px-6 md:px-8 py-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <span className="font-syne text-foreground text-base tracking-[-0.03em]">VOYAGE</span>
          <div className="font-dm text-[10px] tracking-[0.2em] text-muted-foreground flex items-center gap-4 flex-wrap">
            {SOCIALS.map((s, i) => (
              <span key={s.label} className="flex items-center gap-4">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors" data-cursor-hover>{s.label.toUpperCase()}</a>
                {i < SOCIALS.length - 1 && <span className="text-muted">/</span>}
              </span>
            ))}
          </div>
          <span className="font-dm text-[10px] tracking-[0.3em] text-muted-foreground uppercase">VOYAGE \u2014 INDEX 2026</span>
        </div>
      </footer>
    </section>
  )
}

/* ============================================================== *
 *  PAGE
 * ============================================================== */

export default function Home() {
  return (
    <>
      <StyleInjector />
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <ThresholdSection />
        <WorkSection />
        <CapabilitiesSection />
        <DepartureSection />
      </main>
    </>
  )
}
