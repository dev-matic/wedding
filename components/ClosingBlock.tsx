type ClosingBlockProps = {
  eyebrow?: string;
  signoff: string;
  date?: string;
  hashtag?: string;
};

/** A short sign-off, the date, and the hashtag — the end of a chapter. */
export default function ClosingBlock({
  eyebrow = "With Love",
  signoff,
  date,
  hashtag,
}: ClosingBlockProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-16 text-center md:px-8 md:py-24">
      <hr className="hairline mx-auto mb-12 max-w-xs" />
      <p className="eyebrow">{eyebrow}</p>
      <p className="mx-auto mt-6 max-w-2xl font-display text-3xl font-normal italic leading-snug text-ink md:text-4xl">
        {signoff}
      </p>
      {date ? (
        <p className="mt-8 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
          {date}
        </p>
      ) : null}
      {hashtag ? (
        <p className="mt-2 font-sans text-eyebrow uppercase tracking-eyebrow text-accent">
          {hashtag}
        </p>
      ) : null}
    </section>
  );
}
