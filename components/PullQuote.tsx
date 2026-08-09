type PullQuoteProps = {
  quote: string;
  attribution?: string;
};

/** Oversized quotation mark, a centred italic line, attribution in small caps. */
export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-16 md:px-8 md:py-24">
      <figure className="mx-auto max-w-3xl text-center">
        <span
          className="block font-display text-[6rem] leading-[0.6] text-accent-soft md:text-[9rem]"
          aria-hidden
        >
          &ldquo;
        </span>
        <blockquote className="mt-2">
          <p className="font-display text-3xl font-normal italic leading-snug text-ink md:text-5xl">
            {quote}
          </p>
        </blockquote>
        {attribution ? (
          <figcaption className="mt-8 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
            {attribution}
          </figcaption>
        ) : null}
      </figure>
    </section>
  );
}
