import GoldDustCover from "@/components/GoldDustCover";
import SectionMenu from "@/components/home/SectionMenu";
import StorySection from "@/components/home/StorySection";
import DetailsSection from "@/components/home/DetailsSection";
import GallerySection from "@/components/home/GallerySection";
import RegistrySection from "@/components/home/RegistrySection";
import RsvpSection from "@/components/home/RsvpSection";
import SiteFooter from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <main className="bg-[#0a0a0b] text-paper">
      <SectionMenu />
      <GoldDustCover />
      <StorySection />
      <DetailsSection />
      <GallerySection />
      <RegistrySection />
      <RsvpSection />
      <SiteFooter />
    </main>
  );
}
