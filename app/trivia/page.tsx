import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import TriviaQuiz from "@/components/TriviaQuiz";
import { trivia } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Trivia",
  description: "A gentle test — how well do you know us?",
};

export default function TriviaPage() {
  return (
    <ChapterLayout chapterNumber="07" chapterLabel="Trivia" href="/trivia">
      <ChapterOpener
        numeral="07"
        eyebrow="Chapter 07"
        title="The Trivia"
        subtitle={trivia.subtitle}
      />

      <TriviaQuiz />
    </ChapterLayout>
  );
}
