import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import FeatureBlock from "@/components/FeatureBlock";
import NumberedIndex from "@/components/NumberedIndex";
import StatRow from "@/components/StatRow";
import PullQuote from "@/components/PullQuote";
import ClosingBlock from "@/components/ClosingBlock";
import { story, couple } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Story",
  description: "How we met, told as a timeline — the meeting, the years, the proposal.",
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

      {story.blocks.map((block, i) => (
        <FeatureBlock
          key={block.title}
          numeral={`0${i + 1}`}
          year={block.year}
          eyebrow={block.eyebrow}
          title={block.title}
          body={block.body}
          photo={block.photo}
          imageSide={block.imageSide}
        />
      ))}

      <NumberedIndex items={story.funFacts} />

      <StatRow
        eyebrow={story.stats.eyebrow}
        stats={story.stats.items}
        footnote={story.stats.footnote}
      />

      <PullQuote
        quote={story.pullQuote.quote}
        attribution={story.pullQuote.attribution}
      />

      <ClosingBlock
        signoff={story.closing.signoff}
        date={`${couple.weddingDay.date} ${couple.weddingDay.year}`}
        hashtag={couple.hashtag}
      />
    </ChapterLayout>
  );
}
