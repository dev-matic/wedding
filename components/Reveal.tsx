"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/** useLayoutEffect on the client, useEffect on the server (no SSR warning). */
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll-reveal wrapper: fades and lifts its children into view. Elements
 * animate whether they're already on screen at load or scrolled to later —
 * a slow, consistent entrance across the whole site. Pass `delay` to stagger.
 *
 * Robustness:
 *  - With JS disabled the content renders plainly visible (never blank).
 *  - The hidden state is applied in a layout effect, before the browser paints,
 *    so there's no flash of the final state first.
 *  - prefers-reduced-motion shows everything immediately with no motion.
 *  - Only opacity/transform animate, so there's no layout shift, and each
 *    element reveals once.
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
  const [armed, setArmed] = useState(false); // hidden state applied
  const [smooth, setSmooth] = useState(false); // transitions enabled
  const [shown, setShown] = useState(false); // revealed

  // Apply the hidden state before paint, so the final state never flashes first.
  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;

    // Turn transitions on only after the hidden state has painted.
    const r1 = requestAnimationFrame(() => setSmooth(true));

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (inView) {
      const r2 = requestAnimationFrame(() =>
        requestAnimationFrame(() => setShown(true)),
      );
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
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
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(r1);
      io.disconnect();
    };
  }, [armed]);

  const transition = smooth
    ? "transition-[opacity,transform] duration-[1100ms] ease-out motion-reduce:transition-none"
    : "";
  const state =
    armed && !shown ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100";

  return (
    <Tag
      ref={ref}
      style={smooth ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${className} ${transition} ${state}`.trim()}
    >
      {children}
    </Tag>
  );
}
