import Image from "next/image";
import Reveal from "@/components/Reveal";
import { story } from "@/lib/content";

export default function StorySection() {
  return (
    <section id="story" className="scroll-mt-4 bg-[#0b0b0d] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-issue">
        <Reveal className="text-center">
          <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#e7c766]">
            Our Story
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-paper md:text-6xl">
            How it began
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic text-paper/60">
            {story.subtitle}
          </p>
          <span aria-hidden className="mx-auto mt-10 block h-px w-16 bg-[#e7c766]/50" />
        </Reveal>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-32">
          {story.blocks.map((block, i) => (
            <div
              key={block.title}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-16"
            >
              <Reveal
                className={i % 2 === 1 ? "md:order-2" : ""}
              >
                <div className="overflow-hidden rounded-sm bg-white/5">
                  <Image
                    src={block.photo.src}
                    alt={block.photo.alt}
                    width={block.photo.width}
                    height={block.photo.height}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-auto w-full"
                  />
                </div>
              </Reveal>
              <Reveal delay={80} className={i % 2 === 1 ? "md:order-1" : ""}>
                <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-[#e7c766]">
                  {block.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-2xl font-medium text-paper md:text-3xl">
                  {block.title}
                </h3>
                {block.body.map((p, j) => (
                  <p
                    key={j}
                    className="mt-4 font-serif text-lg leading-relaxed text-paper/75 md:text-xl"
                  >
                    {p}
                  </p>
                ))}
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="mx-auto mt-24 max-w-3xl text-center md:mt-32">
          <p className="font-serif text-3xl italic leading-snug text-[#e7c766] md:text-4xl">
            &ldquo;{story.pullQuote.quote}&rdquo;
          </p>
          <p className="mt-6 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/50">
            {story.pullQuote.attribution}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
