import Image from "next/image";
import Link from "next/link";
import { couple, coverPhoto } from "@/lib/content";
import SiteMenu from "@/components/SiteMenu";

/**
 * The Cover — an editorial magazine front page. A full-bleed portrait sits
 * behind a masthead (monogram, issue line, hashtag), a pair of cover
 * "teasers" (INSIDE / PLUS), the couple set large in two tones, a tagline,
 * an "Open Issue" way in, and a bottom row of chapter links. A hamburger
 * menu opens the full index.
 */

/** English ordinal suffix for the day of the month, e.g. 21 -> "st". */
function ordinal(n: number): string {
  const v = n % 100;
  if (v >= 11 && v <= 13) return "th";
  return { 1: "st", 2: "nd", 3: "rd" }[n % 10] ?? "th";
}

const coverNav = [
  { label: "The Love Story", href: "/story" },
  { label: "Photo Gallery", href: "/gallery" },
  { label: "Wedding Details", href: "/details" },
  { label: "RSVP", href: "/rsvp" },
  { label: "Trivia", href: "/trivia" },
];

export default function Cover() {
  const initials = `${couple.partnerA[0]} & ${couple.partnerB[0]}`;
  const dayNum = parseInt(couple.weddingDay.date, 10);
  const month = couple.weddingDay.date.replace(/^\d+\s/, "");
  const bigDate =
    `${dayNum}${ordinal(dayNum)} ${month} ${couple.weddingDay.year}`.toUpperCase();
  const cityShort = couple.city.split(",")[0];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink text-paper">
      {/* Full-bleed cover image */}
      <Image
        src={coverPhoto.src}
        alt={coverPhoto.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Legibility washes — vertical for the type top and bottom, a touch on the sides */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-transparent to-ink/30" />

      <div className="relative z-10 flex min-h-screen flex-col px-6 py-6 md:px-12 md:py-8">
        {/* Top bar — menu */}
        <div className="flex items-start justify-end">
          <SiteMenu tone="onDark" />
        </div>

        {/* Masthead */}
        <header className="mt-1 flex flex-col items-center text-center md:mt-3">
          <div className="flex items-center gap-3">
            <span className="hidden h-1.5 w-1.5 rounded-full bg-accent-soft md:block" />
            <span className="font-display text-7xl font-medium leading-none tracking-tight text-paper md:text-8xl lg:text-[8.5rem]">
              {initials}
            </span>
          </div>
          <p className="mt-4 font-sans text-eyebrow uppercase tracking-[0.42em] text-paper/75">
            {couple.issueLabel}
          </p>
          <p className="mt-2.5 font-sans text-eyebrow uppercase tracking-[0.42em] text-accent-soft">
            {couple.hashtag}
          </p>
        </header>

        {/* Cover teasers — issue meta left, INSIDE/PLUS right */}
        <div className="mt-8 flex flex-1 items-start justify-between gap-6">
          <div className="space-y-1 font-sans text-eyebrow uppercase leading-relaxed tracking-eyebrow text-paper/75">
            <p>Autumn {couple.year}</p>
            <p>Issue {couple.issueNo}</p>
            <p className="text-paper/55">{cityShort}</p>
          </div>

          <div className="hidden max-w-[14rem] text-right md:block">
            <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-accent-soft">
              Inside
            </p>
            <p className="mt-1.5 font-serif text-xl italic leading-tight text-paper">
              Our Love Story
            </p>
            <p className="mt-1 font-serif text-base italic leading-snug text-paper/70">
              A phone call, a thoughtful introduction, and forever.
            </p>
            <p className="mt-6 font-sans text-eyebrow uppercase tracking-eyebrow text-accent-soft">
              Plus
            </p>
            <p className="mt-1.5 font-serif text-xl italic leading-tight text-paper">
              An Intimate Gallery
            </p>
          </div>
        </div>

        {/* The couple, set large */}
        <div className="mt-10">
          <h1 className="font-display font-medium leading-[0.9]">
            <span className="block text-6xl italic text-paper md:text-8xl lg:text-9xl">
              {couple.partnerA}
            </span>
            <span className="block text-6xl md:text-8xl lg:text-9xl">
              <span className="italic text-accent-soft">&amp;</span>{" "}
              <span className="text-paper">{couple.partnerB}</span>
            </span>
          </h1>
          <p className="mt-5 font-sans text-eyebrow uppercase tracking-[0.32em] text-paper/75">
            {bigDate}
          </p>
        </div>

        {/* Tagline + Open Issue */}
        <div className="mt-9 flex items-end justify-between gap-6">
          <p className="font-serif text-2xl leading-tight text-paper md:text-3xl">
            A celebration of
            <br />
            <span className="italic text-accent-soft">love &amp; grace</span>
          </p>
          <Link
            href="/contents"
            className="group hidden shrink-0 items-center gap-3 border border-paper/50 px-8 py-3.5 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:border-accent-soft hover:bg-accent-soft hover:text-ink sm:inline-flex"
          >
            Open Issue
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* Mobile Open Issue — full width, since the inline one is hidden on small screens */}
        <Link
          href="/contents"
          className="mt-6 flex items-center justify-center gap-3 border border-paper/50 px-8 py-3.5 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:border-accent-soft hover:bg-accent-soft hover:text-ink sm:hidden"
        >
          Open Issue <span>&rarr;</span>
        </Link>

        {/* Bottom chapter nav */}
        <div className="mt-8 flex items-center justify-between gap-4 border-t border-paper/15 pt-4">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/70">
            {coverNav.map((item, i) => (
              <span key={item.href} className="flex items-center gap-3">
                <Link
                  href={item.href}
                  className="transition-colors hover:text-accent-soft"
                >
                  {item.label}
                </Link>
                {i < coverNav.length - 1 ? (
                  <span aria-hidden className="text-paper/30">
                    &middot;
                  </span>
                ) : null}
              </span>
            ))}
          </nav>
          <span className="hidden shrink-0 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/40 md:block">
            Cover
          </span>
        </div>
      </div>
    </main>
  );
}
