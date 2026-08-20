import { couple } from "@/lib/content";

const LINKS = [
  { label: "Our Story", href: "#story" },
  { label: "The Wedding", href: "#details" },
  { label: "Gallery", href: "#gallery" },
  { label: "Gifts", href: "#registry" },
  { label: "RSVP", href: "#rsvp" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-paper/10 bg-[#0a0a0b] px-5 py-16 text-center md:px-8">
      <a
        href="#top"
        className="font-display text-3xl text-paper transition-colors hover:text-[#e7c766]"
      >
        {couple.partnerA} <span className="text-[#e7c766]">&amp;</span>{" "}
        {couple.partnerB}
      </a>

      <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/60">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="transition-colors hover:text-[#e7c766]"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <p className="mt-9 font-sans text-eyebrow uppercase tracking-[0.35em] text-[#e7c766]/85">
        21 . 11 . 2026
      </p>
      <p className="mt-2 font-serif text-lg italic text-paper/55">
        {couple.theme}
      </p>

      <a
        href="#top"
        className="mt-8 inline-flex items-center gap-2 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/45 transition-colors hover:text-[#e7c766]"
      >
        Back to top <span aria-hidden>↑</span>
      </a>
    </footer>
  );
}
