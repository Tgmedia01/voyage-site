'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './globals.css';

/* ============================================================
   COPY & DATA CONSTANTS
   ============================================================ */
const COPY = {
  heroSub:
    `The leading media powerhouse for the global hospitality industry. We craft high-production, cinematic marketing assets that maximise visibility, drive direct bookings, and elevate luxury travel brands.`,
  statement:
    `We don\u2019t just produce content. We craft how the world\u2019s most considered places make people <em>feel</em> \u2014 and turn that desire into <b>bookings</b>.`,
  studio1: `Voyage partners with luxury hotels, resorts and wellness brands as a retained content and creative partner \u2014 not a vendor booked by the day.`,
  studio2: `We think like hospitality marketers first. Every frame is built to shift brand perception and earn direct revenue.`,
  studio3: `Beautiful work is the baseline. The work exists to move the numbers that matter to your business.`,
  ctaHead: `Redefining hospitality marketing.<br>Let\u2019s build something <em>iconic</em>`,
  ctaSub: `Tell us about your property and your ambitions. We\u2019ll show you what\u2019s possible \u2014 and how content can move your business.`,
};

const PROJECTS = [
  { id: 'w1', name: 'The Coniston', loc: 'Yorkshire Dales, England', tags: ['Film', 'Wellness', 'Stills'], col: 'c-7', ar: 'ar-land', img: '/images/spa-tubs.jpg' },
  { id: 'w2', name: 'Alkaline Spa', loc: 'Harrogate, England', tags: ['Architectural', 'Stills'], col: 'c-5', ar: 'ar-tall', push: true, img: '/images/spa-pool.jpg' },
  { id: 'w3', name: 'Lincoln Suites', loc: 'Mayfair, London', tags: ['Lifestyle', 'Social'], col: 'c-5', ar: 'ar-tall', img: '/images/london-lifestyle.jpg' },
  { id: 'w4', name: 'Defender Experience', loc: 'The Coniston Estate', tags: ['Film', 'Cinematic'], col: 'c-7', ar: 'ar-land', push: true, img: '/images/defender-cinematic.jpg' },
  { id: 'w5', name: 'Off-Road Films', loc: 'Yorkshire Dales, England', tags: ['Drone', 'Film', 'Brand'], col: 'c-12', ar: 'ar-wide', img: '/images/defender-offroad.jpg' },
];

const SERVICES = [
  { no: '01', t: 'Campaigns', d: 'Full-scale marketing campaigns, from concept to execution.', img: '/images/defender-cinematic.jpg' },
  { no: '02', t: 'Social Media Content', d: 'High-performing visuals and strategic storytelling for luxury hotels.', img: '/images/london-lifestyle.jpg' },
  { no: '03', t: 'Production Assets', d: 'High-resolution imagery, digital & print materials, and campaign video.', img: '/images/spa-pool.jpg' },
];

const APPROACH = [
  { n: 'i',   t: 'We start with the brand',    d: 'Before a single frame, we learn the property, the guest, and the commercial goal. The brief drives the visuals — never the other way around.' },
  { n: 'ii',  t: 'We make it cinematic',         d: 'Every shoot is treated like a campaign. Lighting, pacing, sound and grade combine into work that creates emotion and desire.' },
  { n: 'iii', t: 'We build for revenue',          d: 'Content is delivered as a system — across web, social, and paid — engineered to drive direct bookings and lift brand perception.' },
];

const POSTS = [
  { id: 'j1', cat: 'Trend Report', t: 'Why slow content is winning the luxury traveller', date: 'May 2026', img: '/images/spa-tubs.jpg' },
  { id: 'j2', cat: 'Field Notes',  t: 'Shooting the light: a week in the Yorkshire Dales',  date: 'April 2026', img: '/images/defender-offroad.jpg' },
  { id: 'j3', cat: 'Perspective',  t: 'The new economics of the hotel hero film',            date: 'March 2026', img: '/images/london-lifestyle.jpg' },
];

/* ============================================================
   SCROLL-DRIVEN REVEAL HOOK
   ============================================================ */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = root.matches?.('.reveal') ? [root] : [...root.querySelectorAll('.reveal')];
    const io = new IntersectionObserver(
      (ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* Global scroll reveal fallback */
function GlobalReveal() {
  useEffect(() => {
    const reveal = () => {
      const vh = window.innerHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.9) el.classList.add('in');
      });
    };
    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal);
    const t = setInterval(reveal, 400);
    return () => { window.removeEventListener('scroll', reveal); window.removeEventListener('resize', reveal); clearInterval(t); };
  }, []);
  return null;
}

