import Link from "next/link";
import { couple } from "@/lib/content";
import { getPageNav } from "@/lib/chapters";

type ChapterLayoutProps = {
  /** Zero-padded chapter number, e.g. "02". Omit for unnumbered pages. */
  chapterNumber?: string | null;
  /** Short label for the running header, e.g. "Details". */
  chapterLabel: string;
  /** This page's route — used to resolve page number and prev/next. */
  href: string;
  children: React.ReactNode;
};

/**
 * The shared frame every page below the cover wears: a running header with
 * the monogram, chapter marker and next link, and a running footer with
 * prev/next and the page number. Turn the pages like an issue.
 */
export default function ChapterLayout({
  chapterNumber,
  chapterLabel,
  href,
  children,
}: ChapterLayoutProps) {
  const { pageNumber, prev, next } = getPageNav(href);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Running header */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-issue items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <Link
            href="/"
            className="font-display text-lg tracking-wide text-ink hover:text-accent md:text-xl"
            aria-label={`${couple.names} — home`}
          >
            {couple.monogram}
          </Link>

          <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
            {chapterNumber ? (
              <>
                <span className="text-accent">Chapter {chapterNumber}</span>
                <span className="mx-2 text-hairline">|</span>
              </>
            ) : null}
            <span className="text-ink-soft">{chapterLabel}</span>
          </p>

          {next ? (
            <Link
              href={next.href}
              className="hidden font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft hover:text-accent sm:inline"
            >
              Next&nbsp;&rarr;
            </Link>
          ) : (
            <span className="hidden font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint sm:inline">
              Fin
            </span>
          )}
        </div>
      </header>

      {/* Chapter body */}
      <main className="flex-1">{children}</main>

      {/* Running footer */}
      <footer className="mt-24 border-t border-hairline">
        <div className="mx-auto grid max-w-issue grid-cols-3 items-center gap-2 px-5 py-8 md:px-8">
          <div className="justify-self-start">
            {prev ? (
              <Link
                href={prev.href}
                className="group font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft hover:text-accent"
              >
                <span aria-hidden>&larr;</span>{" "}
                <span className="hidden sm:inline">Previous</span>
                <span className="block font-serif text-base normal-case tracking-normal text-ink-faint group-hover:text-accent">
                  {prev.label}
                </span>
              </Link>
            ) : null}
          </div>

          <p className="justify-self-center text-center font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint">
            Page {pageNumber}
          </p>

          <div className="justify-self-end text-right">
            {next ? (
              <Link
                href={next.href}
                className="group font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft hover:text-accent"
              >
                <span className="hidden sm:inline">Next</span>{" "}
                <span aria-hidden>&rarr;</span>
                <span className="block font-serif text-base normal-case tracking-normal text-ink-faint group-hover:text-accent">
                  {next.label}
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </footer>
    </div>
  );
}
