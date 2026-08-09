import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import GuestUpload from "@/components/GuestUpload";
import { guestGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guest Gallery",
  description: "Add your own frames to the shared album.",
};

export default function GuestGalleryPage() {
  return (
    <ChapterLayout chapterLabel="Guest Gallery" href="/guest-gallery">
      {/* Unnumbered: marked with a symbol rather than a chapter number. */}
      <ChapterOpener
        numeral="✦"
        eyebrow="A Shared Album"
        title="Guest Gallery"
        subtitle={guestGallery.subtitle}
      />

      <section className="mx-auto max-w-reading px-5 pb-12 md:px-8">
        <p className="text-center">{guestGallery.intro}</p>
      </section>

      <GuestUpload />
    </ChapterLayout>
  );
}
