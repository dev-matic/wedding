import GoldDustCover from "@/components/GoldDustCover";
import SectionMenu from "@/components/home/SectionMenu";
import StorySection from "@/components/home/StorySection";
import DetailsSection from "@/components/home/DetailsSection";
import GallerySection from "@/components/home/GallerySection";
import RsvpSection from "@/components/home/RsvpSection";
import { couple } from "@/lib/content";

export default function Home() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <GoldDustCover />
      <StorySection />
      <DetailsSection />
      <GallerySection />
      <RsvpSection />

      <footer className="border-t border-paper/10 bg-[#0a0a0b] px-5 py-16 text-center md:px-8">
        <p className="font-display text-3xl text-paper">
          {couple.partnerA} <span className="text-[#e7c766]">&amp;</span>{" "}
          {couple.partnerB}
        </p>
        <p className="mt-4 font-sans text-eyebrow uppercase tracking-[0.35em] text-paper/55">
          21 . 11 . 2026 &nbsp;·&nbsp; {couple.hashtag}
        </p>
        <p className="mt-3 font-serif text-lg italic text-[#e7c766]/85">
          {couple.theme}
        </p>
      </footer>
    </main>
  );
}
