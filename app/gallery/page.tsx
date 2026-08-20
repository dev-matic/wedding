import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import PageHeader from "@/components/home/PageHeader";
import GallerySection from "@/components/home/GallerySection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <main className="bg-paper text-ink">
      <SectionMenu />
      <PageHeader />
      <GallerySection />
      <SiteFooter />
    </main>
  );
}
