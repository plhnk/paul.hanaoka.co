import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    boxShadow: {
      // x y blur spread color
      focus: '0 0 1rem .1rem rgb(var(--accent)/.08);',
      menu: '0 0 5rem 5rem rgb(var(--dark)/.08);',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'rgb(var(--background))',
        text: 'rgb(var(--text))',
        card: 'rgb(var(--card))',
        element: 'rgb(var(--element))',
        accent: 'rgb(var(--accent))',
      },
      borderRadius: {
        xl: '1rem',
      },
      fontFamily: {
        sans: [
          'var(--font-fira-sans)',
          'Fira Sans',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          'var(--font-fira-code)',
          'Fira Code',
          ...defaultTheme.fontFamily.mono,
        ],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }: { addComponents: any }) {
      addComponents({
        // '.radix-themes': {
        //   '--default-font-family': [config.theme.extend.fontFamily.sans],
        //   '--mono-font-family': [config.theme.extend.fontFamily.mono],
        // },
      });
    }),
    function ({ addVariant }: { addVariant: any }) {
      addVariant('elite', `:is(.elite &)`);
      addVariant('exec', `:is(.exec &)`);
    },
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config;

export default config;
