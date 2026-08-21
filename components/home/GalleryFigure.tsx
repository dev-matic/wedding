"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";

/**
 * One gallery photograph in a fixed aspect box, so nothing shifts on load.
 * A shimmer sits behind the image; the image fades in once loaded, and scales
 * gently on hover — all motion suppressed under prefers-reduced-motion.
 */
export default function GalleryFigure({
  image,
  col,
  aspect,
  priority = false,
}: {
  image: GalleryImage;
  col: string;
  aspect: string;
  priority?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // If the image is already cached/complete before onLoad fires, don't leave it hidden.
  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <figure className={`group ${col}`}>
      <div className={`relative ${aspect} overflow-hidden bg-paper-dim`}>
        {/* shimmer placeholder */}
        <div
          aria-hidden
          className={`absolute inset-0 bg-gradient-to-br from-black/5 via-black/10 to-black/5 motion-safe:animate-pulse motion-safe:transition-opacity motion-safe:duration-500 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />
        <Image
          ref={ref}
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`object-cover motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-105 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <figcaption className="mt-4 flex items-start gap-3">
        <span
          aria-hidden
          className="mt-[0.65rem] h-px w-8 flex-shrink-0 bg-[#a8842c]"
        />
        <div>
          <p className="font-serif text-base leading-tight text-ink md:text-lg">
            {image.caption}
          </p>
          <p className="mt-1 font-sans text-[0.625rem] uppercase tracking-[0.25em] text-ink-soft">
            {image.meta}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
