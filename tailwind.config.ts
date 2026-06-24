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
          900: "#0B1626",
          950: "#060e1a",
        },
        // canonical TOPMANIDMB "Living Emblem" gold — ONE gold only: #C9A24B (BRAND.md)
        brand: {
          50: "#FBF5E4",
          100: "#F5E8C7",
          200: "#EAD49A",
          300: "#E8C877",
          400: "#D8B45C",
          500: "#C9A24B",
          600: "#A9842F",
          700: "#876728",
          800: "#654D20",
          900: "#433318",
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E8C877",
          400: "#E8C877",
          500: "#C9A24B",
          600: "#A9842F",
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
          accent: "#C9A24B",
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