import Link from "next/link";
import { couple } from "@/lib/content";

const LINKS = [
  { label: "Our Story", href: "/story" },
  { label: "The Wedding", href: "/details" },
  { label: "Gallery", href: "/gallery" },
  { label: "Gifts", href: "/registry" },
  { label: "RSVP", href: "/rsvp" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-paper-dim px-5 py-16 text-center md:px-8">
      <Link
        href="/"
        className="font-display text-3xl text-ink transition-colors hover:text-[#a8842c]"
      >
        {couple.partnerA} <span className="text-[#a8842c]">&amp;</span>{" "}
        {couple.partnerB}
      </Link>

      <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="transition-colors hover:text-[#a8842c]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <p className="mt-9 font-sans text-eyebrow uppercase tracking-[0.35em] text-[#a8842c]">
        21 . 11 . 2026
      </p>
      <p className="mt-2 font-serif text-lg italic text-ink-soft">
        {couple.theme}
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint transition-colors hover:text-[#a8842c]"
      >
        Back to top <span aria-hidden>↑</span>
      </Link>
    </footer>
  );
}
