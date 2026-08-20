import Reveal from "@/components/Reveal";
import Invitation from "@/components/Invitation";

export default function RsvpSection() {
  return (
    <section id="rsvp" className="scroll-mt-4 bg-paper px-5 py-24 md:px-8 md:py-36">
      <div className="mx-auto max-w-issue">
        <Reveal className="text-center">
          <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#a8842c]">
            RSVP
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-ink md:text-6xl">
            Will you join us?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl italic text-ink-soft">
            Open the invitation, then let us know.
          </p>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-[#a8842c]/45" />
        </Reveal>

        <div className="mt-14">
          <Invitation />
        </div>
      </div>
    </section>
  );
}
