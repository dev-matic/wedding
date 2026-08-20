import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import GallerySection from "@/components/home/GallerySection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <GallerySection />
      <SiteFooter />
    </main>
  );
}
