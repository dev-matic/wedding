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
  /** The wedding day — drives the countdown. ISO 8601 with timezone. */
  weddingDate: "2026-11-14T14:00:00+01:00",
  city: "Lisbon, Portugal",
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
  subtitle: "How it began, and the question that followed.",
  howWeMet: {
    eyebrow: "The Meeting",
    title: "A borrowed umbrella",
    body: [
      "We met on a grey Tuesday outside a bookshop that neither of us meant to visit. Amara was sheltering from the rain under an awning; Elias had one umbrella and, as the story goes, terrible aim. What began as a shared walk to the tram became a shared coffee, then a standing Sunday habit that quietly rearranged both our weeks.",
      "Three years, four cities, and one very opinionated cat later, we still argue about who was actually holding the umbrella. Neither version has ever been settled.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1400&q=80",
      alt: "The couple walking together on a rainy street",
      caption: "The bookshop corner, revisited every anniversary.",
      width: 1400,
      height: 933,
    } as Photo,
  },
  proposal: {
    eyebrow: "The Proposal",
    title: "At the end of the pier",
    body: [
      "It happened where we least expected the ordinary to turn — the end of a wooden pier at dusk, with the tide coming in and a paper bag of chips going cold. There was no crowd, no drone, no string quartet. Just a question, a long pause that felt longer than it was, and a yes that arrived before the sentence had finished.",
      "We walked home the long way. We are still walking the long way.",
    ],
    photo: {
      src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=1400&q=80",
      alt: "A pier stretching into the sea at dusk",
      caption: "The pier, at the hour it happened.",
      width: 1400,
      height: 933,
    } as Photo,
  },
};

/* ------------------------------------------------------------------ */
/* Chapter 02 — Details                                                */
/* ------------------------------------------------------------------ */

export const details = {
  subtitle: "Everything you need to be there, and to be comfortable once you are.",
  ceremony: {
    eyebrow: "The Ceremony",
    title: "The vows",
    body: "We'll say the important words in the early afternoon, under the trees in the convent garden. Arrive a little early — the gates close for the ceremony, and we'd hate for you to miss the beginning.",
    photo: {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1400&q=80",
      alt: "A garden set for an outdoor ceremony",
      caption: "Convento dos Cardaes — the garden.",
      width: 1400,
      height: 933,
    } as Photo,
    cards: [
      { label: "Date & Time", value: "Saturday 14 November 2026", detail: "2:00 PM — arrive by 1:30" },
      { label: "Venue", value: "Convento dos Cardaes", detail: "Rua do Século 123, Lisbon" },
      { label: "Dress Code", value: "Garden formal", detail: "Soft heels for grass" },
    ],
  },
  reception: {
    eyebrow: "The Reception",
    title: "The long table",
    body: "Dinner, toasts and dancing follow at a converted riverside warehouse a short drive away. Shuttles will run from the ceremony; details to follow closer to the day.",
    photo: {
      src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=1400&q=80",
      alt: "A long candlelit dinner table set for a reception",
      caption: "The warehouse, dressed for dinner.",
      width: 1400,
      height: 933,
    } as Photo,
    cards: [
      { label: "Reception", value: "6:00 PM till late", detail: "Dinner at 7:30" },
      { label: "Venue", value: "Cais 18", detail: "Doca de Alcântara, Lisbon" },
      { label: "Getting There", value: "Shuttle provided", detail: "Departs the ceremony at 4:45" },
    ],
  },
  mapLink: "https://maps.google.com/?q=Convento+dos+Cardaes+Lisbon",
  travel: [
    {
      label: "By Air",
      title: "Lisbon Airport (LIS)",
      body: "Humberto Delgado Airport is 20 minutes from the city centre by taxi. Most European capitals are a short direct flight away.",
    },
    {
      label: "Where to Stay",
      title: "Chiado & Príncipe Real",
      body: "Both neighbourhoods put you within walking distance of the ceremony. We've held a small block of rooms — see the FAQ for the code.",
    },
    {
      label: "Getting Around",
      title: "Trams, taxis & feet",
      body: "Lisbon is a walking city built on hills. Comfortable shoes by day; ride-hailing is cheap and plentiful by night.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 03 — Registry                                               */
/* ------------------------------------------------------------------ */

export const registry = {
  subtitle: "Your presence is the gift. If you'd like to give more, here's where.",
  intro:
    "We're lucky to already share a home, so more than anything we'd love your company on the day. For those who've asked, we've gathered a few things below — including a contribution toward the honeymoon we've been dreaming up.",
  items: [
    {
      label: "The Honeymoon Fund",
      title: "Two weeks in Japan",
      body: "Help send us from Tokyo to Kyoto and back — trains, ryokan, and far too much ramen.",
      href: "https://example.com/honeymoon",
      cta: "Contribute",
    },
    {
      label: "The Home",
      title: "The kitchen list",
      body: "A curated set of the pieces we cook and gather around.",
      href: "https://example.com/registry",
      cta: "View registry",
    },
    {
      label: "Give Back",
      title: "A donation in your name",
      body: "In lieu of a gift, a contribution to a cause close to us.",
      href: "https://example.com/donate",
      cta: "Donate",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 04 — RSVP                                                   */
/* ------------------------------------------------------------------ */

export const rsvp = {
  subtitle: "Kindly reply by 1 October 2026.",
  intro:
    "We can't wait to celebrate with you. Let us know if you can make it, and tell us how to feed you well.",
  deadline: "1 October 2026",
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
  subtitle: "The questions we've been asked most.",
  pairs: [
    {
      q: "Can I bring a plus-one?",
      a: "Your invitation will name everyone we've saved a seat for. If it says '& Guest', absolutely — otherwise we're keeping the day small and close.",
    },
    {
      q: "Are children welcome?",
      a: "We adore your little ones, but this is an adults-only celebration — a rare night off. We hope it lets you dance a little longer.",
    },
    {
      q: "What's the dress code, really?",
      a: "Garden formal. Think suits and elevated dresses in soft, warm tones. The ceremony is on grass, so plan your heels accordingly.",
    },
    {
      q: "Where should I stay?",
      a: "Chiado and Príncipe Real are both walkable to the ceremony. We've reserved a room block at a nearby hotel — email us for the code.",
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
};

/* ------------------------------------------------------------------ */
/* Chapter 07 — Trivia                                                 */
/* ------------------------------------------------------------------ */

export const trivia = {
  subtitle: "How well do you know the happy couple? A gentle test.",
  questions: [
    {
      q: "Where did we first meet?",
      options: ["A wedding", "Outside a bookshop", "On holiday", "At work"],
      answer: 1,
    },
    {
      q: "Which city are we getting married in?",
      options: ["Porto", "Madrid", "Lisbon", "Seville"],
      answer: 2,
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
