import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ChapterLayout from "@/components/ChapterLayout";
import Reveal from "@/components/Reveal";
import { gallery, type GalleryItem } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Gallery",
  description: "Moments captured in time.",
};

/* ------------------------------------------------------------------ */
/* Figure + caption                                                    */
/* ------------------------------------------------------------------ */

function GalleryFigure({
  item,
  className = "",
  sizes,
  delay = 0,
  priority = false,
}: {
  item: GalleryItem;
  className?: string;
  sizes: string;
  delay?: number;
  priority?: boolean;
}) {
  return (
    <Reveal as="figure" delay={delay} className={className}>
      <div className="overflow-hidden rounded-sm bg-paper-dim md:max-h-[82vh]">
        <Image
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="h-auto w-full object-cover"
        />
      </div>
      <figcaption className="mt-4 flex items-start gap-3">
        <span aria-hidden className="mt-2.5 h-px w-8 shrink-0 bg-accent/60" />
        <span>
          <span className="block font-sans text-lg font-medium text-ink">
            {item.caption}
          </span>
          <span className="mt-1 block font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
            {item.place}
            {item.year ? ` · ${item.year}` : ""}
          </span>
        </span>
      </figcaption>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Asymmetric layout engine                                            */
/* ------------------------------------------------------------------ */

const BIG = "(min-width: 768px) 58vw, 100vw";
const SMALL = "(min-width: 768px) 34vw, 100vw";
const FEATURE = "(min-width: 768px) 90vw, 100vw";

type BlockType = "duoBigL" | "duoBigR" | "feature" | "duoTall" | "duoSmall";
const PATTERN: BlockType[] = [
  "duoBigL",
  "duoBigR",
  "feature",
  "duoTall",
  "duoSmall",
];

type Block = { type: BlockType; items: GalleryItem[] };

function buildBlocks(items: GalleryItem[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  let p = 0;
  while (i < items.length) {
    const type = PATTERN[p % PATTERN.length];
    if (type === "feature" || i + 1 >= items.length) {
      blocks.push({ type: "feature", items: [items[i]] });
      i += 1;
    } else {
      blocks.push({ type, items: [items[i], items[i + 1]] });
      i += 2;
    }
    p += 1;
  }
  return blocks;
}

function GalleryBlock({ block, first }: { block: Block; first: boolean }) {
  const [a, b] = block.items;
  const grid = "grid gap-8 md:grid-cols-12 md:gap-10";

  switch (block.type) {
    case "feature": {
      // Portrait "lone" images run too tall full-width, so contain them;
      // landscape features stay wide (they're already short).
      const portrait = a.height > a.width;
      return (
        <GalleryFigure
          item={a}
          sizes={portrait ? "(min-width: 768px) 34vw, 100vw" : FEATURE}
          priority={first}
          className={
            portrait ? "md:mx-auto md:max-w-md" : "md:mx-auto md:max-w-4xl"
          }
        />
      );
    }
    case "duoBigL":
      return (
        <div className={grid}>
          <GalleryFigure item={a} sizes={BIG} priority={first} className="md:col-span-6" />
          <GalleryFigure item={b} sizes={SMALL} delay={90} className="md:col-span-4 md:col-start-9 md:mt-24" />
        </div>
      );
    case "duoBigR":
      return (
        <div className={grid}>
          <GalleryFigure item={a} sizes={SMALL} className="md:col-span-4 md:mt-24" />
          <GalleryFigure item={b} sizes={BIG} delay={90} className="md:col-span-6 md:col-start-7" />
        </div>
      );
    case "duoTall":
      return (
        <div className={grid}>
          <GalleryFigure item={a} sizes={BIG} className="md:col-span-5" />
          <GalleryFigure item={b} sizes={SMALL} delay={90} className="md:col-span-4 md:col-start-9 md:mt-20" />
        </div>
      );
    case "duoSmall":
      return (
        <div className={grid}>
          <GalleryFigure item={a} sizes={SMALL} className="md:col-span-4" />
          <GalleryFigure item={b} sizes={BIG} delay={90} className="md:col-span-5 md:col-start-8 md:mt-24" />
        </div>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function GalleryPage() {
  const blocks = buildBlocks(gallery.items);

  return (
    <ChapterLayout chapterNumber="05" chapterLabel="Gallery" href="/gallery">
      {/* Opener — centred */}
      <section className="mx-auto max-w-issue px-5 pb-6 pt-16 text-center md:px-8 md:pt-24">
        <p className="font-sans text-eyebrow uppercase tracking-[0.3em] text-ink-faint">
          Chapter 05
        </p>
        <h1 className="mt-6 font-grotesque text-[clamp(2.5rem,8vw,4rem)] font-light leading-none tracking-[-0.02em] text-ink">
          The Gallery
        </h1>
        <span aria-hidden className="mx-auto mt-6 block h-px w-16 bg-accent/50" />
        <p className="mt-6 font-serif text-xl italic text-ink-soft md:text-2xl">
          {gallery.subtitle}
        </p>
      </section>

      {/* The asymmetric photo layout */}
      <section className="mx-auto max-w-issue space-y-16 px-5 py-10 md:space-y-28 md:px-8">
        {blocks.map((block, i) => (
          <GalleryBlock key={block.items[0].src} block={block} first={i === 0} />
        ))}
      </section>

      {/* Guest gallery call-to-action */}
      <Reveal
        as="section"
        className="mx-auto max-w-issue px-5 pb-12 pt-8 text-center md:px-8"
      >
        <span aria-hidden className="mx-auto block h-px w-14 bg-hairline" />
        <p className="mt-8 font-serif text-2xl italic text-ink-soft md:text-3xl">
          Were you at the wedding?
        </p>
        <Link
          href="/guest-gallery"
          className="mt-6 inline-flex items-center border border-ink bg-ink px-8 py-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          Share Your Photos
        </Link>
      </Reveal>
    </ChapterLayout>
  );
}
