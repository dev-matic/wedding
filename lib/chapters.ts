/**
 * The issue's table of contents. Order here drives page numbers and the
 * prev/next navigation through the magazine. Drop a chapter and the rest
 * renumber automatically; the guest gallery sits outside the numbering
 * (marked with a symbol instead of a chapter number).
 */

export type Chapter = {
  /** Route, e.g. "/story". */
  href: string;
  /** Zero-padded chapter number, e.g. "01". Null = unnumbered (guest gallery). */
  chapterNumber: string | null;
  /** Short label shown in the running header, e.g. "Details". */
  chapterLabel: string;
  /** One-line description for the contents page. */
  description: string;
};

/** Numbered chapters, in reading order. Contents is Page 01; chapters follow. */
export const chapters: Chapter[] = [
  {
    href: "/story",
    chapterNumber: "01",
    chapterLabel: "The Story",
    description: "How we met, and the question at the end of the pier.",
  },
  {
    href: "/details",
    chapterNumber: "02",
    chapterLabel: "The Details",
    description: "Dates, venues, dress code and how to find us.",
  },
  {
    href: "/registry",
    chapterNumber: "03",
    chapterLabel: "The Registry",
    description: "Your presence, and a few things if you'd like to give more.",
  },
  {
    href: "/rsvp",
    chapterNumber: "04",
    chapterLabel: "RSVP",
    description: "Kindly reply, and tell us how to feed you well.",
  },
  {
    href: "/gallery",
    chapterNumber: "05",
    chapterLabel: "The Gallery",
    description: "A few frames from the years that led here.",
  },
  {
    href: "/faq",
    chapterNumber: "06",
    chapterLabel: "The Questions",
    description: "The things guests ask us most.",
  },
  {
    href: "/trivia",
    chapterNumber: "07",
    chapterLabel: "The Trivia",
    description: "A gentle test — how well do you know us?",
  },
];

/** The unnumbered guest gallery, referenced by the contents page and nav. */
export const guestGalleryChapter: Chapter = {
  href: "/guest-gallery",
  chapterNumber: null,
  chapterLabel: "Guest Gallery",
  description: "Add your own frames to the shared album.",
};

/** The full navigable sequence: contents → chapters → guest gallery. */
const sequence: Chapter[] = [
  {
    href: "/contents",
    chapterNumber: null,
    chapterLabel: "Contents",
    description: "The issue at a glance.",
  },
  ...chapters,
  guestGalleryChapter,
];

export type PageNav = {
  /** Page number shown in the footer, e.g. "03". Page 01 is Contents. */
  pageNumber: string;
  prev: { href: string; label: string } | null;
  next: { href: string; label: string } | null;
};

/**
 * Resolve prev/next links and a running page number for a given route.
 * Page numbers count from Contents (Page 01) through the sequence.
 */
export function getPageNav(href: string): PageNav {
  const index = sequence.findIndex((c) => c.href === href);
  const prev = index > 0 ? sequence[index - 1] : null;
  const next =
    index >= 0 && index < sequence.length - 1 ? sequence[index + 1] : null;

  return {
    pageNumber: String(index + 1).padStart(2, "0"),
    prev: prev ? { href: prev.href, label: prev.chapterLabel } : null,
    next: next ? { href: next.href, label: next.chapterLabel } : null,
  };
}
