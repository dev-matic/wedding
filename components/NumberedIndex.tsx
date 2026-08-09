type IndexItem = {
  label: string;
  detail?: string;
};

type NumberedIndexProps = {
  items: IndexItem[];
};

/** At-a-glance strip: 01 / 02 / 03 with short labels, set large and light. */
export default function NumberedIndex({ items }: NumberedIndexProps) {
  return (
    <section className="mx-auto max-w-issue px-5 py-4 md:px-8">
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-3">
        {items.map((item, i) => (
          <li key={item.label} className="bg-paper p-6 md:p-8">
            <span className="font-display text-4xl font-normal text-accent-soft md:text-5xl">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
              {item.label}
            </p>
            {item.detail ? (
              <p className="mt-1 text-base text-ink-faint">{item.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
