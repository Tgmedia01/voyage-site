import { Syne, DM_Mono, Space_Grotesk, Newsreader } from 'next/font/google';
import './globals.css';

/* ─── Font declarations ─────────────────────────────────────────────────────
   Syne       → display headers  (weight 700–800, line-height 0.85 enforced in CSS)
   DM Mono    → labels, kickers, metrics
   Space Grotesk → body copy, UI chrome
   Newsreader → editorial serif accents (italics, pull-quotes)
   ─────────────────────────────────────────────────────────────────────────── */

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata = {
  title: 'The Voyage Group — Hospitality Media House',
  description:
    'The leading media powerhouse for the global hospitality industry. Cinematic marketing assets that maximise visibility, drive direct bookings, and elevate luxury travel brands.',
  openGraph: {
    title: 'The Voyage Group — Hospitality Media House',
    description: 'Cinematic · Elevated · Disruptive',
    url: 'https://thevoyage.group',
    siteName: 'The Voyage Group',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${spaceGrotesk.variable} ${newsreader.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
