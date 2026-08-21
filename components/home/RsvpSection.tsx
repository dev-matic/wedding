import Reveal from "@/components/Reveal";
import Invitation from "@/components/Invitation";

export default function RsvpSection() {
  return (
    <section id="rsvp" className="scroll-mt-4 bg-paper px-5 py-24 md:px-8 md:py-36">
      <Reveal>
        <Invitation />
      </Reveal>
    </section>
  );
}
