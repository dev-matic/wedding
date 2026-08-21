import Reveal from "@/components/Reveal";
import GalleryFigure from "@/components/home/GalleryFigure";
import { galleryImages } from "@/lib/gallery";

/**
 * Placement repeats on a 9-slot cycle: the image at index `i` uses slot `i % 9`.
 * The col-start offsets and pt-* values are deliberate — nothing sits flush
 * left twice running, and the empty columns are intentional. Do not tidy into
 * an even grid. Every offset is md:-prefixed, so below md it collapses to one
 * image per row (slots 5 and 6 form a two-up pair).
 */
const SLOTS = [
  { col: "col-span-12 md:col-span-8", aspect: "aspect-[4/5]" },
  { col: "col-span-12 md:col-span-4 md:pt-12", aspect: "aspect-[4/5]" },
  { col: "col-span-12 md:col-span-6 md:col-start-2", aspect: "aspect-[4/5]" },
  { col: "col-span-12 md:col-span-4 md:col-start-9 md:pt-16", aspect: "aspect-square" },
  { col: "col-span-12", aspect: "aspect-[16/9]" },
  { col: "col-span-6 md:col-span-4", aspect: "aspect-[4/5]" },
  { col: "col-span-6 md:col-span-4 md:col-start-7 md:pt-16", aspect: "aspect-[4/5]" },
  { col: "col-span-12 md:col-span-7 md:col-start-2", aspect: "aspect-[4/5]" },
  { col: "col-span-12 md:col-span-4 md:col-start-9 md:pt-12", aspect: "aspect-square" },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="scroll-mt-4 bg-paper-dim px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-issue">
        <Reveal className="text-center">
          <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#a8842c]">
            Gallery
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-ink md:text-6xl">
            Moments
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic text-ink-soft">
            London &middot; The pre-wedding shoot
          </p>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-[#a8842c]/45" />
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-6 md:mt-20 md:gap-10">
          {galleryImages.map((image, i) => {
            const slot = SLOTS[i % SLOTS.length];
            return (
              <GalleryFigure
                key={image.src}
                image={image}
                col={slot.col}
                aspect={slot.aspect}
                priority={i < 2}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
