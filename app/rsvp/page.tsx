import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import PageHeader from "@/components/home/PageHeader";
import RsvpSection from "@/components/home/RsvpSection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "RSVP" };

export default function RsvpPage() {
  return (
    <main className="bg-paper text-ink">
      <SectionMenu />
      <PageHeader />
      <RsvpSection />
      <SiteFooter />
    </main>
  );
}
