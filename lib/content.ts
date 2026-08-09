/**
 * CONTENT SLOTS — fill these in.
 *
 * Everything the couple needs to personalise lives here. Swap the copy,
 * dates, links and imagery below and the whole issue updates. Placeholder
 * photography points at Unsplash during the build — replace `src` values
 * with real, self-hosted photos before launch (drop them in /public and
 * use e.g. "/photos/cover.jpg").
 */

export const couple = {
  /** Display names, in order. */
  partnerA: "Amara",
  partnerB: "Elias",
  /** Used in <title> etc. */
  names: "Amara & Elias",
  /** Monogram shown on the cover and in the running header. */
  monogram: "A / E",
  hashtag: "#AmaraAndElias",
  /** The wedding day — drives the countdown. ISO 8601 with timezone.
   *  TODO: replace with the real date/time from the invitation card. */
  weddingDate: "2026-11-14T14:00:00+00:00",
  /** The same day, split for the large stacked date on the contents page. */
  weddingDay: { day: "Saturday", date: "14 November", year: "2026" },
  city: "London, United Kingdom",
  year: "2026",
  /** Issue label shown on the cover masthead. */
  issueLabel: "The Wedding Issue",
  issueNo: "N° 01",
};

/** Base URL of the deployed site — used for absolute OG image URLs. */
export const siteUrl = "https://amara-and-elias.vercel.app";

export type Photo = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export const coverPhoto: Photo = {
  src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80",
  alt: "The couple embracing at golden hour",
  width: 1600,
  height: 2400,
};

/** Open Graph share image — most guests meet the site through a link preview. */
export const ogImage: Photo = {
  src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&fit=crop&q=80",
  alt: "Amara & Elias — The Wedding Issue",
  width: 1200,
  height: 630,
};

/* ------------------------------------------------------------------ */
/* Chapter 01 — Story                                                  */
/* ------------------------------------------------------------------ */

export const story = {
  subtitle: "How it began, told in the order it happened.",
  /** Feature blocks in date order. Alternate imageSide; captions name the beat. */
  blocks: [
    {
      year: "2021",
      eyebrow: "The Meeting",
      title: "A borrowed umbrella",
      body: [
        "We met on a grey Tuesday outside a bookshop that neither of us meant to visit. Amara was sheltering from the rain under an awning; Elias had one umbrella and, as the story goes, terrible aim. What began as a shared walk to the tram became a shared coffee, then a standing Sunday habit that quietly rearranged both our weeks.",
        "Three years, four cities, and one very opinionated cat later, we still argue about who was actually holding the umbrella. Neither version has ever been settled.",
      ],
      photo: {
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1400&q=80",
        alt: "The couple walking together on a rainy street",
        caption: "Chapter 01 · A Borrowed Umbrella",
        width: 1400,
        height: 933,
      } as Photo,
      imageSide: "left" as const,
    },
    {
      year: "2023",
      eyebrow: "The Growing Bond",
      title: "Four cities, one cat",
      body: [
        "The Sunday habit became a shared address, and then several. We moved for work, for weather, for the sheer thrill of packing boxes we swore we'd never unpack again. Somewhere along the way we adopted Biscuit, who has opinions about all of it.",
        "We learned each other in the ordinary hours — who makes the coffee, who reads the map, who says sorry first. Mostly the same person, if you ask either of us.",
      ],
      photo: {
        src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1400&q=80",
        alt: "The couple laughing together at home",
        caption: "Chapter 02 · The Growing Bond",
        width: 1400,
        height: 933,
      } as Photo,
      imageSide: "right" as const,
    },
    {
      year: "2025",
      eyebrow: "The Proposal",
      title: "At the end of the pier",
      body: [
        "It happened where we least expected the ordinary to turn — the end of a wooden pier at dusk, with the tide coming in and a paper bag of chips going cold. There was no crowd, no drone, no string quartet. Just a question, a long pause that felt longer than it was, and a yes that arrived before the sentence had finished.",
        "We walked home the long way. We are still walking the long way.",
      ],
      photo: {
        src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1400&q=80",
        alt: "A pier stretching into the sea at dusk",
        caption: "Chapter 03 · At the End of the Pier",
        width: 1400,
        height: 933,
      } as Photo,
      imageSide: "left" as const,
    },
  ],
  funFacts: [
    { label: "First date", detail: "A rainy tram to nowhere" },
    { label: "Our song", detail: "Something neither will admit to" },
    { label: "The tiebreaker", detail: "Biscuit, the cat" },
  ],
  stats: {
    eyebrow: "By the Numbers",
    items: [
      { figure: "3", label: "Years together", gloss: "and counting, faster each one" },
      { figure: "4", label: "Cities shared", gloss: "boxes we swore we'd stop packing" },
      { figure: "1", label: "Cat*", gloss: "the true head of the household" },
    ],
    footnote: "Biscuit did not consent to being counted, but here we are.",
  },
  pullQuote: {
    quote: "We didn't fall in love with a moment. We fell in love with the ordinary Tuesdays.",
    attribution: "Amara & Elias",
  },
  closing: {
    signoff: "And so, with the long way still ahead of us, we'd love for you to walk part of it too.",
  },
};

