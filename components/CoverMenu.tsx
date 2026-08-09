"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { chapters } from "@/lib/chapters";

/**
 * The cover's hamburger menu. A minimal top-right toggle that opens a
 * full-screen overlay listing every chapter — the quick way into the issue
 * without going through Contents first.
 */
export default function CoverMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the overlay is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="group flex flex-col items-end gap-1.5 p-2"
      >
        <span className="block h-px w-7 bg-paper/80 transition-all group-hover:w-8 group-hover:bg-accent-soft" />
        <span className="block h-px w-5 bg-paper/80 transition-all group-hover:w-8 group-hover:bg-accent-soft" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/97 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="flex items-start justify-between px-6 py-8 md:px-12 md:py-10">
          <span className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/60">
            The Issue
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/70 transition-colors hover:text-accent-soft"
          >
            Close &times;
          </button>
        </div>

        <nav className="mx-auto flex max-w-issue flex-col px-6 md:px-12">
          <Link
            href="/contents"
            onClick={() => setOpen(false)}
            className="group border-t border-paper/15 py-4 font-display text-3xl text-paper transition-colors hover:text-accent-soft md:text-5xl"
          >
            <span className="mr-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/40 align-middle">
              ✦
            </span>
            Contents
          </Link>
          {chapters.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              onClick={() => setOpen(false)}
              className="group border-t border-paper/15 py-4 font-display text-3xl text-paper transition-colors hover:text-accent-soft md:text-5xl last:border-b"
            >
              <span className="mr-4 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/40 align-middle">
                {c.chapterNumber ?? "✦"}
              </span>
              {c.chapterLabel}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
