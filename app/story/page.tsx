import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import PageHeader from "@/components/home/PageHeader";
import StorySection from "@/components/home/StorySection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "Our Story" };

export default function StoryPage() {
  return (
    <main className="bg-paper text-ink">
      <SectionMenu />
      <PageHeader />
      <StorySection />
      <SiteFooter />
    </main>
  );
}
