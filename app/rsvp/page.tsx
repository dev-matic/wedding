import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import InvitationGate from "@/components/InvitationGate";
import { rsvp } from "@/lib/content";

export const metadata: Metadata = {
  title: "RSVP",
  description: "Find your invitation and reply — tell us if you can make it, and how to feed you well.",
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

      <InvitationGate demoCode={rsvp.demoCode} />
    </ChapterLayout>
  );
}
