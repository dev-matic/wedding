"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { couple } from "@/lib/content";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/story", label: "Our Story" },
  { href: "/details", label: "The Wedding" },
  { href: "/gallery", label: "Gallery" },
  { href: "/registry", label: "Gifts" },
  { href: "/rsvp", label: "RSVP" },
];

/**
 * The site menu: a floating gold hamburger (always available) that opens a
 * full-screen black-and-gold index, plus a persistent RSVP button. Links are
 * real routes, so each section is its own page. Lives in the root layout, so
 * it appears site-wide.
 */
export default function SectionMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
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
        <span className="block h-px w-7 bg-[#a8842c] transition-all group-hover:bg-[#7a5f1c]" />
        <span className="block h-px w-5 bg-[#a8842c] transition-all group-hover:w-7 group-hover:bg-[#7a5f1c]" />
      </button>

      {/* persistent RSVP button */}
      {pathname !== "/rsvp" ? (
        <Link
          href="/rsvp"
          className="fixed bottom-5 right-5 z-50 border border-[#e7c766]/70 bg-black/30 px-5 py-2.5 font-sans text-eyebrow uppercase tracking-eyebrow text-[#e7c766] backdrop-blur-sm transition-colors hover:bg-[#e7c766] hover:text-black md:bottom-8 md:right-8"
        >
          RSVP
        </Link>
      ) : null}

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[60] backdrop-blur-sm transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              style={{ backgroundColor: "rgba(26, 35, 53, 0.985)" }}
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
                {PAGES.map((s, i) => {
                  const active = pathname === s.href;
                  return (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-5 border-t border-paper/12 py-4 last:border-b md:gap-8"
                    >
                      <span className="w-5 text-right font-sans text-[0.62rem] tracking-widest text-[#e7c766]/60">
                        {String(i).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-display text-4xl transition-colors group-hover:text-[#e7c766] md:text-6xl ${
                          active ? "text-[#e7c766]" : "text-paper"
                        }`}
                      >
                        {s.label}
                      </span>
                    </Link>
                  );
                })}
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
