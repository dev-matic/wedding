import Reveal from "@/components/Reveal";
import { contacts } from "@/lib/content";

function Phone({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.4 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export default function ContactsSection() {
  return (
    <section
      id="contacts"
      className="scroll-mt-4 border-t border-ink/10 bg-paper px-5 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-issue">
        <Reveal className="text-center">
          <p className="font-sans text-eyebrow uppercase tracking-[0.4em] text-[#a8842c]">
            Contacts
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-ink md:text-5xl">
            Questions on the day?
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-lg italic leading-relaxed text-ink-soft">
            {contacts.intro}
          </p>
          <span aria-hidden className="mx-auto mt-8 block h-px w-16 bg-[#a8842c]/45" />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
          {contacts.people.map((p, i) => (
            <Reveal key={p.tel} delay={(i % 2) * 70}>
              <a
                href={`tel:${p.tel}`}
                className="group flex items-center justify-between gap-4 border border-hairline bg-paper-dim px-6 py-5 transition-colors hover:border-[#a8842c]"
              >
                <div>
                  <p className="font-display text-xl text-ink">{p.name}</p>
                  <p className="mt-1 font-sans text-eyebrow uppercase tracking-eyebrow text-ink-soft">
                    {p.phone}
                  </p>
                </div>
                <Phone className="h-5 w-5 flex-shrink-0 text-[#a8842c] transition-transform group-hover:scale-110" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
