import Reveal from "@/components/Reveal";

/** Gallery photos live in /public as image0.jpeg … image15.jpeg. */
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
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-[#a8842c]/45" />
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4">
          {IMAGES.map((src, i) => (
            <Reveal
              key={src}
              as="figure"
              delay={(i % 3) * 80}
              className="break-inside-avoid"
            >
              <div className="overflow-hidden rounded-sm bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Kwabena & Sandra — moment ${i + 1}`}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="h-auto w-full transition duration-500 hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
