type ChapterOpenerProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Optional large decorative numeral shown behind/above the title. */
  numeral?: string | null;
};

/** Chapter opener — eyebrow, large title, one-line subtitle. */
export default function ChapterOpener({
  eyebrow,
  title,
  subtitle,
  numeral,
}: ChapterOpenerProps) {
  return (
    <section className="mx-auto max-w-issue px-5 pb-12 pt-16 md:px-8 md:pb-20 md:pt-28">
      {numeral ? (
        <p className="numeral mb-4 select-none" aria-hidden>
          {numeral}
        </p>
      ) : null}
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-display-sm font-medium leading-[1.02] text-ink md:text-display">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-6 max-w-reading font-serif text-xl italic text-ink-soft md:text-2xl">
          {subtitle}
        </p>
      ) : null}
      <hr className="hairline mt-12" />
    </section>
  );
}
