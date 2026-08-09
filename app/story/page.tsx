import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import FeatureBlock from "@/components/FeatureBlock";
import { story } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Story",
  description: "How we met, and the question at the end of the pier.",
};

export default function StoryPage() {
  return (
    <ChapterLayout chapterNumber="01" chapterLabel="The Story" href="/story">
      <ChapterOpener
        numeral="01"
        eyebrow="Chapter 01"
        title="The Story"
        subtitle={story.subtitle}
      />

      <FeatureBlock
        numeral="i."
        eyebrow={story.howWeMet.eyebrow}
        title={story.howWeMet.title}
        body={story.howWeMet.body}
        photo={story.howWeMet.photo}
        imageSide="left"
      />

      <FeatureBlock
        numeral="ii."
        eyebrow={story.proposal.eyebrow}
        title={story.proposal.title}
        body={story.proposal.body}
        photo={story.proposal.photo}
        imageSide="right"
      />
    </ChapterLayout>
  );
}
