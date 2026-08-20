import GoldDustCover from "@/components/GoldDustCover";
import SectionMenu from "@/components/home/SectionMenu";
import CountdownSection from "@/components/home/CountdownSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <GoldDustCover />
      <CountdownSection />
      <SiteFooter />
    </main>
  );
}
