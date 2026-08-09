"use client";

import { useState } from "react";

export type FaqCategory = {
  category: string;
  pairs: { q: string; a: string }[];
};

/**
 * Grouped Q&A under numbered category headings, with accordion behaviour —
 * one open at a time within the whole list.
 */
export default function Accordion({ groups }: { groups: FaqCategory[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-issue px-5 md:px-8">
      {groups.map((group, gi) => (
        <section key={group.category} className="py-8 md:py-10">
          <div className="flex items-baseline gap-4">
            <span
              className="font-display text-3xl font-normal text-accent-soft"
              aria-hidden
            >
              {String(gi + 1).padStart(2, "0")}
            </span>
            <h2 className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
              {group.category}
            </h2>
          </div>

          <dl className="mt-4 divide-y divide-hairline border-t border-hairline">
            {group.pairs.map((pair, pi) => {
              const id = `${gi}-${pi}`;
              const isOpen = open === id;
              return (
                <div key={pair.q}>
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className="font-display text-xl font-normal text-ink md:text-2xl">
                        {pair.q}
                      </span>
                      <span
                        className={`shrink-0 font-serif text-2xl text-accent transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                  </dt>
                  <dd
                    className={`grid transition-all duration-200 ${
                      isOpen
                        ? "grid-rows-[1fr] pb-6 opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-reading">{pair.a}</p>
                    </div>
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      ))}
    </div>
  );
}
