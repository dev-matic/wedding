import type { Metadata } from "next";
import Link from "next/link";
import ChapterLayout from "@/components/ChapterLayout";
import StackedDate from "@/components/StackedDate";
import { chapters, numberedChapterCount } from "@/lib/chapters";
import { couple } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contents",
  description: "The issue at a glance — every chapter of the wedding.",
};

export default function ContentsPage() {
  return (
    <ChapterLayout chapterLabel="Contents" href="/contents">
      <section className="mx-auto max-w-issue px-5 pb-4 pt-16 md:px-8 md:pt-24">
        <p className="eyebrow">{couple.issueLabel}</p>
        <h1 className="mt-4 font-display text-display-sm font-medium leading-none text-ink md:text-display">
          Contents
        </h1>
        <p className="mt-6 max-w-reading font-serif text-xl italic text-ink-soft md:text-2xl">
          A celebration in {numberedChapterCount} chapters, in {couple.city}.
        </p>
        <hr className="hairline mt-12" />
      </section>

      {/* The wedding date, set large as three stacked lines */}
      <StackedDate
        day={couple.weddingDay.day}
        date={couple.weddingDay.date}
        year={couple.weddingDay.year}
      />

      <section className="mx-auto max-w-issue px-5 py-8 md:px-8 md:py-12">
        <hr className="hairline mb-4" />
        <ul className="divide-y divide-hairline">
          {chapters.map((chapter) => (
            <li key={chapter.href}>
              <Link
                href={chapter.href}
                className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 md:grid-cols-[6rem_1fr_auto] md:gap-8"
              >
                <span className="font-display text-3xl font-normal text-accent-soft transition-colors group-hover:text-accent md:text-5xl">
                  {chapter.chapterNumber ?? "✦"}
                </span>
                <span>
                  <span className="block font-display text-2xl font-normal text-ink transition-colors group-hover:text-accent md:text-3xl">
                    {chapter.chapterLabel}
                  </span>
                  <span className="mt-1 block font-serif text-base text-ink-faint md:text-lg">
                    {chapter.description}
                  </span>
                </span>
                <span className="justify-self-end font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint transition-colors group-hover:text-accent">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </ChapterLayout>
  );
}
