import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import DetailsSection from "@/components/home/DetailsSection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "The Wedding" };

export default function DetailsPage() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <DetailsSection />
      <SiteFooter />
    </main>
  );
}
