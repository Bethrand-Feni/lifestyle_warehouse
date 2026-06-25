import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#102615',
          900: '#14331c',
          850: '#183d23',
          800: '#1f4a2a',
        },
        olive: {
          700: '#596326',
          600: '#6d7832',
          500: '#8b9451',
          300: '#c4c99c',
          200: '#d6dbb3',
        },
        cream: {
          50: '#fbfaf1',
          100: '#f5f2e7',
          200: '#eee8d7',
        },
        tan: {
          100: '#eadcc6',
          200: '#d9c39f',
          300: '#c7a371',
        },
        gold: {
          300: '#d7bb76',
          400: '#c9a75a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 55px rgb(16 38 21 / 0.16)',
        insetGlow: 'inset 0 1px 0 rgb(255 255 255 / 0.16)',
      },
      backgroundImage: {
        leafshade:
          'radial-gradient(circle at 76% 20%, rgb(80 112 64 / 0.34), transparent 30%), linear-gradient(120deg, #16331d 0%, #1d4427 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config
