"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal wrapper: fades and lifts its children into view once, when they
 * cross into the viewport. Reusable across the site (chapter openers, feature
 * blocks, gallery items) — pass a `delay` to stagger neighbours.
 *
 * Accessibility & robustness:
 *  - The hidden state is applied from JavaScript on mount, so with JS disabled
 *    (or before hydration) the content is simply visible — never blank.
 *  - `prefers-reduced-motion` disables the transform entirely.
 *  - Only opacity/transform animate, so there is no layout shift.
 *  - Observes once, then unobserves — it never re-animates on scroll back.
 */
export default function Reveal({
  children,
  delay = 0,
  as,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false); // JS is running → hidden state allowed
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return; // stays un-armed → always visible, no motion
    }

    const el = ref.current;
    if (!el) return;

    // If it's already on screen at mount, show it without hiding first.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    setArmed(true);
    if (inView) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const motion = armed
    ? `transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`
    : "";

  return (
    <Tag
      ref={ref}
      style={armed ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} ${motion}`.trim()}
    >
      {children}
    </Tag>
  );
}
