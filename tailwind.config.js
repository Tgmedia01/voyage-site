/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class' lets next-themes toggle dark by adding the 'dark'
  // class to <html>, which Tailwind's dark: variant then responds to.
  darkMode: 'class',

  // Tell Tailwind which files to scan for class names.
  // App Router lives in app/, components will live in components/.
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
  ],

  theme: {
    extend: {
      // ── Brand color palette ──────────────────────────────────────────────
      // These map CSS custom properties (set in globals.css) into Tailwind
      // utility classes: bg-background, text-foreground, bg-accent, etc.
      colors: {
        background:       'var(--background)',
        foreground:       'var(--foreground)',
        accent:           'var(--accent)',
        muted:            'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
      },

      // ── Typography ────────────────────────────────────────────────────────
      // Maps CSS variables injected by next/font into Tailwind font utilities:
      // font-display, font-heading, font-body, font-mono
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        heading:  ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body:     ['var(--font-body)',    'system-ui', 'sans-serif'],
        mono:     ['var(--font-mono)',    'monospace'],
      },

      // ── Border radius — strict zero ───────────────────────────────────────
      borderRadius: {
        none: '0',
        sm:   '0',
        md:   '0',
        lg:   '0',
        xl:   '0',
        '2xl': '0',
        full: '9999px', // kept for cursor-dot only
      },
    },
  },

  plugins: [],
}
