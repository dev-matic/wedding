import Reveal from "@/components/Reveal";
import { couple, details, invitation } from "@/lib/content";

function Anchor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 82"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="32" cy="9" r="6" />
      <line x1="32" y1="15" x2="32" y2="72" />
      <line x1="19" y1="26" x2="45" y2="26" />
      <path d="M7 44 C7 66 32 76 32 76 C32 76 57 66 57 44" />
      <path d="M7 44 L1.5 50 M7 44 L13 50.5" />
      <path d="M57 44 L51 50.5 M57 44 L62.5 50" />
    </svg>
  );
}

export default function DetailsSection() {
  const day = couple.weddingDay;
  return (
    <section id="details" className="scroll-mt-4 bg-[#0d0e11] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-issue text-center">
        <Reveal>
          <Anchor className="mx-auto h-12 w-12 text-[#e7c766]" />
          <p className="mt-6 font-sans text-eyebrow uppercase tracking-[0.4em] text-[#e7c766]">
            The Wedding
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-paper md:text-6xl">
            Join us to celebrate
          </h2>
        </Reveal>

        <Reveal delay={60} className="mt-14">
          <p className="font-sans text-eyebrow uppercase tracking-[0.35em] text-paper/60">
            {day.day}
          </p>
          <p className="mt-4 font-display text-3xl text-paper md:text-5xl">
            {day.date} {day.year}
          </p>
          <p className="mt-3 font-serif text-xl italic text-paper/70">
            at two o&rsquo;clock in the afternoon
          </p>
        </Reveal>

        <span aria-hidden className="mx-auto my-12 block h-px w-16 bg-[#e7c766]/50" />

        <Reveal delay={60}>
          <p className="font-sans text-eyebrow uppercase tracking-[0.35em] text-[#e7c766]">
            Venue
          </p>
          <p className="mt-4 font-display text-2xl text-paper md:text-3xl">
            {invitation.venue.name}
          </p>
          <p className="mt-2 font-serif text-lg text-paper/75 md:text-xl">
            {invitation.venue.detail}
            <br />
            37&ndash;39 Grange Park Road, Leyton · London E10 5EP
          </p>
          <a
            href={details.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-3 border border-[#e7c766]/60 px-6 py-3 font-sans text-eyebrow uppercase tracking-eyebrow text-[#e7c766] transition-colors hover:bg-[#e7c766] hover:text-black"
          >
            View map <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>

        <div className="mt-16 grid gap-8 text-left sm:grid-cols-3 md:mt-20">
          {details.travel.slice(0, 3).map((t, i) => (
            <Reveal key={t.title} delay={i * 70}>
              <div className="border-t border-paper/12 pt-5">
                <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-[#e7c766]">
                  {t.label}
                </p>
                <p className="mt-2 font-display text-xl text-paper">{t.title}</p>
                <p className="mt-2 font-serif text-base leading-relaxed text-paper/65">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-[#e7c766] md:text-3xl">
            &ldquo;{invitation.scripture}&rdquo;
          </p>
          <p className="mt-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/50">
            {invitation.scriptureRef}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
