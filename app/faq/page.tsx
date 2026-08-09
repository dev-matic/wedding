import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Questions",
  description: "The things guests ask us most.",
};

export default function FaqPage() {
  return (
    <ChapterLayout
      chapterNumber="06"
      chapterLabel="The Questions"
      href="/faq"
    >
      <ChapterOpener
        numeral="06"
        eyebrow="Chapter 06"
        title="The Questions"
        subtitle={faq.subtitle}
      />

      <section className="mx-auto max-w-issue px-5 pb-8 md:px-8">
        <dl className="divide-y divide-hairline">
          {faq.pairs.map((pair, i) => (
            <div
              key={pair.q}
              className="grid gap-3 py-8 md:grid-cols-[4rem_1fr] md:gap-8"
            >
              <span
                className="font-display text-3xl font-normal text-accent-soft"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <dt className="font-display text-2xl font-normal text-ink md:text-3xl">
                  {pair.q}
                </dt>
                <dd className="mt-3 max-w-reading">{pair.a}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>
    </ChapterLayout>
  );
}
