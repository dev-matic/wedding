import Reveal from "@/components/Reveal";
import BankGift from "@/components/BankGift";
import { registry } from "@/lib/content";

export default function RegistrySection() {
  return (
    <section id="registry" className="scroll-mt-4 bg-[#0a0a0c] px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#e7c766]">
            Gifts
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-paper md:text-6xl">
            Your presence is the gift
          </h2>
          <p className="mx-auto mt-6 max-w-lg font-serif text-lg italic leading-relaxed text-paper/60">
            {registry.intro}
          </p>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-[#e7c766]/50" />
        </Reveal>

        <Reveal delay={60} className="mt-12">
          <BankGift />
        </Reveal>
      </div>
    </section>
  );
}
