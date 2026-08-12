/**
 * The issue's running order. This single sequence drives page numbers and the
 * prev/next navigation through the magazine.
 *
 * Two kinds of pages appear here:
 *  - Numbered chapters carry a `chapterNumber` ("01") and a `pageNumber`.
 *  - Additive pages (the guest gallery, the trivia) are unnumbered: both
 *    `chapterNumber` and `pageNumber` are null, and they do NOT consume a
 *    page number — so FAQ stays Page 07 even though the guest gallery sits
 *    before it.
 *
 * The last page loops back to Contents rather than dead-ending.
 */

export type Chapter = {
  /** Route, e.g. "/details". */
  href: string;
  /** Zero-padded chapter number, e.g. "02". Null = unnumbered / not a chapter. */
  chapterNumber: string | null;
  /** Short label shown in headers/footers, e.g. "Details". */
  chapterLabel: string;
  /** One-line description for the contents page. */
  description: string;
  /** Zero-padded page number for the footer. Null = no page number shown. */
  pageNumber: string | null;
  /** Additive pages (e.g. the guest gallery) sit outside the linear prev/next
   *  chain — they're reached from a call-to-action or the menu, not by paging. */
  additive?: boolean;
};

/**
 * Full running order, cover first. The cover has no running shell of its own,
 * but it lets Contents point back to it. Page numbers are assigned only to
 * numbered pages; Contents is Page 01.
 */
const sequence: Chapter[] = [
  { href: "/", chapterNumber: null, chapterLabel: "Cover", description: "", pageNumber: null },
  { href: "/contents", chapterNumber: null, chapterLabel: "Contents", description: "The issue at a glance.", pageNumber: "01" },
  { href: "/story", chapterNumber: "01", chapterLabel: "Our Story", description: "How we met, told as a timeline.", pageNumber: "02" },
  { href: "/details", chapterNumber: "02", chapterLabel: "Details", description: "Events, venues, dress code and travel.", pageNumber: "03" },
  { href: "/registry", chapterNumber: "03", chapterLabel: "Registry", description: "A cash gift, a wish list, and the guest book.", pageNumber: "04" },
  { href: "/rsvp", chapterNumber: "04", chapterLabel: "RSVP", description: "Find your invitation and reply.", pageNumber: "05" },
  { href: "/gallery", chapterNumber: "05", chapterLabel: "Gallery", description: "A few frames from the years that led here.", pageNumber: "06" },
  { href: "/guest-gallery", chapterNumber: null, chapterLabel: "Guest Gallery", description: "Add your own frames to the shared album.", pageNumber: null, additive: true },
  { href: "/faq", chapterNumber: "06", chapterLabel: "FAQ", description: "Grouped answers, and who to call on the day.", pageNumber: "07" },
  { href: "/trivia", chapterNumber: "07", chapterLabel: "Trivia", description: "A gentle quiz, with a little prize.", pageNumber: null },
];

/** Every page after Contents — used to render the contents index in order. */
export const chapters: Chapter[] = sequence.filter(
  (c) => c.href !== "/" && c.href !== "/contents",
);

/** The unnumbered guest gallery, for any code that needs it by name. */
export const guestGalleryChapter: Chapter = sequence.find(
  (c) => c.href === "/guest-gallery",
)!;

/** How many numbered chapters there are — for "a celebration in N chapters". */
export const numberedChapterCount = sequence.filter(
  (c) => c.chapterNumber !== null,
).length;

export type NavLink = { href: string; label: string };

export type PageNav = {
  /** Page number shown in the footer, or null when the page is unnumbered. */
  pageNumber: string | null;
  /** Short label for the footer centre when there is no page number. */
  centreLabel: string;
  prev: NavLink | null;
  next: NavLink | null;
};

/**
 * Resolve prev/next links, a page number, and a footer-centre label for a
 * route. The final page's `next` loops back to Contents.
 */
export function getPageNav(href: string): PageNav {
  const current = sequence.find((c) => c.href === href);

  // The linear paging chain excludes additive pages (e.g. the guest gallery).
  const nav = sequence.filter((c) => !c.additive);
  const navIndex = nav.findIndex((c) => c.href === href);

  let prevChapter: Chapter | null;
  let nextChapter: Chapter | null;

  if (navIndex !== -1) {
    prevChapter = navIndex > 0 ? nav[navIndex - 1] : null;
    const isLast = navIndex === nav.length - 1;
    nextChapter = isLast
      ? nav.find((c) => c.href === "/contents")!
      : nav[navIndex + 1] ?? null;
  } else {
    // Additive page: borrow its neighbours from the full running order.
    const fullIndex = sequence.findIndex((c) => c.href === href);
    prevChapter = fullIndex > 0 ? sequence[fullIndex - 1] : null;
    nextChapter =
      sequence[fullIndex + 1] ??
      sequence.find((c) => c.href === "/contents") ??
      null;
  }

  return {
    pageNumber: current?.pageNumber ?? null,
    centreLabel: current?.chapterLabel ?? "",
    prev: prevChapter
      ? { href: prevChapter.href, label: prevChapter.chapterLabel }
      : null,
    next: nextChapter
      ? { href: nextChapter.href, label: nextChapter.chapterLabel }
      : null,
  };
}
