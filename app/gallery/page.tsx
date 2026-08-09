import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import { gallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Gallery",
  description: "A few frames from the years that led here.",
};

export default function GalleryPage() {
  return (
    <ChapterLayout chapterNumber="05" chapterLabel="The Gallery" href="/gallery">
      <ChapterOpener
        numeral="05"
        eyebrow="Chapter 05"
        title="The Gallery"
        subtitle={gallery.subtitle}
      />

      {/* Masonry-style column layout for an editorial mix of crops. */}
      <section className="mx-auto max-w-issue px-5 pb-8 md:px-8">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4">
          {gallery.photos.map((photo, i) => (
            <figure
              key={photo.src}
              className="break-inside-avoid overflow-hidden rounded-sm bg-paper-dim"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="h-auto w-full object-cover"
                priority={i < 2}
              />
            </figure>
          ))}
        </div>
      </section>

      {/* Guest gallery call-to-action */}
      <section className="mx-auto max-w-issue px-5 pb-12 pt-10 text-center md:px-8">
        <span aria-hidden className="mx-auto block h-px w-14 bg-accent" />
        <p className="mt-8 font-serif text-2xl italic text-ink-soft md:text-3xl">
          Were you at the wedding?
        </p>
        <Link
          href="/guest-gallery"
          className="group mt-6 inline-flex items-center gap-3 border border-ink bg-ink px-8 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          Share Your Photos
          <span className="transition-transform group-hover:translate-x-1">
            &rarr;
          </span>
        </Link>
      </section>
    </ChapterLayout>
  );
}
