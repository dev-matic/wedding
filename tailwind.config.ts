import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm off-white ground and soft near-black ink (echoes the card stock).
        paper: "#FAF8F5",
        "paper-dim": "#F1ECE4",
        ink: "#1C1A17",
        "ink-soft": "#4A453E",
        "ink-faint": "#8A8378",
        // Palette drawn from the invitation: navy ink + gold, terracotta pop.
        accent: "#2E3C56", // deep navy — eyebrows, links, rules
        "accent-soft": "#BE9E52", // muted gold — decorative numerals, selection
        terracotta: "#B5623A", // burnt-orange accent, as on the roses
        hairline: "#DAD2C6",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-body)", "Georgia", "serif"],
        sans: ["var(--font-ui)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial scale — large jump between eyebrow and title.
        eyebrow: ["0.72rem", { lineHeight: "1.2", letterSpacing: "0.24em" }],
        display: ["clamp(3rem, 10vw, 7.5rem)", { lineHeight: "0.95" }],
        "display-sm": ["clamp(2.25rem, 6vw, 4rem)", { lineHeight: "1.0" }],
        numeral: ["clamp(3.5rem, 12vw, 9rem)", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        eyebrow: "0.24em",
        wide: "0.16em",
      },
      maxWidth: {
        reading: "38rem",
        issue: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
