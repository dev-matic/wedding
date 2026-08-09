type StackedDateProps = {
  /** e.g. "Saturday". */
  day: string;
  /** e.g. "14 November". */
  date: string;
  /** e.g. "2026". */
  year: string;
};

/** The wedding date set large as three stacked lines: day / date / year. */
export default function StackedDate({ day, date, year }: StackedDateProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-10 text-center md:px-8 md:py-16">
      <p className="font-display text-4xl font-normal leading-tight text-ink md:text-6xl">
        {day}
      </p>
      <p className="font-display text-5xl font-medium leading-tight text-ink md:text-8xl">
        {date}
      </p>
      <p className="font-display text-4xl font-normal leading-tight text-accent-soft md:text-6xl">
        {year}
      </p>
    </section>
  );
}
