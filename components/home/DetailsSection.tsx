import Image from "next/image";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import { details, invitation } from "@/lib/content";

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

type Ceremony = (typeof details.ceremonies)[number];

function Ceremony({ event }: { event: Ceremony }) {
  const imageLeft = event.imageSide === "left";
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
      {/* Image */}
      <Reveal className={imageLeft ? "md:order-1" : "md:order-2"}>
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/5">
          <Image
            src={event.photo.src}
            alt={event.photo.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <p className="mt-4 flex items-center gap-3 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
          <span aria-hidden className="h-px w-8 bg-[#a8842c]" />
          {event.kicker}
        </p>
      </Reveal>

      {/* Text */}
      <Reveal delay={80} className={imageLeft ? "md:order-2" : "md:order-1"}>
        <p className="font-sans text-eyebrow uppercase tracking-[0.35em] text-[#a8842c]">
          {event.kicker}
        </p>
        <h3 className="mt-4 font-display text-4xl font-medium leading-tight text-ink md:text-5xl">
          {event.title}
        </h3>
        <p className="mt-5 max-w-md font-serif text-lg leading-relaxed text-ink-soft">
          {event.body}
        </p>
        {event.note ? (
          <p className="mt-5 inline-block border border-[#a8842c]/50 px-4 py-2 font-sans text-eyebrow uppercase tracking-eyebrow text-[#a8842c]">
            {event.note}
          </p>
        ) : null}

        {event.target ? (
          <Countdown target={event.target} compact className="mt-8 justify-start" />
        ) : null}

        <span aria-hidden className="my-8 block h-px w-16 bg-[#a8842c]/40" />

        <dl className="space-y-6">
          {event.rows.map((row) => (
            <div key={row.label}>
              <dt className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
                {row.label}
              </dt>
              <dd className="mt-1.5 font-display text-xl text-ink">
                {row.value}
              </dd>
              <dd className="mt-1 font-serif text-base leading-relaxed text-ink-soft">
                {row.detail}
              </dd>
            </div>
          ))}
        </dl>

        {event.mapLink ? (
          <a
            href={event.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-sans text-eyebrow uppercase tracking-eyebrow text-[#a8842c] transition-colors hover:text-ink"
          >
            View on map <span aria-hidden>&#8599;</span>
          </a>
        ) : null}
      </Reveal>
    </div>
  );
}

export default function DetailsSection() {
  return (
    <section id="details" className="scroll-mt-4 bg-paper px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-issue">
        <Reveal className="text-center">
          <Anchor className="mx-auto h-12 w-12 text-[#a8842c]" />
          <p className="mt-6 font-sans text-eyebrow uppercase tracking-[0.4em] text-[#a8842c]">
            The Wedding
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-ink md:text-6xl">
            Three celebrations, one union
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-ink-soft">
            From our Ghanaian roots to the church in London — we would be honoured
            to have you with us.
          </p>
        </Reveal>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
          {details.ceremonies.map((event) => (
            <Ceremony key={event.no} event={event} />
          ))}
        </div>

        <Reveal className="mt-24 text-center md:mt-32">
          <span aria-hidden className="mx-auto mb-10 block h-px w-16 bg-[#a8842c]/45" />
          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-[#a8842c] md:text-3xl">
            &ldquo;{invitation.scripture}&rdquo;
          </p>
          <p className="mt-4 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
            {invitation.scriptureRef}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
