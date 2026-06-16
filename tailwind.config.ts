import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sarabun)", "system-ui", "sans-serif"],
        display: ["var(--font-ibm-thai)", "var(--font-sarabun)", "sans-serif"],
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
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        lab: {
          accent: "#0ea5e9",
          success: "#059669",
          warn: "#d97706",
          danger: "#dc2626",
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