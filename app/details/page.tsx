import type { Metadata } from "next";
import Link from "next/link";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import FeatureBlock from "@/components/FeatureBlock";
import NumberedIndex from "@/components/NumberedIndex";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import InfoGrid from "@/components/InfoGrid";
import ActionCard from "@/components/ActionCard";
import { details } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Details",
  description: "Events, venues, dress code and travel — everything you need to be there.",
};

export default function DetailsPage() {
  return (
    <ChapterLayout chapterNumber="02" chapterLabel="Details" href="/details">
      <ChapterOpener
        numeral="02"
        eyebrow="Chapter 02"
        title="The Details"
        subtitle={details.subtitle}
      />

      <NumberedIndex items={details.strip} />

      {/* A countdown for each event */}
      <div className="mx-auto max-w-issue px-5 md:px-8">
        <hr className="hairline" />
      </div>
      {details.events.map((event) => (
        <Countdown
          key={event.key}
          target={event.target}
          label={`Until the ${event.label.replace(/^The\s+/, "")}`}
        />
      ))}

      {/* A feature block per event, alternating image side */}
      {details.events.map((event) => (
        <FeatureBlock
          key={event.key}
          year={event.year}
          eyebrow={event.eyebrow}
          title={event.title}
          body={event.body}
          photo={event.photo}
          cards={event.cards}
          imageSide={event.imageSide}
        />
      ))}

      <Timeline heading="The Day, Hour by Hour" entries={details.timeline} />

      <InfoGrid heading="Travel & Stay" cards={details.travel} />

      {/* Programme + live stream */}
      <section className="mx-auto max-w-issue px-5 py-8 md:px-8">
        <ActionCard
          eyebrow="Before the Day"
          heading="The order of service"
          description="Download the programme to follow along, or join us live if you can't be there in person."
          primary={{ label: "Download Programme (PDF)", href: details.programme.pdfHref }}
          secondary={{ label: "Watch the Live Stream", href: details.programme.livestreamHref }}
        />
      </section>

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
