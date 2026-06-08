import {
  Cormorant_Garamond,
  Bricolage_Grotesque,
  Inter_Tight,
  JetBrains_Mono,
} from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'

/* ─────────────────────────────────────────────────────────────────────────────
   TYPOGRAPHY — four-slot editorial system
   ─────────────────────────────────────────────────────────────────────────── */

/**
 * DISPLAY — Cormorant Garamond
 * High-contrast editorial serif with optical sizing and true italics.
 * Used for: hero headlines, chapter titles, pull-quotes, the site wordmark
 * in editorial contexts. Brings the warmth of classic magazine typography
 * to hospitality branding.
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

/**
 * HEADING — Bricolage Grotesque (variable)
 * Expressive wide variable sans with optical-size and width axes.
 * Used for: nav wordmark, menu overlay links, sub-headings, section labels.
 * Retains the bold presence from the original v0 build for brand continuity.
 * Apply fontVariationSettings: "'wdth' 100, 'opsz' 96" inline where needed.
 */
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  axes: ['opsz', 'wdth'],
})

/**
 * BODY — Inter Tight
 * Compressed, highly legible sans for navigation labels, body copy,
 * UI components, captions, and credits strips.
 */
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

/**
 * MONO — JetBrains Mono
 * For section IDs, timecodes, scroll indicators, and technical metadata.
 */
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

/* ─────────────────────────────────────────────────────────────────────────────
   SITE CONSTANTS
   Update here — propagate to all metadata and JSON-LD automatically.
   ─────────────────────────────────────────────────────────────────────────── */
const SITE_URL     = 'https://www.thevoyagegroup.com'
const SITE_NAME    = 'Voyage'
const SITE_TITLE   = 'Voyage — A Studio for Hospitality Brands'
const SITE_TAGLINE = "We don't make content. We make the language a brand uses to speak to the world."
// TODO: Replace with a real branded 1200×630 OG image on your CDN
const OG_IMAGE_URL = `${SITE_URL}/og-image.jpg`

/* ─────────────────────────────────────────────────────────────────────────────
   NEXT.JS METADATA API
   AI search engines (Perplexity, ChatGPT, Gemini, Claude) rely on:
     1. Accurate title + description for entity extraction
     2. openGraph.type and structured property fields
     3. A canonical URL to resolve brand disambiguation
     4. Twitter/X cards for rich preview generation
   ─────────────────────────────────────────────────────────────────────────── */
export const metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,   // e.g. "Journal — Voyage"
  },
  description: SITE_TAGLINE,

  // ── Canonical & Indexing ──────────────────────────────────────────────────
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — A studio for hospitality brands. Brand films, photography, and content strategy.`,
        type: 'image/jpeg',
      },
    ],
  },

  // ── Twitter / X ───────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_TAGLINE,
    images: [OG_IMAGE_URL],
    // TODO: add once confirmed → creator: '@voyagegroup'
  },

  // ── Favicons ──────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg',            type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/icon-dark-32x32.png',
  },

  // ── Discovery & categorisation ────────────────────────────────────────────
  applicationName: SITE_NAME,
  keywords: [
    'hospitality branding studio',
    'luxury hotel brand film',
    'hospitality content strategy',
    'hotel photography',
    'resort brand identity',
    'hospitality video production',
    'hotel marketing agency',
    'luxury brand storytelling',
  ],
  authors:   [{ name: SITE_NAME, url: SITE_URL }],
  creator:   SITE_NAME,
  publisher: SITE_NAME,
  category:  'Creative Agency',
}

export const viewport = {
  themeColor:   '#0B0B0A',
  width:        'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD STRUCTURED DATA
   Inlined in <head> so AI crawlers (GPTBot, PerplexityBot, ClaudeBot, Gemini)
   parse the entity data at request time — before any client JS runs.

   Organization schema tells AI engines:
     • What Voyage is (a creative agency / professional service)
     • What it does (service types with descriptions)
     • How to contact it (email)
     • Where to find it on the web (sameAs social profiles)

   WebSite schema establishes the canonical site entity so the brand
   isn't confused with other "Voyage" entities in AI knowledge graphs.

   TODO fields: replace placeholder values before launch.
   ─────────────────────────────────────────────────────────────────────────── */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService'],
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'The Voyage Group',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/icon.svg`,
    contentUrl: `${SITE_URL}/icon.svg`,
  },
  description: SITE_TAGLINE,
  email: 'hello@thevoyagegroup.com',   // TODO: verify before launch
  sameAs: [
    // TODO: Add verified social URLs before launch
    // 'https://www.instagram.com/thevoyagegroup',
    // 'https://www.linkedin.com/company/thevoyagegroup',
    // 'https://vimeo.com/voyagegroup',
  ],
  knowsAbout: [
    'Hospitality Brand Strategy',
    'Luxury Hotel Marketing',
    'Brand Film Production',
    'Commercial Photography',
    'Social Content Creation',
    'Art Direction',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Voyage Studio Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brand Film Production',
          description:
            'Cinematic short films and campaign videos crafted for luxury hospitality brands.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Hospitality Photography',
          description:
            'Editorial and commercial photography for hotels, resorts, and restaurants.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Brand Strategy & Identity',
          description:
            'Positioning, visual language, and narrative systems for hospitality brands.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Social Content Creation',
          description:
            'Ongoing content programmes built for hospitality brands across Instagram, TikTok, and beyond.',
        },
      },
    ],
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_TAGLINE,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'en-GB',
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
   ─────────────────────────────────────────────────────────────────────────── */
export default function RootLayout({ children }) {
  return (
    <html
      lang="en-GB"
      className={`
        ${cormorant.variable}
        ${bricolage.variable}
        ${interTight.variable}
        ${jetbrains.variable}
        bg-background
      `}
      suppressHydrationWarning
    >
      <head>
        {/*
          JSON-LD structured data — inlined here so AI crawlers and
          search engines encounter organisation + website entity data
          at parse time, before any client-side JavaScript executes.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>

      <body className="font-body antialiased">
        {/*
          ThemeProvider — imported directly from next-themes (no local
          wrapper needed). forcedTheme="dark" locks the site to the
          brand dark palette permanently. Remove forcedTheme if you
          want to offer a user-controlled light/dark toggle later.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}

          {/*
            Toaster — imported directly from sonner. Positioned
            bottom-right; respects the dark theme automatically.
            Trigger toasts anywhere in the app with:
            import { toast } from 'sonner'
            toast('Message sent.')
          */}
          <Toaster position="bottom-right" />
        </ThemeProvider>

        {/*
          Analytics — Vercel's privacy-respecting page-view tracking.
          Placed outside ThemeProvider (it has no UI output).
          No configuration needed — works automatically on Vercel.
        */}
        <Analytics />
      </body>
    </html>
  )
}
