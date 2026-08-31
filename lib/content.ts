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
  /** Display names, in order (as printed on the invitation). */
  partnerA: "Kwabena",
  partnerB: "Sandra",
  /** Full names, for the formal line under the masthead / details. */
  fullNames: "Kwabena Obeng Boateng & Sandra Aboagyewaa Oduro",
  /** Used in <title> etc. */
  names: "Kwabena & Sandra",
  /** Monogram shown on the cover and in the running header. */
  monogram: "K&S",
  hashtag: "#AnchoredInGrace",
  /** The couple's theme, printed on the invitation. */
  theme: "Anchored in Grace",
  /** The wedding day — drives the countdown. ISO 8601 with timezone. */
  weddingDate: "2026-11-21T13:00:00+00:00",
  /** The same day, split for the large stacked date on the contents page. */
  weddingDay: { day: "Saturday", date: "21 November", year: "2026" },
  city: "London, United Kingdom",
  year: "2026",
  /** Issue label shown on the cover masthead. */
  issueLabel: "The Wedding Issue",
  issueNo: "N° 01",
};

/** Base URL of the deployed site — used for absolute OG image URLs. */
export const siteUrl = "https://anchored-in-grace.vercel.app";

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
  alt: "Kwabena & Sandra — Anchored in Grace",
  width: 1200,
  height: 630,
};

/* ------------------------------------------------------------------ */
/* Chapter 01 — Story                                                  */
/* ------------------------------------------------------------------ */

export const story = {
  subtitle: "How it began, told in the order it happened.",
  /** Feature blocks in order. Alternate imageSide; captions name the beat.
   *  TODO: replace the placeholder photos with your own before launch. */
  blocks: [
    {
      year: "",
      eyebrow: "The Introduction",
      title: "It began with a phone call",
      body: [
        "Our journey began in a way we never expected — over the phone, thanks to a thoughtful introduction by someone special to us. That first conversation sparked a connection that grew deeper with every passing day.",
        "What could have been a single phone call became, quietly and then all at once, the beginning of a lifelong commitment.",
      ],
      photo: {
        src: "/story1.jpg",
        alt: "Kwabena and Sandra together",
        caption: "The Introduction",
        width: 1200,
        height: 1599,
      } as Photo,
      imageSide: "left" as const,
    },
    {
      year: "",
      eyebrow: "The Growing Bond",
      title: "Each other's greatest strength",
      body: [
        "Over time, we realised that what we shared was truly special. We found that we were not only partners but each other's greatest source of strength.",
        "As we navigated life together, we leaned on our shared faith and the values that brought us closer — the quiet foundation beneath everything we were building.",
      ],
      photo: {
        src: "/story2.jpg",
        alt: "Kwabena and Sandra sharing a moment",
        caption: "The Growing Bond",
        width: 1600,
        height: 1200,
      } as Photo,
      imageSide: "right" as const,
    },
    {
      year: "",
      eyebrow: "The Theme",
      title: "Anchored in Grace",
      body: [
        "That shared faith is why our wedding theme is “Anchored in Grace” — it represents the foundation of our love and the promise we are making to one another. “We have this hope as an anchor for the soul, firm and secure” (Hebrews 6:19).",
        "We are so grateful for the love and support of our families in Ghana and here in London. As we look forward to 21st November 2026, we are filled with joy to step into this new chapter as one — surrounded by the people who mean the most to us.",
      ],
      photo: {
        src: "/story3.jpg",
        alt: "Kwabena and Sandra looking ahead together",
        caption: "Anchored in Grace",
        width: 1200,
        height: 1599,
      } as Photo,
      imageSide: "left" as const,
    },
  ],
  funFacts: [
    { label: "How we met", detail: "A phone call, and a thoughtful introduction" },
    { label: "Our theme", detail: "Anchored in Grace · Hebrews 6:19" },
    { label: "Our anchor", detail: "Faith, family, and each other" },
  ],
  stats: {
    eyebrow: "By the Numbers",
    items: [
      { figure: "2", label: "Homes, one family", gloss: "Ghana and London, together" },
      { figure: "6:19", label: "Hebrews", gloss: "an anchor for the soul, firm and secure" },
      { figure: "1", label: "Promise", gloss: "made to one another, for a lifetime" },
    ],
    footnote: "Anchored in grace, and grateful for every hand that steadied us here.",
  },
  pullQuote: {
    quote: "We were not only partners, but each other's greatest source of strength.",
    attribution: "Kwabena & Sandra",
  },
  closing: {
    signoff: "We can't wait to celebrate this new chapter with you.",
  },
};

