import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import ActionCard from "@/components/ActionCard";
import { registry } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Registry",
  description: "Your presence, and a few things if you'd like to give more.",
};

export default function RegistryPage() {
  return (
    <ChapterLayout
      chapterNumber="03"
      chapterLabel="The Registry"
      href="/registry"
    >
      <ChapterOpener
        numeral="03"
        eyebrow="Chapter 03"
        title="The Registry"
        subtitle={registry.subtitle}
      />

      <section className="mx-auto max-w-reading px-5 md:px-8">
        <p className="text-center">{registry.intro}</p>
      </section>

      <section className="mx-auto max-w-issue px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {registry.items.map((item) => (
            <ActionCard
              key={item.title}
              eyebrow={item.label}
              heading={item.title}
              description={item.body}
              primary={{ label: item.cta, href: item.href }}
            />
          ))}
        </div>
      </section>
    </ChapterLayout>
  );
}
