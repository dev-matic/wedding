import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import Invitation from "@/components/Invitation";

export const metadata: Metadata = {
  title: "RSVP",
  description:
    "Open the invitation, then reply — tell us if you can make it, and leave a note for the couple.",
};

export default function RsvpPage() {
  return (
    <ChapterLayout chapterNumber="04" chapterLabel="RSVP" href="/rsvp">
      <div className="pt-14 md:pt-20">
        <Invitation />
      </div>
    </ChapterLayout>
  );
}
