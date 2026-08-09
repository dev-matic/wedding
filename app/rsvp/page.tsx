import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import RsvpForm from "@/components/RsvpForm";
import { rsvp } from "@/lib/content";

export const metadata: Metadata = {
  title: "RSVP",
  description: "Kindly reply, and tell us how to feed you well.",
};

export default function RsvpPage() {
  return (
    <ChapterLayout chapterNumber="04" chapterLabel="RSVP" href="/rsvp">
      <ChapterOpener
        numeral="04"
        eyebrow="Chapter 04"
        title="RSVP"
        subtitle={rsvp.subtitle}
      />

      <section className="mx-auto max-w-reading px-5 pb-12 md:px-8">
        <p className="text-center">{rsvp.intro}</p>
      </section>

      <RsvpForm />
    </ChapterLayout>
  );
}
