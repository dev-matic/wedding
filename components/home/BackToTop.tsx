"use client";

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      className="mt-8 inline-flex items-center gap-2 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-faint transition-colors hover:text-[#a8842c]"
    >
      Back to top <span aria-hidden>↑</span>
    </button>
  );
}
