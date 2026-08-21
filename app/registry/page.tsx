import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import PageHeader from "@/components/home/PageHeader";
import RegistrySection from "@/components/home/RegistrySection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "Registry" };

export default function RegistryPage() {
  return (
    <main className="bg-paper text-ink">
      <SectionMenu />
      <PageHeader />
      <RegistrySection />
      <SiteFooter />
    </main>
  );
}
