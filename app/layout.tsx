import type { Metadata, Viewport } from "next";
import { body, display, ui } from "./fonts";
import { couple, ogImage, siteUrl } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${couple.names} — ${couple.issueLabel}`,
    template: `%s — ${couple.names}`,
  },
  description: `${couple.names} are getting married in ${couple.city}. Read the issue: the story, the details, and how to RSVP.`,
  keywords: [
    couple.names,
    "wedding",
    couple.city,
    couple.hashtag,
    "RSVP",
    "wedding invitation",
  ],
  authors: [{ name: couple.names }],
  openGraph: {
    title: `${couple.names} — ${couple.issueLabel}`,
    description: `${couple.names} are getting married in ${couple.city}.`,
    url: siteUrl,
    siteName: `${couple.names} — ${couple.issueLabel}`,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: ogImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${couple.names} — ${couple.issueLabel}`,
    description: `${couple.names} are getting married in ${couple.city}.`,
    images: [ogImage.src],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${ui.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
