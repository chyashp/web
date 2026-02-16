import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#ffd7b5",
          300: "#ffb088",
          400: "#ff8d5c",
          500: "#FF6B2B",
          600: "#f85a1a",
          700: "#e54712",
          800: "#c53812",
          900: "#a12f14",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        navy: {
          50: "#e6eef7",
          100: "#ccddef",
          200: "#99bbe0",
          300: "#6699d0",
          400: "#3377c1",
          500: "#1a365d",
          600: "#162d4e",
          700: "#11243f",
          800: "#0d1b30",
          900: "#081221",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "SF Pro Text",
          "SF Pro Display",
          "BlinkMacSystemFont",
          "var(--font-inter)",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.024em",
        tight: "-0.019em",
        normal: "-0.011em",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-out": "fade-out 0.5s ease-out",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
