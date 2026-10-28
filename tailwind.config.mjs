import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        dev: {
          heart: '#ef4444',
          rocket: '#8b5cf6',
          bulb: '#eab308',
          bookmark: '#3b82f6',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'Newsreader',
          'Charter',
          'Georgia',
          'Cambria',
          '"Times New Roman"',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: '720px',
            color: 'inherit',
            lineHeight: '1.8',
            fontSize: '1.125rem',
            p: {
              marginBottom: '1.5em',
            },
            h1: {
              fontWeight: '800',
              letterSpacing: '-0.025em',
            },
            h2: {
              fontWeight: '700',
              letterSpacing: '-0.02em',
              marginTop: '2em',
              marginBottom: '0.8em',
            },
            h3: {
              fontWeight: '600',
              marginTop: '1.6em',
              marginBottom: '0.6em',
            },
            code: {
              color: 'inherit',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              fontStyle: 'italic',
              borderLeftColor: theme('colors.emerald.500'),
              borderLeftWidth: '4px',
              paddingLeft: '1.25rem',
              quotes: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
};
