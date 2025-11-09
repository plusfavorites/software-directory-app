import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./sanity/**/*.{ts,tsx}",
    "./studio/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#0078D7",
          foreground: "#F5FBFF",
        },
        surface: "#F7F9FC",
        border: "#E4E7ED",
      },
    },
  },
  plugins: [animate],
};

export default config;
