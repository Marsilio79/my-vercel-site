import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        serif: ["Playfair Display", "Times New Roman", "Georgia", "serif"],
      },
      colors: {
        // Custom GMGVisual color palette
        background: "#F5F7F8",
        surface: "#FFFFFF",
        textPrimary: "#2E2E2E",
        textMuted: "#6D7B8A",
        highlight: "#C3D6C4",
        danger: "#D97B66",

        // Keep existing shadcn colors for components
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#44F8A8",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A9A44C",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "#D97B66",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F7F8",
          foreground: "#6D7B8A",
        },
        accent: {
          DEFAULT: "#C3D6C4",
          foreground: "#2E2E2E",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#2E2E2E",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#2E2E2E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
