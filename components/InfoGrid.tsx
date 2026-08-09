type InfoCard = {
  label: string;
  title: string;
  body: string;
};

type InfoGridProps = {
  heading?: string;
  cards: InfoCard[];
};

/** 2–3 cards for travel, logistics, dress code and the like. */
export default function InfoGrid({ heading, cards }: InfoGridProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-12 md:px-8 md:py-16">
      {heading ? (
        <>
          <p className="eyebrow">{heading}</p>
          <hr className="hairline mt-4 mb-10" />
        </>
      ) : null}
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {cards.map((card) => (
          <article key={card.title}>
            <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-accent">
              {card.label}
            </p>
            <h3 className="mt-3 font-display text-2xl font-normal text-ink md:text-3xl">
              {card.title}
            </h3>
            <p className="mt-3 text-base md:text-lg">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
