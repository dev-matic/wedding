import type { Metadata } from "next";
import ChapterLayout from "@/components/ChapterLayout";
import ChapterOpener from "@/components/ChapterOpener";
import AmountPicker from "@/components/AmountPicker";
import ProductGrid from "@/components/ProductGrid";
import GuestBook from "@/components/GuestBook";
import { registry } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Registry",
  description: "A cash gift toward our next chapter, a short wish list, and the guest book.",
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

      {/* 1 — Cash gift, first */}
      <section className="mx-auto max-w-issue px-5 py-14 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="numeral select-none" aria-hidden>
              01
            </p>
            <p className="eyebrow mt-2">A Cash Gift</p>
            <h2 className="mt-3 font-display text-display-sm font-medium text-ink">
              Toward the honeymoon
            </h2>
            <p className="mt-4">{registry.cashGift.note}</p>
          </div>
          <AmountPicker />
        </div>
      </section>

      {/* 2 — Wish list, second */}
      <section className="mx-auto max-w-issue px-5 py-8 md:px-8 md:py-12">
        <p className="numeral select-none" aria-hidden>
          02
        </p>
        <p className="eyebrow mt-2">The Wish List</p>
        <h2 className="mt-3 font-display text-display-sm font-medium text-ink">
          A few everyday things
        </h2>
        <hr className="hairline mb-12 mt-8" />
        <ProductGrid products={registry.wishList} />
      </section>

      {/* 3 — Guest book, last */}
      <section className="mx-auto max-w-issue px-5 py-14 md:px-8 md:py-20">
        <p className="numeral select-none" aria-hidden>
          03
        </p>
        <p className="eyebrow mt-2">The Guest Book</p>
        <h2 className="mt-3 font-display text-display-sm font-medium text-ink">
          Leave us a note
        </h2>
        <hr className="hairline mb-12 mt-8" />
        <GuestBook />
      </section>
    </ChapterLayout>
  );
}
