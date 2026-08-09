import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/content";

export type Product = {
  title: string;
  description: string;
  href: string;
  photo: Photo;
};

/** Wish-list grid: image, title, one-line description, "view details". */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <article key={product.title} className="group">
          <Link href={product.href} target="_blank" rel="noopener noreferrer">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-paper-dim">
              <Image
                src={product.photo.src}
                alt={product.photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
          <h3 className="mt-4 font-display text-2xl font-normal text-ink">
            {product.title}
          </h3>
          <p className="mt-1 text-base text-ink-faint">{product.description}</p>
          <Link
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-3 inline-block font-sans text-eyebrow uppercase tracking-eyebrow"
          >
            View details &rarr;
          </Link>
        </article>
      ))}
    </div>
  );
}
