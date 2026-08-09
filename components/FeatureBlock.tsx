import Image from "next/image";
import type { Photo } from "@/lib/content";

type DetailCard = {
  label: string;
  value: string;
  detail?: string;
};

type FeatureBlockProps = {
  numeral?: string;
  /** Optional year shown alongside the eyebrow, e.g. "2021". */
  year?: string;
  eyebrow: string;
  title: string;
  body: string | string[];
  photo: Photo;
  cards?: DetailCard[];
  /** Which side the image sits on. Alternate between blocks. */
  imageSide?: "left" | "right";
};

/**
 * Full-bleed-feeling image beside a text column: number, eyebrow, title,
 * paragraph(s), then an optional row of detail cards. Alternate `imageSide`
 * between consecutive blocks for the editorial rhythm.
 */
export default function FeatureBlock({
  numeral,
  year,
  eyebrow,
  title,
  body,
  photo,
  cards,
  imageSide = "left",
}: FeatureBlockProps) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return (
    <section className="mx-auto max-w-issue px-5 py-12 md:px-8 md:py-20">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <figure
          className={imageSide === "right" ? "md:order-2" : "md:order-1"}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-paper-dim">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {photo.caption ? (
            <figcaption className="mt-3 font-serif text-base italic text-ink-faint">
              {photo.caption}
            </figcaption>
          ) : null}
        </figure>

        {/* Text */}
        <div className={imageSide === "right" ? "md:order-1" : "md:order-2"}>
          {numeral ? (
            <p className="numeral mb-2 select-none" aria-hidden>
              {numeral}
            </p>
          ) : null}
          <p className="eyebrow">
            {year ? <span className="text-ink-faint">{year}&ensp;&middot;&ensp;</span> : null}
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-display-sm font-medium leading-tight text-ink">
            {title}
          </h2>
          {paragraphs.map((p, i) => (
            <p key={i} className="mt-5">
              {p}
            </p>
          ))}

          {cards && cards.length > 0 ? (
            <dl className="mt-8 grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-3">
              {cards.map((card) => (
                <div key={card.label} className="bg-paper p-4">
                  <dt className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
                    {card.label}
                  </dt>
                  <dd className="mt-2 font-serif text-lg leading-snug text-ink">
                    {card.value}
                  </dd>
                  {card.detail ? (
                    <dd className="mt-0.5 text-base text-ink-faint">
                      {card.detail}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
