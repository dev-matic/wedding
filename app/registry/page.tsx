import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import RegistrySection from "@/components/home/RegistrySection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "Gifts" };

export default function RegistryPage() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <RegistrySection />
      <SiteFooter />
    </main>
  );
}
