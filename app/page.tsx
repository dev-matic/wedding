import Image from "next/image";
import Link from "next/link";
import { couple, coverPhoto } from "@/lib/content";

/**
 * The Cover. Full-bleed portrait image (~2:3), monogram top-left with a
 * "COVER" label, the couple, and a single way in: "Contents →".
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
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/75" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-8 md:px-12 md:py-10">
        {/* Monogram top-left with a COVER label */}
        <header className="flex items-start justify-between">
          <div>
            <span className="font-display text-2xl tracking-wide text-paper">
              {couple.monogram}
            </span>
            <p className="mt-1 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/70">
              Cover
            </p>
          </div>
          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/70">
            {couple.issueNo}
          </p>
        </header>

        <div className="mx-auto max-w-4xl pb-4 text-center md:pb-10">
          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/80">
            {couple.issueLabel}
          </p>
          <h1 className="mt-6 font-display text-display font-medium leading-[0.95] text-paper">
            {couple.partnerA}
            <span className="mx-3 font-normal italic text-paper/80">&amp;</span>
            {couple.partnerB}
          </h1>
          <p className="mt-6 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/80">
            {couple.city} &nbsp;·&nbsp; {couple.year}
          </p>
        </div>

        <footer className="flex flex-col items-center gap-5">
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
