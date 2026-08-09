type TimelineEntry = {
  date: string;
  event: string;
  time?: string;
  place?: string;
};

type TimelineProps = {
  heading?: string;
  entries: TimelineEntry[];
};

/** Vertically stacked schedule: date, event name, time and place. */
export default function Timeline({ heading, entries }: TimelineProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-12 md:px-8 md:py-16">
      {heading ? (
        <>
          <p className="eyebrow">{heading}</p>
          <hr className="hairline mt-4 mb-8" />
        </>
      ) : null}
      <ol className="divide-y divide-hairline">
        {entries.map((entry) => (
          <li
            key={`${entry.date}-${entry.event}`}
            className="grid gap-2 py-6 md:grid-cols-[10rem_1fr] md:gap-8"
          >
            <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint md:pt-1.5">
              {entry.date}
            </p>
            <div>
              <h3 className="font-display text-2xl font-normal text-ink md:text-3xl">
                {entry.event}
              </h3>
              {(entry.time || entry.place) && (
                <p className="mt-1 text-base text-ink-soft md:text-lg">
                  {[entry.time, entry.place].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