/* ============================================================
   SHARED COMPONENTS
   ============================================================ */
function Kicker({ children }) {
  return <div className="kicker">{children}</div>;
}

/* ============================================================
   NAV
   ============================================================ */
function Nav({ onBook, onMenu }) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [['Work', '#work'], ['Services', '#services'], ['Case Study', '#case'], ['Journal', '#journal']];
  return (
    <nav className={`nav ${solid ? 'solid' : ''}`}>
      <div className="nav-links nav-left">
        {links.map(([l, h]) => <a href={h} key={l}>{l}</a>)}
      </div>
      <a className="brand" href="#top" aria-label="Voyage — home">
        <img
          className="brand-logo"
          src="https://thevoyage.group/wp-content/uploads/2024/12/Voyage-Word-Mark-1-1024x243.png"
          alt="Voyage"
          width={180}
          height={43}
        />
      </a>
      <div className="nav-right">
        <button className="nav-cta" onClick={onBook}><span>Book a call</span></button>
        <button className="nav-burger" onClick={onMenu} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

/* ============================================================
   MOBILE MENU
   ============================================================ */
function MobileMenu({ open, onClose, onBook }) {
  const links = [['Work', '#work'], ['Services', '#services'], ['Case Study', '#case'], ['Journal', '#journal'], ['Contact', '#contact']];
  return (
    <div className={`mmenu ${open ? 'open' : ''}`}>
      <button className="modal-x" onClick={onClose} style={{ color: 'var(--paper-dim)' }}>×</button>
      {links.map(([l, h], i) => (
        <a href={h} key={l} onClick={onClose}>
          <span className="idx">0{i + 1}</span>{l}
        </a>
      ))}
      <a onClick={() => { onClose(); onBook(); }} style={{ cursor: 'pointer', color: 'var(--accent)' }}>
        <span className="idx">→</span>Book a call
      </a>
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero({ onReel, onBook }) {
  const mediaRef = useRef(null);
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          el.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(1.04)`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="hero sec" id="top">
      <div className="hero-media" ref={mediaRef}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-shade" />
      <div className="hero-grain" />

      <div className="hero-top reveal in">
        <div className="hero-overline">
          <span className="ln" />
          <Kicker>Hospitality Media House — Est. London</Kicker>
        </div>
      </div>

      <div className="hero-inner">
        <h1 className="hero-h1 display">
          <span className="ln-anim">The art of</span>
          <span className="ln-anim">making places</span>
          <span className="ln-anim"><em>unforgettable</em></span>
        </h1>

        <div className="hero-row">
          <p className="hero-sub reveal in" data-d="2">{COPY.heroSub}</p>
          <div className="reveal in" data-d="3" style={{ display: 'flex', flexDirection: 'column', gap: 26, alignItems: 'flex-start' }}>
            <button className="reel" onClick={onReel}>
              <span className="play">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
              Watch the showreel
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', right: 'var(--pad)', bottom: 'clamp(40px,7vh,84px)', zIndex: 3 }}>
        <div className="scrollcue">Scroll <span className="bar" /></div>
      </div>
    </header>
  );
}

/* ============================================================
   STATEMENT
   ============================================================ */
function Statement() {
  const r = useReveal();
  return (
    <section className="sec sec--light statement">
      <div className="wrap" ref={r}>
        <div className="reveal" style={{ marginBottom: 'clamp(34px,5vh,64px)' }}>
          <Kicker>01 — The Studio</Kicker>
        </div>
        <p className="big reveal" data-d="1" dangerouslySetInnerHTML={{ __html: COPY.statement }} />
        <div className="statement-foot">
          <div className="col reveal" data-d="1">
            <h4>A partner, not a vendor</h4>
            <p>{COPY.studio1}</p>
          </div>
          <div className="col reveal" data-d="2">
            <h4>Hospitality, understood</h4>
            <p>{COPY.studio2}</p>
          </div>
          <div className="col reveal" data-d="3">
            <h4>Built to convert</h4>
            <p>{COPY.studio3}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   WORK GRID
   ============================================================ */
function WorkCard({ p }) {
  const ref = useRef(null);
  const viewRef = useRef(null);
  const onMove = (e) => {
    const v = viewRef.current;
    const box = ref.current?.getBoundingClientRect();
    if (v && box) {
      v.style.left = (e.clientX - box.left) + 'px';
      v.style.top  = (e.clientY - box.top)  + 'px';
    }
  };
  return (
    <article
      className={`work-card ${p.col} ${p.push ? 'push' : ''}`}
      ref={ref}
      onMouseMove={onMove}
    >
      <div className={`work-figure ${p.ar}`}>
        <img src={p.img} alt={p.name} />
      </div>
      <div className="work-view" ref={viewRef}>View</div>
      <div className="work-meta">
        <h3>{p.name}</h3>
        <span className="loc">{p.loc}</span>
      </div>
      <div className="work-tags">
        {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
      </div>
    </article>
  );
}

function Work() {
  const r = useReveal();
  return (
    <section className="sec sec--light work" id="work">
      <div className="wrap" ref={r}>
        <div className="shead reveal">
          <div>
            <Kicker>02 — Selected Work</Kicker>
            <h2 className="display" style={{ marginTop: 22 }}>The Portfolio</h2>
          </div>
          <p className="lead">A selection of films, campaigns, and stills for hotels, resorts and wellness brands across the world's most desirable destinations.</p>
        </div>
        <div className="work-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className={`reveal ${p.col} ${p.push ? 'push' : ''}`}
              data-d={(i % 3) + 1}
              style={{ display: 'contents' }}
            >
              <WorkCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MARQUEE
   ============================================================ */
function Marquee() {
  const items = ['Cinematic', 'Elevated', 'Disruptive', 'Editorial', 'Immersive'];
  const seq = (
    <span>
      {items.map((w, i) => (
        <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>
          <span className={i % 2 ? 'ghost' : ''}>{w}</span>
          <span className="star">✦</span>
        </span>
      ))}
    </span>
  );
  return (
    <section className="sec sec--sand marquee" aria-hidden="true">
      <div className="marquee-track">{seq}{seq}</div>
    </section>
  );
}

/* ============================================================
   CASE STUDY
   ============================================================ */
function Metric({ prefix, value, suffix, unit, label }) {
  const isFloat = value % 1 !== 0;
  const shown = (isFloat ? value.toFixed(1) : value) + (suffix || '');
  return (
    <div className="metric">
      <div className="n">{prefix}{shown}<span className="u">{unit}</span></div>
      <div className="l">{label}</div>
    </div>
  );
}

function CaseStudy({ onEnquire }) {
  const r = useReveal();
  return (
    <section className="sec sec--dark case" id="case" ref={r}>
      <div className="wrap">
        <div className="shead reveal">
          <div>
            <Kicker>03 — Featured Case Study</Kicker>
            <h2 className="display" style={{ marginTop: 22 }}>The Coniston</h2>
          </div>
          <p className="lead">A 12-month brand & content partnership — a cinematic programme spanning spa, estate and the Defender Experience that repositioned a Yorkshire landmark as a national destination.</p>
        </div>

        <div className="case-hero reveal" data-d="1">
          <img src="/images/defender-cinematic.jpg" alt="The Coniston — Defender Experience" />
        </div>

        <div className="case-grid">
          <div>
            <div className="body reveal" data-d="1">
              <p>The Coniston is a destination of many worlds — a marble spa, a sweeping estate, and an adrenaline-fuelled Defender Experience. We built a single visual language across all of them: a film trilogy, a year of editorial photography, and an always-on social system designed to make the estate feel inevitable.</p>
              <p>The work didn't just look beautiful. It moved the numbers that matter: direct bookings, average daily rate, and brand search.</p>
            </div>
            <button className="case-link reveal" data-d="2" onClick={onEnquire} style={{ background: 'none', border: 'none', textAlign: 'left' }}>
              Read the full study <span className="arr">→</span>
            </button>
          </div>
          <div className="metrics">
            <Metric prefix="+" value={38} unit="%" label="Direct bookings, year one" />
            <Metric value={12.4} unit="M" label="Cinematic reach" />
            <Metric prefix="+" value={27} unit="%" label="Average daily rate" />
            <Metric prefix="×" value={4} unit="" label="Brand search growth" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES
   ============================================================ */
function Services() {
  const r = useReveal();
  const wrapRef = useRef(null);
  const previewRef = useRef(null);
  const [active, setActive] = useState(-1);
  const state = useRef({ tx: 0, ty: 0, x: 0, y: 0, raf: 0 });

  useEffect(() => {
    const s = state.current;
    const tick = () => {
      s.x += (s.tx - s.x) * 0.14;
      s.y += (s.ty - s.y) * 0.14;
      const el = previewRef.current;
      if (el) el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.raf);
  }, []);

  const onMove = (e) => {
    const box = wrapRef.current?.getBoundingClientRect();
    if (!box) return;
    state.current.tx = e.clientX - box.left;
    state.current.ty = e.clientY - box.top;
  };

  return (
    <section className="sec sec--light services" id="services" ref={r}>
      <div className="wrap">
        <div className="shead reveal">
          <div>
            <Kicker>04 — Services & Deliverables</Kicker>
            <h2 className="display" style={{ marginTop: 22 }}>What we deliver</h2>
          </div>
          <p className="lead">A full-service hospitality studio — retained as your long-term content and creative partner, not booked by the day.</p>
        </div>

        <div
          className={`svc-list reveal ${active > -1 ? 'is-hovering' : ''}`}
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(-1)}
        >
          {SERVICES.map((s, i) => (
            <a
              href="#contact"
              className={`svc-row ${active === i ? 'is-active' : ''}`}
              key={s.no}
              onMouseEnter={() => setActive(i)}
            >
              <span className="no">{s.no}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
              <span className="svc-cta">Enquire <span className="arr">→</span></span>
            </a>
          ))}

          <div className={`svc-preview ${active > -1 ? 'show' : ''}`} ref={previewRef} aria-hidden="true">
            {SERVICES.map((s, i) => (
              <img src={s.img} alt="" key={s.no} className={active === i ? 'on' : ''} draggable={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   APPROACH
   ============================================================ */
function Approach() {
  const r = useReveal();
  return (
    <section className="sec sec--sand approach" ref={r}>
      <div className="wrap">
        <div className="shead reveal">
          <div>
            <Kicker>05 — The Approach</Kicker>
            <h2 className="display" style={{ marginTop: 22 }}>How we work</h2>
          </div>
          <p className="lead">A considered, repeatable process — the reason brands stay with us for years, not projects.</p>
        </div>
        <div className="appr-grid">
          {APPROACH.map((a, i) => (
            <div className="appr reveal" data-d={i + 1} key={a.n}>
              <div className="hr" />
              <span className="n">{a.n}</span>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   JOURNAL
   ============================================================ */
function Journal() {
  const r = useReveal();
  return (
    <section className="sec sec--light journal" id="journal" ref={r}>
      <div className="wrap">
        <div className="shead reveal">
          <div>
            <Kicker>06 — The Journal</Kicker>
            <h2 className="display" style={{ marginTop: 22 }}>Insights</h2>
          </div>
          <p className="lead">Thinking on hospitality, content, and the business of desire. A living platform — updated as we produce.</p>
        </div>
        <div className="jrow">
          {POSTS.map((p, i) => (
            <article className="jcard reveal" data-d={i + 1} key={p.id}>
              <div className="fig"><img src={p.img} alt={p.t} /></div>
              <div className="cat">{p.cat}</div>
              <h3>{p.t}</h3>
              <div className="date">{p.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT / CTA
   ============================================================ */
function Contact({ onBook }) {
  const r = useReveal();
  return (
    <section className="sec sec--dark cta" id="contact" ref={r}>
      <div className="wrap">
        <div className="reveal"><Kicker>07 — Let's talk</Kicker></div>
        <h2
          className="display reveal"
          data-d="1"
          style={{
            fontSize: 'clamp(36px, 7vw, 110px)',
            lineHeight: 0.88,
            letterSpacing: '-0.025em',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
          dangerouslySetInnerHTML={{ __html: COPY.ctaHead }}
        />
        <div className="cta-row">
          <div className="reveal" data-d="2" style={{ maxWidth: '46ch' }}>
            <p className="cta-sub">{COPY.ctaSub}</p>
            <a className="cta-mail" href="mailto:hello@thevoyage.group" style={{ display: 'inline-block', marginTop: 28 }}>
              hello@thevoyage.group
            </a>
          </div>
          <button className="btn-book reveal" data-d="3" onClick={onBook}>
            <span className="dotc" /> Book a discovery call
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="sec sec--dark foot">
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">Voyage<span className="dot">.</span></div>
          <div className="foot-col">
            <h4>Studio</h4>
            <a href="#work">Work</a>
            <a href="#services">Services</a>
            <a href="#journal">Journal</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="foot-col">
            <h4>Connect</h4>
            <a href="https://www.instagram.com/thevoyage.group/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/thevoyage.group" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.tiktok.com/@thevoyage.group" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://www.youtube.com/@TheVoyageGroup" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <div className="foot-col">
            <h4>Studio</h4>
            <p>London · Worldwide</p>
            <a href="mailto:hello@thevoyage.group">hello@thevoyage.group</a>
            <p>+44 (0)20 0000 0000</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 The Voyage Group — Hospitality Media House</span>
          <span>Cinematic · Elevated · Disruptive</span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   VIDEO MODAL
   ============================================================ */
function VideoModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className={`modal video-modal ${open ? 'open' : ''}`} onClick={onClose}>
      <button className="modal-x" onClick={onClose} style={{ color: '#fff', position: 'absolute', top: 20, right: 24 }}>×</button>
      <div className="vbox" onClick={(e) => e.stopPropagation()}>
        {/* Replace with your <video> or iframe embed */}
        <img src="/images/defender-cinematic.jpg" alt="Showreel" />
      </div>
    </div>
  );
}

/* ============================================================
   ENQUIRY MODAL
   ============================================================ */
function EnquiryModal({ open, onClose }) {
  const [data, setData] = useState({ name: '', email: '', brand: '', type: '', msg: '' });
  const [errs, setErrs] = useState({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  useEffect(() => { if (open) { setDone(false); setErrs({}); } }, [open]);

  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!data.name.trim()) er.name = 'Required';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) er.email = 'Enter a valid email';
    if (!data.msg.trim()) er.msg = 'Tell us a little about the project';
    setErrs(er);
    if (Object.keys(er).length === 0) setDone(true);
  };

  return (
    <div className={`modal ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose}>×</button>
        {done ? (
          <div className="modal-done">
            <div className="ok">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3>Thank you</h3>
            <p className="sub" style={{ marginBottom: 0 }}>
              We\u2019ve received your enquiry and will be in touch within one working day to arrange your discovery call.
            </p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <div className="kicker" style={{ marginBottom: 14 }}>Discovery Call</div>
            <h3>Let\u2019s talk</h3>
            <p className="sub">A short conversation about your property, your goals, and how content can move your business.</p>
            <div className={`field ${errs.name ? 'err' : ''}`}>
              <label>Your name</label>
              <input value={data.name} onChange={set('name')} placeholder="Full name" />
              {errs.name && <div className="msg">{errs.name}</div>}
            </div>
            <div className={`field ${errs.email ? 'err' : ''}`}>
              <label>Email</label>
              <input value={data.email} onChange={set('email')} placeholder="you@brand.com" />
              {errs.email && <div className="msg">{errs.email}</div>}
            </div>
            <div className="field">
              <label>Brand / property</label>
              <input value={data.brand} onChange={set('brand')} placeholder="Hotel, resort or group" />
            </div>
            <div className="field">
              <label>What are you looking for?</label>
              <select value={data.type} onChange={set('type')}>
                <option value="">Select…</option>
                <option>Cinematic film / showreel</option>
                <option>Photography library</option>
                <option>Retained content partnership</option>
                <option>Brand & strategy</option>
                <option>Something else</option>
              </select>
            </div>
            <div className={`field ${errs.msg ? 'err' : ''}`}>
              <label>About the project</label>
              <textarea value={data.msg} onChange={set('msg')} placeholder="A few words on the brand and ambition…" />
              {errs.msg && <div className="msg">{errs.msg}</div>}
            </div>
            <button className="btn-book submit" type="submit" style={{ marginTop: 10 }}>
              <span className="dotc" /> Send enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   ROOT PAGE
   ============================================================ */
export default function Page() {
  const [video, setVideo]   = useState(false);
  const [form,  setForm]    = useState(false);
  const [menu,  setMenu]    = useState(false);

  // Lock scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = (video || form || menu) ? 'hidden' : '';
  }, [video, form, menu]);

  return (
    <>
      <GlobalReveal />
      <Nav    onBook={() => setForm(true)} onMenu={() => setMenu(true)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} onBook={() => setForm(true)} />

      <main>
        <Hero       onReel={() => setVideo(true)} onBook={() => setForm(true)} />
        <Statement />
        <Work />
        <Marquee />
        <CaseStudy  onEnquire={() => setForm(true)} />
        <Services />
        <Approach />
        <Journal />
        <Contact    onBook={() => setForm(true)} />
        <Footer />
      </main>

      <VideoModal   open={video} onClose={() => setVideo(false)} />
      <EnquiryModal open={form}  onClose={() => setForm(false)} />
    </>
  );
}
