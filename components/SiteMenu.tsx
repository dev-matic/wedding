"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { couple } from "@/lib/content";

/**
 * The issue menu — a full-screen light overlay with a large sans-serif index,
 * modelled on the reference site. Opens from the cover and from the running
 * header on every page. `tone` only sets the colour of the trigger bars so
 * they read on a dark cover or a light header; the overlay is always light.
 */

const ITEMS: { index: string; label: string; href: string }[] = [
  { index: "00", label: "Cover", href: "/" },
  { index: "—", label: "Contents", href: "/contents" },
  { index: "01", label: "Our Story", href: "/story" },
  { index: "02", label: "Details", href: "/details" },
  { index: "03", label: "Registry", href: "/registry" },
  { index: "04", label: "RSVP", href: "/rsvp" },
  { index: "05", label: "Gallery", href: "/gallery" },
  { index: "✦", label: "Guest Gallery", href: "/guest-gallery" },
  { index: "06", label: "FAQ", href: "/faq" },
  { index: "07", label: "Trivia", href: "/trivia" },
];

export default function SiteMenu({
  tone = "onDark",
}: {
  tone?: "onDark" | "onLight";
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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

  const bar =
    tone === "onDark"
      ? "bg-paper/80 group-hover:bg-accent-soft"
      : "bg-ink/70 group-hover:bg-accent";

  // Wedding date as "21 . 11 . 2026" from the ISO wedding date.
  const [y, m, d] = couple.weddingDate.slice(0, 10).split("-");
  const dateDotted = `${d} . ${m} . ${y}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="group flex flex-col items-end gap-1.5 p-2"
      >
        <span className={`block h-px w-7 transition-all group-hover:w-8 ${bar}`} />
        <span className={`block h-px w-5 transition-all group-hover:w-8 ${bar}`} />
      </button>

      {mounted
        ? createPortal(
            <div
              className={`fixed inset-0 z-[60] bg-paper text-ink transition-opacity duration-300 ${
                open ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              role="dialog"
              aria-modal="true"
              aria-hidden={!open}
            >
              {/* Close + mark, top-right */}
              <div className="absolute right-6 top-6 z-10 flex items-center gap-5 md:right-12 md:top-8">
                <span className="grid h-6 w-6 place-items-center rounded-full border border-ink/40">
                  <span className="h-1 w-1 rounded-full bg-ink/60" />
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-3xl leading-none text-ink transition-colors hover:text-accent"
                >
                  &times;
                </button>
              </div>

              {/* Index */}
              <nav className="mx-auto flex min-h-screen max-w-issue flex-col justify-center px-8 md:px-12">
                {ITEMS.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-baseline gap-5 py-0.5 md:gap-8 md:py-1"
                    >
                      <span className="w-5 shrink-0 text-right font-sans text-[0.62rem] text-accent/45 md:w-6">
                        {item.index}
                      </span>
                      <span
                        className={`font-sans font-medium leading-tight tracking-tight transition-colors text-4xl md:text-6xl ${
                          active
                            ? "text-accent"
                            : "text-ink group-hover:text-accent"
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-between px-6 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint md:bottom-8 md:px-12">
                <span>{couple.issueLabel}</span>
                <span>{dateDotted}</span>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
