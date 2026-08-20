import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import StorySection from "@/components/home/StorySection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "Our Story" };

export default function StoryPage() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <StorySection />
      <SiteFooter />
    </main>
  );
}
