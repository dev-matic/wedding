type Stat = {
  /** The large figure, e.g. "3" or "1,200". */
  figure: string;
  /** Short label beneath the figure. */
  label: string;
  /** One-line gloss under the label. */
  gloss?: string;
};

type StatRowProps = {
  eyebrow?: string;
  stats: Stat[];
  /** Small footnote shown beneath, marked with an asterisk. */
  footnote?: string;
};

/** Large figures with labels and a one-line gloss, plus an asterisked footnote. */
export default function StatRow({ eyebrow, stats, footnote }: StatRowProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-12 md:px-8 md:py-16">
      {eyebrow ? (
        <>
          <p className="eyebrow">{eyebrow}</p>
          <hr className="hairline mt-4 mb-10" />
        </>
      ) : null}
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <dd className="font-display text-6xl font-normal leading-none text-ink md:text-7xl">
              {stat.figure}
            </dd>
            <dt className="mt-3 font-sans text-eyebrow uppercase tracking-eyebrow text-accent">
              {stat.label}
            </dt>
            {stat.gloss ? (
              <p className="mt-2 text-base text-ink-faint">{stat.gloss}</p>
            ) : null}
          </div>
        ))}
      </dl>
      {footnote ? (
        <p className="mt-10 font-sans text-xs tracking-wide text-ink-faint">
          <span aria-hidden>* </span>
          {footnote}
        </p>
      ) : null}
    </section>
  );
}
