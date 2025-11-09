import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './studio/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        hippo: {
          DEFAULT: '#0B63CE',
          dark: '#094f9f',
        },
      },
    },
  },
  plugins: [],
};

export default config;
