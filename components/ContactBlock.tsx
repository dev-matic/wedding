type Coordinator = {
  name: string;
  role: string;
  phone: string;
};

type ContactBlockProps = {
  email: string;
  coordinators: Coordinator[];
};

/** Contact details: an email, and named coordinators with phone numbers. */
export default function ContactBlock({ email, coordinators }: ContactBlockProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-12 md:px-8 md:py-16">
      <hr className="hairline mb-10" />
      <p className="eyebrow">Still Stuck?</p>
      <h2 className="mt-3 font-display text-display-sm font-medium text-ink">
        Ask a human
      </h2>
      <p className="mt-4 max-w-reading">
        For anything not covered here, email us at{" "}
        <a href={`mailto:${email}`} className="link-underline">
          {email}
        </a>{" "}
        — or call one of our coordinators, who can help on the day.
      </p>

      <ul className="mt-8 grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-3">
        {coordinators.map((c) => (
          <li key={c.name} className="bg-paper p-5">
            <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-accent">
              {c.role}
            </p>
            <p className="mt-2 font-display text-xl font-normal text-ink">
              {c.name}
            </p>
            <a
              href={`tel:${c.phone.replace(/\s+/g, "")}`}
              className="mt-1 block font-serif text-lg text-ink-soft hover:text-accent"
            >
              {c.phone}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
