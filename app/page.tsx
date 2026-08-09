import Image from "next/image";
import Link from "next/link";
import { couple, coverPhoto } from "@/lib/content";

/**
 * The Cover. Full-bleed portrait image, masthead, monogram and a single
 * way in: "Contents →". No running header here — the issue starts overleaf.
 */
export default function Cover() {
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
      {/* Legibility wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-ink/70" />

      {/* Masthead */}
      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-12 md:py-10">
        <header className="flex items-start justify-between">
          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/80">
            {couple.issueLabel}
          </p>
          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/80">
            {couple.issueNo}
          </p>
        </header>

        <div className="mx-auto max-w-4xl pb-8 text-center md:pb-16">
          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/80">
            {couple.city} &nbsp;·&nbsp; {couple.year}
          </p>
          <h1 className="mt-6 font-display text-display font-medium leading-[0.95] text-paper">
            {couple.partnerA}
            <span className="mx-3 font-normal italic text-paper/80">&amp;</span>
            {couple.partnerB}
          </h1>
          <p className="mt-6 font-serif text-xl italic text-paper/85 md:text-2xl">
            are getting married
          </p>
        </div>

        <footer className="flex flex-col items-center gap-6">
          <span className="font-display text-2xl tracking-wide text-paper/90">
            {couple.monogram}
          </span>
          <Link
            href="/contents"
            className="group inline-flex items-center gap-3 border border-paper/50 px-8 py-3.5 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
          >
            Contents
            <span className="transition-transform group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/60">
            {couple.hashtag}
          </p>
        </footer>
      </div>
    </main>
  );
}