/* ------------------------------------------------------------------ */
/* Chapter 02 — Details                                                */
/* ------------------------------------------------------------------ */

export const details = {
  subtitle: "Everything you need to be there, and to be comfortable once you are.",
  /** Ceremony and reception, each with its own countdown target and feature
   *  block. The reception follows at the same premises as the ceremony.
   *  TODO: confirm the reception start time and dress code, then update below. */
  events: [
    {
      key: "ceremony",
      label: "The Ceremony",
      target: "2026-11-21T13:00:00+00:00",
      eyebrow: "The Ceremony",
      title: "The vows",
      year: "1:00 PM",
      body: "We'll say the important words at one o'clock in the afternoon. Please arrive a little early — the doors close for the ceremony, and we'd hate for you to miss the beginning.",
      photo: {
        src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1400&q=80",
        alt: "A church set for a wedding ceremony",
        caption: "Chapter 02 · The Ceremony",
        width: 1400,
        height: 933,
      } as Photo,
      cards: [
        { label: "Date & Time", value: "Saturday 21 November 2026", detail: "1:00 PM — arrive by 12:30" },
        { label: "Venue", value: "Presbyterian Church of Ghana", detail: "Revival Congregation · Leyton" },
        { label: "Address", value: "37–39 Grange Park Road", detail: "Leyton, London E10 5EP" },
      ],
      imageSide: "left" as const,
    },
    {
      key: "reception",
      label: "The Reception",
      target: "2026-11-21T16:00:00+00:00",
      eyebrow: "The Reception",
      title: "The celebration",
      year: "To follow",
      body: "Once the vows are said, the celebration continues at the same place — no travelling required. Join us at the church premises for food, toasts and dancing.",
      photo: {
        src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=1400&q=80",
        alt: "A hall set for a wedding reception",
        caption: "Chapter 02 · The Reception",
        width: 1400,
        height: 933,
      } as Photo,
      cards: [
        { label: "When", value: "Straight after the ceremony", detail: "Time to be confirmed" },
        { label: "Where", value: "At the church premises", detail: "No onward travel needed" },
        { label: "What to Expect", value: "Food, toasts & dancing", detail: "Stay and celebrate with us" },
      ],
      imageSide: "right" as const,
    },
  ],
  strip: [
    { label: "The Ceremony", detail: "1:00 PM · Leyton" },
    { label: "The Reception", detail: "To follow · same premises" },
    { label: "Scripture", detail: "Hebrews 6:19" },
  ],
  timeline: [
    { date: "21 Nov", event: "Guests seated", time: "12:30 PM", place: "Please arrive early" },
    { date: "21 Nov", event: "Ceremony", time: "1:00 PM", place: "Presbyterian Church of Ghana" },
    { date: "21 Nov", event: "Reception", time: "To follow", place: "At the church premises" },
    { date: "21 Nov", event: "Dinner & toasts", time: "To follow", place: "Church premises" },
    { date: "21 Nov", event: "Dancing", time: "Till late", place: "Church premises" },
  ],
  /** The three celebrations, in order. Drives the one-page “The Wedding”
   *  section. Replace each `photo.src` with a real photo in /public before
   *  launch (e.g. "/traditional.jpg"). */
  ceremonies: [
    {
      no: "01",
      kicker: "A Family Tradition",
      title: "The Traditional Ceremony",
      target: "2026-11-14T09:00:00+00:00",
      body: "Join us as we honour our Ghanaian roots with a beautiful traditional wedding ceremony. Experience the rich customs, vibrant kente cloth, and joyful celebrations of our heritage.",
      note: "Strictly by invitation only",
      rows: [
        { label: "Date & Time", value: "Saturday, 14th November 2026", detail: "9:00 AM" },
        { label: "Venue", value: "Akuapem Hospitality Center", detail: "Akropong Akuapem · Eastern Region, Ghana" },
        { label: "Dress Code", value: "Traditional Ghanaian Attire", detail: "Kente, African print, or traditional formal wear" },
      ],
      mapLink: "https://maps.google.com/?q=Akuapem+Hospitality+Center+Akropong+Akuapem+Ghana",
      photo: {
        src: "/traditional.jpg",
        alt: "A couple in traditional Ghanaian kente attire",
        width: 1200,
        height: 1500,
      } as Photo,
      imageSide: "right" as const,
    },
    {
      no: "02",
      kicker: "A Sacred Union",
      title: "The White Wedding",
      target: "2026-11-21T13:00:00+00:00",
      body: "We invite you to witness the blessing of our marriage in a beautiful church ceremony — a moment of faith, love, and the beginning of our forever.",
      note: "",
      rows: [
        { label: "Date & Time", value: "Saturday, 21st November 2026", detail: "1:00 PM · please arrive by 12:30" },
        { label: "Venue", value: "Presbyterian Church of Ghana", detail: "Revival Congregation · 37–39 Grange Park Road, Leyton, London E10 5EP" },
        { label: "Dress Code", value: "Formal / Cocktail Attire", detail: "Elegant dresses and suits in soft, celebratory colours" },
      ],
      mapLink: "https://maps.google.com/?q=Presbyterian+Church+of+Ghana+37-39+Grange+Park+Road+Leyton+E10+5EP",
      photo: {
        src: "/white-wedding.jpg",
        alt: "Two wedding rings",
        width: 1200,
        height: 1500,
      } as Photo,
      imageSide: "left" as const,
    },
    {
      no: "03",
      kicker: "A Toast to Forever",
      title: "The Reception",
      target: "",
      body: "Once the vows are said, stay right where the celebration begins. Join us for food, drinks, and a long, lingering toast to forever with the people we love most — no onward travel needed.",
      note: "",
      rows: [
        { label: "Date & Time", value: "Saturday, 21st November 2026", detail: "Immediately after the ceremony" },
        { label: "Venue", value: "At the church premises", detail: "Revival Congregation · Leyton, London" },
        { label: "Dress Code", value: "Same as the service", detail: "No need to change — carry it straight through" },
      ],
      mapLink: "https://maps.google.com/?q=Presbyterian+Church+of+Ghana+37-39+Grange+Park+Road+Leyton+E10+5EP",
      photo: {
        src: "/reception.jpg",
        alt: "Guests celebrating at a wedding reception",
        width: 1200,
        height: 1500,
      } as Photo,
      imageSide: "right" as const,
    },
  ],
  mapLink: "https://maps.google.com/?q=Presbyterian+Church+of+Ghana+37-39+Grange+Park+Road+Leyton+E10+5EP",
  /** Programme PDF (host on Blob) and an optional live-stream link. */
  programme: {
    pdfHref: "#", // TODO: upload the programme PDF and link it here
    livestreamHref: "#", // TODO: paste the live-stream URL, or remove this block
  },
  travel: [
    {
      label: "By Air",
      title: "Stansted, Heathrow & Gatwick",
      body: "Stansted is the closest airport to east London; Heathrow and Gatwick both connect to the city by train in under an hour, with City and Luton as alternatives.",
    },
    {
      label: "By Rail & Tube",
      title: "Leyton Midland Road & Leyton",
      body: "Leyton Midland Road (London Overground) is a short walk from Grange Park Road. Leyton (Central line) and Stratford, a major interchange, are both nearby.",
    },
    {
      label: "Getting Around",
      title: "Buses & black cabs",
      body: "Tap in with a contactless card on the Tube, Overground and buses. Black cabs and ride-hailing are easy to find across east London, day and night.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Contacts — who to call on the day                                   */
/* ------------------------------------------------------------------ */

export const contacts = {
  intro:
    "Any questions on the day — the traditional ceremony or the wedding — these are the people to reach.",
  people: [
    { name: "Alberta", phone: "07909 070169", tel: "07909070169" },
    { name: "Sammy", phone: "07496 710107", tel: "07496710107" },
    { name: "Kate", phone: "05477 823020", tel: "05477823020" },
    { name: "Auntie Faustie", phone: "024 465 6181", tel: "0244656181" },
  ],
};

/* ------------------------------------------------------------------ */
/* Chapter 03 — Registry                                               */
/* ------------------------------------------------------------------ */

export const registry = {
  subtitle: "Your presence is the gift. If you'd like to give more, here's where.",
  intro:
    "We're grateful for your presence and your support as we start a new chapter in our lives together. If you would like to give us a gift, we have a registry below where you can do so. Thank you for being part of our story.",
  /** Cash gift — given by bank transfer (no payment account needed).
   *  TODO: replace bankDetails with the couple's real account details.
   *  To switch to a honeymoon-fund link or Stripe instead, see the note in
   *  components/BankGift.tsx. */
  cashGift: {
    paypal: "https://www.paypal.me/YaaAboagyewaa459",
    bankDetails: {
      accountName: "Sandra Oduro",
      sortCode: "04-00-05",
      accountNumber: "87816963",
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
      { name: "The Boateng family", message: "From Ghana to London, with all our love. God bless this union." },
      { name: "Auntie Grace", message: "Anchored in Grace, indeed. So proud of you both." },
      { name: "The whole congregation", message: "Congratulations! We'll be there to celebrate with you." },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Chapter 04 — RSVP                                                   */
/* ------------------------------------------------------------------ */

export const rsvp = {
  // TODO: confirm the RSVP deadline and update both fields below.
  subtitle: "Kindly reply by 1 October 2026.",
  intro:
    "Find your invitation using the code printed on your card, then let us know if you can make it — and how to feed you well.",
  deadline: "1 October 2026",
  /** Demo code shown on the lookup while building. Real codes live in the API. */
  demoCode: "GRACE26",
};

/** The invitation card shown at the top of the RSVP chapter.
 *  TODO: reword `familiesLine` if you'd rather name the parents specifically. */
export const invitation = {
  /** Closed-card script line. */
  tagline: "we do",
  /** The formal request line on the opened card. */
  familiesLine:
    "The Boateng and Oduro families warmly request the pleasure of your company at the wedding ceremony of their children",
  /** Full names shown beneath each first name. */
  partnerAFull: "Obeng Boateng",
  partnerBFull: "Aboagyewaa Oduro",
  venue: {
    name: "Presbyterian Church of Ghana",
    time: "1:00 PM",
    detail: "Revival Congregation, Leyton, London",
  },
  scriptureRef: "Hebrews 6:19",
  scripture: "We have this hope as an anchor for the soul, firm and secure.",
};

/* ------------------------------------------------------------------ */
/* Chapter 05 — Gallery                                                */
/* ------------------------------------------------------------------ */

export type GalleryItem = {
  src: string;
  alt: string;
  /** Short, with personality — not a literal description of the photo. */
  caption: string;
  place: string;
  /** Year, or "" to omit (e.g. across a single shoot). */
  year: string;
  width: number;
  height: number;
};

/** Placeholder image from Lorem Picsum — swap `src` for real photos before
 *  launch (drop them in /public or host on Blob). */
const pic = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const gallery = {
  subtitle: "Moments captured in time",
  /** Curated, not chronological. Eight captioned moments lead; the pre-wedding
   *  shoot fills out the rest with the year dropped so it reads as one session.
   *  TODO: replace every `src`, caption, place and year with the real photos. */
  items: [
    // — Eight distinct, captioned moments —
    { src: pic("ks-01", 1000, 1400), alt: "A quiet portrait", caption: "The call that started it all", place: "London", year: "2021", width: 1000, height: 1400 },
    { src: pic("ks-02", 1400, 1000), alt: "Two cups of coffee", caption: "First coffee, first debate about coffee", place: "London", year: "2021", width: 1400, height: 1000 },
    { src: pic("ks-03", 1000, 1400), alt: "Home for the holidays", caption: "Home for the holidays", place: "Accra", year: "2022", width: 1000, height: 1400 },
    { src: pic("ks-04", 1400, 1000), alt: "A city street", caption: "The Sunday we stopped counting Sundays", place: "London", year: "2023", width: 1400, height: 1000 },
    { src: pic("ks-05", 1000, 1400), alt: "Family gathering", caption: "Meeting the families", place: "Accra", year: "2023", width: 1000, height: 1400 },
    { src: pic("ks-06", 1400, 1000), alt: "An embrace", caption: "A yes he already knew", place: "London", year: "2024", width: 1400, height: 1000 },
    { src: pic("ks-07", 1000, 1400), alt: "Looking ahead", caption: "Counting down", place: "London", year: "2025", width: 1000, height: 1400 },
    { src: pic("ks-08", 1400, 1000), alt: "By the water", caption: "Anchored", place: "London", year: "2026", width: 1400, height: 1000 },

    // — The pre-wedding shoot (one session; year dropped) —
    { src: pic("ks-09", 1000, 1400), alt: "Golden hour portrait", caption: "Golden hour, finally", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-10", 1400, 1000), alt: "A shared glance", caption: "The look", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
    { src: pic("ks-11", 1000, 1400), alt: "An unposed moment", caption: "Us, unposed", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-12", 1200, 1200), alt: "Hands together", caption: "Hand in hand", place: "The pre-wedding shoot", year: "", width: 1200, height: 1200 },
    { src: pic("ks-13", 1400, 1000), alt: "A quiet corner", caption: "Somewhere quiet", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
    { src: pic("ks-14", 1000, 1400), alt: "A turning moment", caption: "The dress rehearsal", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-15", 1400, 1000), alt: "Laughing together", caption: "Laughing at nothing", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
    { src: pic("ks-16", 1000, 1400), alt: "Standing close", caption: "Still here", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-17", 1200, 1200), alt: "A close portrait", caption: "Closer", place: "The pre-wedding shoot", year: "", width: 1200, height: 1200 },
    { src: pic("ks-18", 1400, 1000), alt: "Walking away", caption: "The long way home", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
    { src: pic("ks-19", 1000, 1400), alt: "Light on a face", caption: "Light on your face", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-20", 1400, 1000), alt: "A candid moment", caption: "Between takes", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
    { src: pic("ks-21", 1000, 1400), alt: "One more frame", caption: "One more", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-22", 1200, 1200), alt: "Together", caption: "Together", place: "The pre-wedding shoot", year: "", width: 1200, height: 1200 },
    { src: pic("ks-23", 1400, 1000), alt: "Last of the light", caption: "The last of the light", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
    { src: pic("ks-24", 1000, 1400), alt: "Nearly there", caption: "Almost there", place: "The pre-wedding shoot", year: "", width: 1000, height: 1400 },
    { src: pic("ks-25", 1400, 1000), alt: "Into the evening", caption: "Forever, roughly", place: "The pre-wedding shoot", year: "", width: 1400, height: 1000 },
  ] as GalleryItem[],
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
          a: "Formal. Think suits and elegant dresses in warm, soft tones to match our navy, gold and terracotta theme. (We'll confirm any final note here nearer the day.)",
        },
        {
          q: "Is the reception at a different venue?",
          a: "No — the reception follows straight after the ceremony at the same church premises in Leyton, so there's no onward travel once you've arrived.",
        },
        {
          q: "Will there be parking?",
          a: "Street parking around Grange Park Road is limited, so we recommend public transport, taxis or ride-hailing. Leyton Midland Road station is a short walk away.",
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
          a: "There are plenty of hotels around Stratford, Leyton and Walthamstow, all a short ride from the church. If we arrange a preferred rate anywhere, we'll add the details here.",
        },
      ],
    },
  ],
  // TODO: replace the email and coordinator names/numbers with real contacts.
  contact: {
    email: "hello@anchoredingrace.co.uk",
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
      q: "How did we first meet?",
      options: ["At church", "Over the phone", "At a wedding", "At work"],
      answer: 1,
    },
    {
      q: "Which city are we getting married in?",
      options: ["Manchester", "London", "Accra", "Bristol"],
      answer: 1,
    },
    {
      q: "What is our wedding theme?",
      options: ["Forever & Always", "Anchored in Grace", "Two Hearts", "Better Together"],
      answer: 1,
    },
    {
      q: "Which scripture anchors our day?",
      options: ["1 Corinthians 13", "Hebrews 6:19", "Ruth 1:16", "Psalm 23"],
      answer: 1,
    },
    {
      q: "Where are our families from?",
      options: ["Ghana & London", "Nigeria & Leeds", "Ghana & Paris", "Kenya & London"],
      answer: 0,
    },
  ],
};
