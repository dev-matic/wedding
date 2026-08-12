import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  Archivo,
} from "next/font/google";

/**
 * Fonts self-hosted at build time via next/font — no external requests at
 * runtime. Display is a high-contrast serif; body a quieter serif; UI a
 * calm sans for eyebrows, labels and navigation.
 */

export const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const body = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const ui = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ui",
  display: "swap",
});

/** Light neo-grotesque for large display headings — the guaranteed Light (300)
 *  fallback where Helvetica Neue isn't available (Windows, Android). */
export const grotesque = Archivo({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-grotesque",
  display: "swap",
});
