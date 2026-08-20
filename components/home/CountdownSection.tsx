import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import { details } from "@/lib/content";

/** The two dated celebrations, counted down side by side. */
export default function CountdownSection() {
  const dated = details.ceremonies.filter((c) => c.target);

  return (
    <section
      id="countdown"
      className="scroll-mt-4 bg-[#0a0a0b] px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-issue text-center">
        <Reveal>
          <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#e7c766]">
            The Countdown
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-paper md:text-5xl">
            Counting down to both days
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-10">
          {dated.map((c, i) => (
            <Reveal key={c.no} delay={i * 90}>
              <p className="font-sans text-eyebrow uppercase tracking-eyebrow text-paper/50">
                Event {c.no}
              </p>
              <h3 className="mt-3 font-display text-2xl text-paper md:text-3xl">
                {c.title}
              </h3>
              <p className="mt-2 font-serif text-base italic text-paper/60">
                {c.rows[0].value}
              </p>
              <Countdown target={c.target} className="mt-8 justify-center" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
