import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="numeral select-none" aria-hidden>
        404
      </p>
      <p className="eyebrow mt-4">Page not in this issue</p>
      <h1 className="mt-4 font-display text-display-sm font-medium text-ink">
        This page is missing
      </h1>
      <p className="mt-4 max-w-reading">
        It may have been moved, or it was never printed. Head back to the
        contents and find your way from there.
      </p>
      <Link
        href="/contents"
        className="mt-8 inline-flex items-center gap-3 border border-ink px-8 py-3.5 font-sans text-eyebrow uppercase tracking-eyebrow text-ink transition-colors hover:bg-ink hover:text-paper"
      >
        Back to Contents &rarr;
      </Link>
    </main>
  );
}
