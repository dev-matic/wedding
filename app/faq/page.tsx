import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import Accordion from "@/components/Accordion";
import ContactBlock from "@/components/ContactBlock";
import { faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Questions",
  description: "The things guests ask us most, grouped — plus who to call on the day.",
};

export default function FaqPage() {
  return (
    <ChapterLayout
      chapterNumber="06"
      chapterLabel="The Questions"
      href="/faq"
    >
      <ChapterOpener
        numeral="06"
        eyebrow="Chapter 06"
        title="The Questions"
        subtitle={faq.subtitle}
      />

      <Accordion groups={faq.categories} />

      <ContactBlock
        email={faq.contact.email}
        coordinators={faq.contact.coordinators}
      />
    </ChapterLayout>
  );
}
