import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sarabun)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "var(--font-noto-serif-thai)", "Georgia", "serif"],
        serif: ["var(--font-playfair)", "var(--font-noto-serif-thai)", "Georgia", "serif"],
      },
      colors: {
        navy: {
          50: "#eef3fb",
          100: "#d6e1f4",
          200: "#aec4e9",
          300: "#7f9fda",
          400: "#5278c6",
          500: "#345aad",
          600: "#28478c",
          700: "#243a5e",
          800: "#14223A",
          900: "#0a1426",
          950: "#050d18",
        },
        // canonical TOPMANIDMB "Living Emblem" gold — ONE gold only: #FFCB2D (BRAND.md)
        brand: {
          50: "#FFF8E1",
          100: "#FFEFB8",
          200: "#FFE28A",
          300: "#FFE28A",
          400: "#FFD03E",
          500: "#FFCB2D",
          600: "#D9A50F",
          700: "#A87E0A",
          800: "#74570B",
          900: "#4A380A",
        },
        gold: {
          DEFAULT: "#FFCB2D",
          light: "#FFE28A",
          400: "#FFE28A",
          500: "#FFCB2D",
          600: "#D9A50F",
        },
        ivory: {
          DEFAULT: "#F7F3EA",
          50: "#FBF8F1",
          100: "#F7F3EA",
          200: "#ECE3CF",
        },
        paper: "#FFFDF8",
        line: "#E6DECB",
        lab: {
          accent: "#FFCB2D",
          success: "#2E7D5B",
          warn: "#C7972E",
          danger: "#B0463C",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,22,38,0.04), 0 8px 24px -12px rgba(11,22,38,0.18)",
        "card-hover": "0 4px 8px rgba(11,22,38,0.06), 0 16px 40px -16px rgba(11,22,38,0.28)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;