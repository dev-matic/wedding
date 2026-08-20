import Image from "next/image";
import Reveal from "@/components/Reveal";
import { gallery } from "@/lib/content";

export default function GallerySection() {
  const shots = gallery.items.slice(0, 9);
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
          {shots.map((item, i) => (
            <Reveal
              key={item.src}
              as="figure"
              delay={(i % 3) * 80}
              className="break-inside-avoid"
            >
              <div className="overflow-hidden rounded-sm bg-black/5">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={i < 2}
                  loading={i < 2 ? undefined : "lazy"}
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
