import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import PageHeader from "@/components/home/PageHeader";
import DetailsSection from "@/components/home/DetailsSection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "The Wedding" };

export default function DetailsPage() {
  return (
    <main className="bg-paper text-ink">
      <SectionMenu />
      <PageHeader />
      <DetailsSection />
      <SiteFooter />
    </main>
  );
}
