import Link from "next/link";
import { couple } from "@/lib/content";

/**
 * The monogram that appears top-left on every section page (the cover has its
 * own). Links home; pairs with the floating menu at top-right.
 */
export default function PageHeader() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center px-5 py-5 md:px-10 md:py-6">
      <Link
        href="/"
        className="pointer-events-auto font-display text-lg tracking-[0.3em] text-[#a8842c] transition-colors hover:text-ink"
      >
        {couple.partnerA[0]} &amp; {couple.partnerB[0]}
      </Link>
    </div>
  );
}
