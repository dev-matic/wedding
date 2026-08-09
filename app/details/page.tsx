import type { Metadata } from "next";
import Link from "next/link";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import FeatureBlock from "@/components/FeatureBlock";
import NumberedIndex from "@/components/NumberedIndex";
import Timeline from "@/components/Timeline";
import InfoGrid from "@/components/InfoGrid";
import { details } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Details",
  description: "Dates, venues, dress code and how to find us.",
};

export default function DetailsPage() {
  return (
    <ChapterLayout chapterNumber="02" chapterLabel="The Details" href="/details">
      <ChapterOpener
        numeral="02"
        eyebrow="Chapter 02"
        title="The Details"
        subtitle={details.subtitle}
      />

      <NumberedIndex
        items={[
          { label: "The Ceremony", detail: "2:00 PM · Garden" },
          { label: "The Reception", detail: "6:00 PM · Riverside" },
          { label: "The Dress Code", detail: "Garden formal" },
        ]}
      />

      <FeatureBlock
        numeral="01"
        eyebrow={details.ceremony.eyebrow}
        title={details.ceremony.title}
        body={details.ceremony.body}
        photo={details.ceremony.photo}
        cards={details.ceremony.cards}
        imageSide="left"
      />

      <FeatureBlock
        numeral="02"
        eyebrow={details.reception.eyebrow}
        title={details.reception.title}
        body={details.reception.body}
        photo={details.reception.photo}
        cards={details.reception.cards}
        imageSide="right"
      />

      <Timeline
        heading="The Day, Hour by Hour"
        entries={[
          { date: "14 Nov", event: "Ceremony", time: "2:00 PM", place: "Convento dos Cardaes" },
          { date: "14 Nov", event: "Cocktails", time: "4:00 PM", place: "The cloister" },
          { date: "14 Nov", event: "Shuttle to reception", time: "4:45 PM", place: "From the ceremony" },
          { date: "14 Nov", event: "Reception & dinner", time: "6:00 PM", place: "Cais 18" },
          { date: "14 Nov", event: "Dancing", time: "9:00 PM", place: "Till late" },
        ]}
      />

      <InfoGrid heading="Travel & Stay" cards={details.travel} />

      <section className="mx-auto max-w-issue px-5 pb-4 md:px-8">
        <hr className="hairline mb-8" />
        <Link
          href={details.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-sans text-eyebrow uppercase tracking-eyebrow"
        >
          Open the venue in Maps &rarr;
        </Link>
      </section>
    </ChapterLayout>
  );
}