/* ------------------------------------------------------------------ */
/* Chapter 02 — Details                                                */
/* ------------------------------------------------------------------ */

export const details = {
  subtitle: "Everything you need to be there, and to be comfortable once you are.",
  /** The two events, each with its own countdown target and feature block.
   *  TODO: replace venues, addresses, times and dress code with the details
   *  printed on the invitation card. */
  events: [
    {
      key: "ceremony",
      label: "The Ceremony",
      target: "2026-11-14T14:00:00+00:00",
      eyebrow: "The Ceremony",
      title: "The vows",
      year: "2:00 PM",
      body: "We'll say the important words in the early afternoon. Arrive a little early — the doors close for the ceremony, and we'd hate for you to miss the beginning.",
      photo: {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1400&q=80",
        alt: "A venue set for a wedding ceremony",
        caption: "Chapter 02 · The Ceremony",
        width: 1400,
        height: 933,
      } as Photo,
      cards: [
        { label: "Date & Time", value: "Saturday 14 November 2026", detail: "2:00 PM — arrive by 1:30" },
        { label: "Venue", value: "Ceremony venue", detail: "Central London — TBC" },
        { label: "Dress Code", value: "Formal", detail: "As per the invitation" },
      ],
      imageSide: "left" as const,
    },
    {
      key: "reception",
      label: "The Reception",
      target: "2026-11-14T18:00:00+00:00",
      eyebrow: "The Reception",
      title: "The long table",
      year: "6:00 PM",
      body: "Dinner, toasts and dancing follow a short journey away. Travel details between the ceremony and reception will follow closer to the day.",
      photo: {
        src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=1400&q=80",
        alt: "A long candlelit dinner table set for a reception",
        caption: "Chapter 02 · The Reception",
        width: 1400,
        height: 933,
      } as Photo,
      cards: [
        { label: "Reception", value: "6:00 PM till late", detail: "Dinner at 7:30" },
        { label: "Venue", value: "Reception venue", detail: "London — TBC" },
        { label: "Getting There", value: "Details to follow", detail: "From the ceremony" },
      ],
      imageSide: "right" as const,
    },
  ],
  strip: [
    { label: "The Ceremony", detail: "2:00 PM · Garden" },
    { label: "The Reception", detail: "6:00 PM · Riverside" },
    { label: "The Dress Code", detail: "Garden formal" },
  ],
  timeline: [
    { date: "14 Nov", event: "Ceremony", time: "2:00 PM", place: "Ceremony venue" },
    { date: "14 Nov", event: "Cocktails", time: "4:00 PM", place: "Drinks reception" },
    { date: "14 Nov", event: "Move to reception", time: "4:45 PM", place: "From the ceremony" },
    { date: "14 Nov", event: "Reception & dinner", time: "6:00 PM", place: "Reception venue" },
    { date: "14 Nov", event: "Dancing", time: "9:00 PM", place: "Till late" },
  ],
  mapLink: "https://maps.google.com/?q=London", // TODO: point at the real venue from the card
  /** Programme PDF (host on Blob) and an optional live-stream link. */
  programme: {
    pdfHref: "#", // TODO: upload the programme PDF and link it here
    livestreamHref: "#", // TODO: paste the live-stream URL, or remove this block
  },
  travel: [
    {
      label: "By Air",
      title: "Heathrow & Gatwick",
      body: "Both airports connect to central London in under an hour by train — the Heathrow Express and the Gatwick Express run all day. City, Stansted and Luton are alternatives.",
    },
    {
      label: "Where to Stay",
      title: "Close to the venue",
      body: "We'll recommend a few hotels near the venue once details are confirmed. We may hold a small block of rooms — see the FAQ for the code.",
    },
    {
      label: "Getting Around",
      title: "Tube, buses & black cabs",
      body: "London runs on the Underground — tap in with a contactless card. Buses are cheap, black cabs and ride-hailing are everywhere at night.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 03 — Registry                                               */
/* ------------------------------------------------------------------ */

export const registry = {
  subtitle: "Your presence is the gift. If you'd like to give more, here's where.",
  intro:
    "We're lucky to already share a home, so more than anything we'd love your company on the day. For those who've asked, here's a cash gift toward our next chapter, a short wish list of everyday things, and a guest book to sign.",
  /** Cash gift — given by bank transfer (no payment account needed).
   *  TODO: replace bankDetails with the couple's real account details.
   *  To switch to a honeymoon-fund link or Stripe instead, see the note in
   *  components/BankGift.tsx. */
  cashGift: {
    currency: "£",
    tiers: [50, 100, 250],
    note: "Contributions go toward our honeymoon — the trip we've been dreaming up.",
    bankDetails: {
      accountName: "A & E Wedding",
      sortCode: "00-00-00",
      accountNumber: "00000000",
      reference: "Your name",
    },
  },
  /** Wish list — everyday practical items read better than a formal registry. */
  wishList: [
    {
      title: "The good knife",
      description: "The one we reach for every night.",
      href: "https://example.com/registry/knife",
      photo: {
        src: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=900&q=80",
        alt: "A chef's knife on a wooden board",
        width: 900,
        height: 1125,
      } as Photo,
    },
    {
      title: "Linen for the table",
      description: "For the long dinners we love to host.",
      href: "https://example.com/registry/linen",
      photo: {
        src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
        alt: "A neatly set dining table with linen",
        width: 900,
        height: 1125,
      } as Photo,
    },
    {
      title: "A cast-iron pot",
      description: "Stews, bread, and everything slow.",
      href: "https://example.com/registry/pot",
      photo: {
        src: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&q=80",
        alt: "A cast-iron cooking pot",
        width: 900,
        height: 1125,
      } as Photo,
    },
  ],
  guestBook: {
    seed: [
      { name: "Tomás & Inês", message: "So happy for you both. Save us a dance!" },
      { name: "Auntie Rose", message: "I knew from the first Sunday. Blessings, always." },
      { name: "The office", message: "Finally! Congratulations from all of us." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Chapter 04 — RSVP                                                   */
/* ------------------------------------------------------------------ */

export const rsvp = {
  subtitle: "Kindly reply by 1 October 2026.",
  intro:
    "Find your invitation using the code printed on your card, then let us know if you can make it — and how to feed you well.",
  deadline: "1 October 2026",
  /** Demo code shown on the lookup while building. Real codes live in the API. */
  demoCode: "LISBON26",
};

/* ------------------------------------------------------------------ */
/* Chapter 05 — Gallery                                                */
/* ------------------------------------------------------------------ */

export const gallery = {
  subtitle: "A few frames from the years that led here.",
  photos: [
    { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80", alt: "The couple laughing together", width: 1200, height: 1500 },
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80", alt: "Golden hour portrait", width: 1200, height: 800 },
    { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80", alt: "An outdoor ceremony setting", width: 1200, height: 800 },
    { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80", alt: "Hands clasped together", width: 1200, height: 1500 },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&q=80", alt: "Walking a city street", width: 1200, height: 800 },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80", alt: "An embrace at golden hour", width: 1200, height: 1500 },
    { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1200&q=80", alt: "A quiet moment by the water", width: 1200, height: 800 },
    { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=1200&q=80", alt: "Two coffee cups on a table", width: 1200, height: 800 },
  ] as Photo[],
};

/* ------------------------------------------------------------------ */
/* Guest Gallery                                                       */
/* ------------------------------------------------------------------ */

export const guestGallery = {
  subtitle: "Seen something we missed? Add it to the issue.",
  intro:
    "Throughout the day, we'd love to see the wedding through your eyes. Upload your photos here and we'll fold the best of them into a shared album for everyone.",
};

/* ------------------------------------------------------------------ */
/* Chapter 06 — FAQ                                                    */
/* ------------------------------------------------------------------ */

export const faq = {
  subtitle: "The questions we've been asked most, grouped so you can skim.",
  categories: [
    {
      category: "The Invitation",
      pairs: [
        {
          q: "Can I bring a plus-one?",
          a: "Your invitation will name everyone we've saved a seat for. If it says '& Guest', absolutely — otherwise we're keeping the day small and close.",
        },
        {
          q: "Are children welcome?",
          a: "We adore your little ones, but this is an adults-only celebration — a rare night off. We hope it lets you dance a little longer.",
        },
      ],
    },
    {
      category: "On the Day",
      pairs: [
        {
          q: "What's the dress code, really?",
          a: "Garden formal. Think suits and elevated dresses in soft, warm tones. The ceremony is on grass, so plan your heels accordingly.",
        },
        {
          q: "Will there be parking?",
          a: "Limited. We strongly recommend taxis or ride-hailing, and there's a shuttle between the ceremony and reception.",
        },
        {
          q: "Any dietary options?",
          a: "Yes — tell us on the RSVP form and the kitchen will take good care of you.",
        },
      ],
    },
    {
      category: "Getting Here",
      pairs: [
        {
          q: "Where should I stay?",
          a: "We'll suggest a few hotels close to the venue once it's confirmed. If we hold a room block, we'll share the code here — or email us for it.",
        },
      ],
    },
  ],
  contact: {
    email: "hello@amara-and-elias.com",
    coordinators: [
      { name: "Coordinator name", role: "Day-of Coordinator", phone: "+44 7700 900000" },
      { name: "Best man name", role: "Best Man", phone: "+44 7700 900111" },
      { name: "Maid of honour", role: "Maid of Honour", phone: "+44 7700 900222" },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Chapter 07 — Trivia                                                 */
/* ------------------------------------------------------------------ */

export const trivia = {
  subtitle: "How well do you know the happy couple? A gentle test.",
  prize: "Everyone who plays goes into a draw for a bottle of something lovely at the reception. Answer honestly — the couple will know.",
  questions: [
    {
      q: "Where did we first meet?",
      options: ["A wedding", "Outside a bookshop", "On holiday", "At work"],
      answer: 1,
    },
    {
      q: "Which city are we getting married in?",
      options: ["Manchester", "London", "Edinburgh", "Bristol"],
      answer: 1,
    },
    {
      q: "Where are we honeymooning?",
      options: ["Japan", "Italy", "Iceland", "Morocco"],
      answer: 0,
    },
    {
      q: "What went cold during the proposal?",
      options: ["A pizza", "A bag of chips", "The champagne", "Nothing"],
      answer: 1,
    },
    {
      q: "How many cities have we lived in together?",
      options: ["Two", "Three", "Four", "Five"],
      answer: 2,
    },
  ],
};
