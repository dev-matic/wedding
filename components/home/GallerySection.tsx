import Image from "next/image";
import Reveal from "@/components/Reveal";

/** Gallery photos live in /public as image0.jpeg … image15.jpeg.
 *  All 16 are 2:3 portraits from the London pre-wedding shoot, so they tile
 *  into an even grid (2 columns on mobile, 4 on desktop) with no cropping. */
const IMAGES = Array.from({ length: 16 }, (_, i) => `/image${i}.jpeg`);

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

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {IMAGES.map((src, i) => (
            <Reveal
              key={src}
              as="figure"
              delay={(i % 4) * 60}
              className="group relative aspect-[2/3] overflow-hidden rounded-sm bg-black/5"
            >
              <Image
                src={src}
                alt={`Kwabena & Sandra — London pre-wedding shoot, ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                priority={i < 4}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-sans text-[0.6rem] uppercase tracking-eyebrow text-white/90">
                  London &middot; Pre-wedding shoot
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
