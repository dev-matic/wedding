import Link from "next/link";

type ActionCardProps = {
  eyebrow?: string;
  heading: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Card with a heading, description and primary/secondary actions. */
export default function ActionCard({
  eyebrow,
  heading,
  description,
  primary,
  secondary,
}: ActionCardProps) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-hairline bg-paper p-7 md:p-8">
      {eyebrow ? (
        <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mt-3 font-display text-2xl font-normal text-ink md:text-3xl">
        {heading}
      </h3>
      <p className="mt-3 flex-1 text-base md:text-lg">{description}</p>
      {(primary || secondary) && (
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {primary ? (
            <Link
              href={primary.href}
              className="inline-flex items-center border border-ink bg-ink px-5 py-2.5 font-sans text-eyebrow uppercase tracking-eyebrow text-paper transition-colors hover:bg-accent hover:border-accent"
            >
              {primary.label}
            </Link>
          ) : null}
          {secondary ? (
            <Link href={secondary.href} className="link-underline font-sans text-eyebrow uppercase tracking-eyebrow">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      )}
    </article>
  );
}
