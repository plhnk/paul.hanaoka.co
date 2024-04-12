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
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
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
      addVariant('fun', `:is(.fun &)`);
      addVariant('business', `:is(.business &)`);
    },
    require('tailwindcss-animate'),
  ],
  purge: {
    enabled: true,
  },
} satisfies Config;

export default config;
