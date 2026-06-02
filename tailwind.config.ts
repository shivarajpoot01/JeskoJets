import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0d0d0d',
        border: '#1a1a1a',
        muted: '#555555',
        text: '#f0ece4',
        accent: '#c8b99a',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.4em',
      },
      boxShadow: {
        glow: '0 0 80px rgba(200, 185, 154, 0.18)',
      },
    },
  },
  plugins: [],
}

export default config
