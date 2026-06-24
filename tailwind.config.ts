import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sarabun)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "var(--font-noto-serif-thai)", "Georgia", "serif"],
        serif: ["var(--font-fraunces)", "var(--font-noto-serif-thai)", "Georgia", "serif"],
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
          700: "#21396f",
          800: "#1b2d56",
          900: "#0f1d3a",
          950: "#091327",
        },
        // remapped blue → editorial gold so every existing `brand-*` accent turns warm in one move
        brand: {
          50: "#FBF6EC",
          100: "#F3E9D2",
          200: "#E7D3A8",
          300: "#D8BB7B",
          400: "#C9A86A",
          500: "#B0894D",
          600: "#9A763F",
          700: "#7E5F33",
          800: "#5F4827",
          900: "#43331C",
        },
        gold: {
          DEFAULT: "#B0894D",
          400: "#C9A86A",
          500: "#B0894D",
          600: "#9A763F",
        },
        ivory: {
          DEFAULT: "#F4EFE3",
          50: "#FBF8F0",
          100: "#F4EFE3",
          200: "#EAE1CE",
        },
        paper: "#FFFDF7",
        lab: {
          accent: "#B0894D",
          success: "#3E7A57",
          warn: "#B0894D",
          danger: "#B0544A",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(15,29,58,0.04), 0 8px 24px -12px rgba(15,29,58,0.18)",
        "card-hover": "0 4px 8px rgba(15,29,58,0.06), 0 16px 40px -16px rgba(15,29,58,0.28)",
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