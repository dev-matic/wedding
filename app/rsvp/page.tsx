import type { Metadata } from "next";
import SectionMenu from "@/components/home/SectionMenu";
import RsvpSection from "@/components/home/RsvpSection";
import SiteFooter from "@/components/home/SiteFooter";

export const metadata: Metadata = { title: "RSVP" };

export default function RsvpPage() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <RsvpSection />
      <SiteFooter />
    </main>
  );
}
