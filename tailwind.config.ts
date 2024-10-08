import type { Config } from 'tailwindcss';
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

const config = {
  darkMode: ['class'],
  content: [
    './src/**/*.tsx',
    './src/app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/pages/**/*.{js,jsx,ts,tsx,md,mdx}',
  ],
  theme: {
    boxShadow: {
      // x y blur spread color
      focus: '0 0 1rem .1rem rgb(var(--accent)/.08);',
      menu: '0 0 5rem 5rem rgb(var(--dark)/.08);',
      elevate:
        '0 .5rem 5rem -1rem rgb(var(--dark)/.08), 0 .25rem 1.5rem -1rem rgb(var(--dark)/.2);',
      bgBlend: 'inset 0 0 4rem 2rem rgb(var(--background));',
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
      backgroundImage: {
        'transparent-window':
          'linear-gradient(to right, rgb(var(--background)) 0%, rgb(var(--background)) 3%, transparent 15%, transparent 85%, rgb(var(--background)) 97%, rgb(var(--background)) 100%)',
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
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      screens: {
        md: '1000px',
        lg: '1400px',
        xl: '1700px',
        '2xl': '2400px',
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
// TODO --> remove typography plugin
