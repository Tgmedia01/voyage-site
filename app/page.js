'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/* ============================================================== *
 * DATA & SEO
 * ============================================================== */

const CALENDLY_URL = 'https://calendly.com/thevoyagegroup'
const EMAIL        = 'hello@thevoyagegroup.com'

const ENTITY_DESCRIPTION =
  'Voyage is a UK-based hospitality content studio specialising in brand film, photography, and social content for luxury hotels and resorts.'

const TESTIMONIALS = [
  {
    id: 'coniston',
    quote: 'Voyage understood our brand instinctively. The content they created directly contributed to our strongest booking quarter on record.',
    authorName: 'General Manager',
    authorTitle: 'General Manager',
    org: 'The Coniston Hotel',
    rating: 5,
    verified: false,
  }
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/thevoyage.group/' },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/thevoyagegroup' },
  { label: 'YouTube',   href: 'https://www.youtube.com/@TheVoyageGroup' },
]

const SECTIONS = [
  { id: '00', name: 'ARRIVAL' },
  { id: '01', name: 'STORY' },
  { id: '02', name: 'TRUST' },
  { id: '03', name: 'WORK' },
  { id: '04', name: 'SERVICES' },
  { id: '05', name: 'AUTHORITY' },
  { id: '06', name: 'PROCESS' },
]

const MENU_LINKS = [
  { name: 'WORK',     href: '#section-03', description: '01 — Selected projects' },
  { name: 'SERVICES', href: '#section-04', description: '02 — What we make' },
  { name: 'CONTACT',  href: '#section-06', description: '03 — Begin a conversation' },
]

const CLIENTS = [
  'The Coniston Hotel', 'The Mitre', 'Lakes By Yoo', 'Cycas Hospitality', 'Profitroom', 'The Lincoln Suites'
]

const PROJECTS = [
  {
    id: '01', slug: 'the-coniston', name: 'The Coniston', scope: 'Brand Film / Wellness / Stills',
    image: '/images/spa-tubs.jpg',
  },
  {
    id: '02', slug: 'alkaline-spa', name: 'Alkaline Spa', scope: 'Architectural / Stills',
    image: '/images/spa-pool.jpg',
  },
  {
    id: '03', slug: 'lincoln-suites', name: 'Lincoln Suites', scope: 'Lifestyle / Social Content',
    image: '/images/london-lifestyle.jpg',
  }
]

const SERVICES = [
  { index: '01', slug: 'content-production', name: 'Content Production', body: 'End-to-end production from brief to final delivery — strategy, shoot, edit, distribute.' },
  { index: '02', slug: 'hospitality-photography', name: 'Photography', body: 'Architectural, lifestyle, F&B and editorial photography for print, web and social.' },
  { index: '03', slug: 'brand-film-production', name: 'Videography & Film', body: 'Cinematic short films, campaign videos and brand documentaries built for hospitality.' },
  { index: '04', slug: 'social-media-content', name: 'Social Media', body: 'Monthly content retainers — shooting, editing and copy — calibrated to your platform.' },
  { index: '05', slug: 'campaign-production', name: 'Campaigns', body: 'Seasonal and promotional campaign suites across digital, OOH and print.' },
  { index: '06', slug: 'hospitality-marketing-support', name: 'Marketing Support', body: 'Strategic consultancy, content audits and channel strategy for in-house teams.' },
  { index: '07', slug: 'paid-social-creative', name: 'Paid Social Creative', body: 'Performance-optimised video and static creative for Meta, TikTok and Google.' },
  { index: '08', slug: 'ugc-creator-campaigns', name: 'UGC & Creators', body: 'Managed UGC programmes and partnerships that generate authentic content.' },
]

const MANIFESTO_WORDS = [
  'We', "don't", 'make', 'content.', 'We', 'make', 'the',
  { w: 'language', accent: true }, 'a', 'brand', 'uses', 'to',
  'speak', 'to', 'the', 'world.',
]

/* ============================================================== *
 * SHARED COMPONENTS
 * ============================================================== */

function useReveal(ref, stagger = 0.12) {
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = container.querySelectorAll('[data-reveal]')
    if (!items.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, stagger, ease: 'power3.out',
          scrollTrigger: { trigger: container, start: 'top 82%', toggleActions: 'play none none none' }
        }
      )
    }, container)
    return () => ctx.revert()
  }, [])
}

function CTAButton({ className = '', label = 'Book A Discovery Call', secondary = false }) {
  return (
    <a
      href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" data-cursor-hover
      className={`inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 ${
        secondary ? 'text-muted-foreground hover:text-foreground border border-muted hover:border-foreground px-6 py-4'
                  : 'bg-accent text-foreground hover:bg-foreground hover:text-background px-7 py-4'
      } ${className}`}
    >
      {label} {!secondary && <span aria-hidden="true" className="text-[8px]">↗</span>}
    </a>
  )
}

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

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between px-6 py-5 md:px-8">
          <a href="#section-00" className="font-heading text-xl tracking-[-0.02em] text-foreground" data-cursor-hover>Voyage</a>
          <div className="flex items-center gap-4">
            <CTAButton className="hidden
