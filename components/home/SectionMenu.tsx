"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { couple } from "@/lib/content";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "story", label: "Our Story" },
  { id: "details", label: "The Wedding" },
  { id: "gallery", label: "Gallery" },
  { id: "rsvp", label: "RSVP" },
];

/**
 * The one-page menu: a floating gold hamburger (always available) that opens a
 * full-screen black-and-gold index, plus a persistent RSVP button. Links are
 * in-page anchors, so the page scrolls smoothly to each section.
 */
export default function SectionMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="group fixed right-5 top-5 z-50 flex flex-col items-end gap-1.5 p-2 md:right-8 md:top-7"
      >
        <span className="block h-px w-7 bg-paper/85 transition-all group-hover:bg-[#e7c766]" />
        <span className="block h-px w-5 bg-paper/85 transition-all group-hover:w-7 group-hover:bg-[#e7c766]" />
      </button>

      {/* persistent RSVP button */}
      <a
        href="#rsvp"
        className="fixed bottom-5 right-5 z-50 border border-[#e7c766]/70 bg-black/30 px-5 py-2.5 font-sans text-eyebrow uppercase tracking-eyebrow text-[#e7c766] backdrop-blur-sm transition-colors hover:bg-[#e7c766] hover:text-black md:bottom-8 md:right-8"
      >
        RSVP
      </a>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[60] bg-[#0a0a0b]/97 backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              role="dialog"
              aria-modal="true"
              aria-hidden={!open}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute right-6 top-6 z-10 font-sans text-eyebrow uppercase tracking-eyebrow text-paper/70 transition-colors hover:text-[#e7c766] md:right-10 md:top-8"
              >
                Close &times;
              </button>

              <nav className="mx-auto flex min-h-screen max-w-issue flex-col justify-center px-8 md:px-12">
                {SECTIONS.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-5 border-t border-paper/12 py-4 last:border-b md:gap-8"
                  >
                    <span className="w-5 text-right font-sans text-[0.62rem] tracking-widest text-[#e7c766]/60">
                      {String(i).padStart(2, "0")}
                    </span>
                    <span className="font-display text-4xl text-paper transition-colors group-hover:text-[#e7c766] md:text-6xl">
                      {s.label}
                    </span>
                  </a>
                ))}
              </nav>

              <div className="absolute inset-x-0 bottom-8 text-center font-sans text-eyebrow uppercase tracking-eyebrow text-paper/45">
                {couple.theme} &nbsp;·&nbsp; 21 . 11 . 2026
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
