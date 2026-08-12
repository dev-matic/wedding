import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import Reveal from "@/components/Reveal";
import { gallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Gallery",
  description: "A few frames from the road that led here.",
};

export default function GalleryPage() {
  return (
    <ChapterLayout chapterNumber="05" chapterLabel="Gallery" href="/gallery">
      <ChapterOpener
        numeral="05"
        eyebrow="Chapter 05"
        title="The Gallery"
        subtitle={gallery.subtitle}
      />

      {/* Masonry column layout — handles the mix of portrait & landscape crops. */}
      <section className="mx-auto max-w-issue px-5 pb-8 md:px-8">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {gallery.items.map((item, i) => (
            <Reveal
              key={item.src}
              as="figure"
              delay={(i % 3) * 90}
              className="break-inside-avoid"
            >
              <div className="overflow-hidden rounded-sm bg-paper-dim">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full object-cover"
                  priority={i < 3}
                  loading={i < 3 ? undefined : "lazy"}
                />
              </div>
              <figcaption className="mt-3">
                <p className="font-serif text-base italic text-ink-soft">
                  {item.caption}
                </p>
                <p className="mt-0.5 font-serif text-sm italic text-ink-faint">
                  {item.place}
                  {item.year ? ` · ${item.year}` : ""}
                </p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Guest gallery call-to-action */}
      <Reveal
        as="section"
        className="mx-auto max-w-issue px-5 pb-12 pt-10 text-center md:px-8"
      >
        <span aria-hidden className="mx-auto block h-px w-14 bg-hairline" />
        <p className="mt-8 font-serif text-2xl italic text-ink-soft md:text-3xl">
          Were you at the wedding?
        </p>
        <Link
          href="/guest-gallery"
          className="mt-6 inline-flex items-center border border-ink bg-ink px-8 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          Share Your Photos
        </Link>
      </Reveal>
    </ChapterLayout>
  );
}
