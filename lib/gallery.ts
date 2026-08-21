/**
 * Gallery content — one ordered array. Layout comes from array *position*
 * (the grid cycles every 9 slots), never from anything stored here, so photos
 * can be reordered or swapped without touching the layout code.
 *
 * Order chronologically. All sixteen are from the couple's London pre-wedding
 * shoot; drop new photos in /public and add a line here.
 */

export type GalleryImage = {
  /** /public path or blob URL. */
  src: string;
  /** Describes the photograph for anyone who cannot see it. Not the caption. */
  alt: string;
  /** Short line with personality — about the moment, not the frame. */
  caption: string;
  /** Strictly "Place · Year". */
  meta: string;
};

const PLACE_YEAR = "London · 2026";

export const galleryImages: GalleryImage[] = [
  {
    src: "/image0.jpeg",
    alt: "Kwabena and Sandra standing together during their London pre-wedding shoot",
    caption: "Where the conversation that started on a phone call kept going",
    meta: PLACE_YEAR,
  },
  {
    src: "/image1.jpeg",
    alt: "A portrait of Sandra and Kwabena from their London pre-wedding shoot",
    caption: "Still each other's favourite hello",
    meta: PLACE_YEAR,
  },
  {
    src: "/image2.jpeg",
    alt: "Kwabena and Sandra outdoors in London for their pre-wedding shoot",
    caption: "London gave us the light; we brought the rest",
    meta: PLACE_YEAR,
  },
  {
    src: "/image3.jpeg",
    alt: "A close portrait of Kwabena and Sandra during their pre-wedding shoot",
    caption: "The easy quiet we never get tired of",
    meta: PLACE_YEAR,
  },
  {
    src: "/image4.jpeg",
    alt: "Kwabena and Sandra side by side at their London pre-wedding shoot",
    caption: "Practising for a lifetime of standing side by side",
    meta: PLACE_YEAR,
  },
  {
    src: "/image5.jpeg",
    alt: "Sandra and Kwabena together during their pre-wedding shoot in London",
    caption: "Every plan we ever made, made better together",
    meta: PLACE_YEAR,
  },
  {
    src: "/image6.jpeg",
    alt: "A portrait of Kwabena and Sandra at their London pre-wedding shoot",
    caption: "The look that a thoughtful introduction set in motion",
    meta: PLACE_YEAR,
  },
  {
    src: "/image7.jpeg",
    alt: "Kwabena and Sandra photographed together in London before the wedding",
    caption: "Anchored, long before the vows",
    meta: PLACE_YEAR,
  },
  {
    src: "/image8.jpeg",
    alt: "Sandra and Kwabena during their London pre-wedding shoot",
    caption: "Two homes, Ghana and London — one direction",
    meta: PLACE_YEAR,
  },
  {
    src: "/image9.jpeg",
    alt: "A candid portrait of Kwabena and Sandra at their pre-wedding shoot",
    caption: "The in-joke only the two of us will ever get",
    meta: PLACE_YEAR,
  },
  {
    src: "/image10.jpeg",
    alt: "Kwabena and Sandra together outdoors in London",
    caption: "Choosing each other, again",
    meta: PLACE_YEAR,
  },
  {
    src: "/image11.jpeg",
    alt: "A portrait of Sandra and Kwabena from their London pre-wedding shoot",
    caption: "A little rehearsal for the big day",
    meta: PLACE_YEAR,
  },
  {
    src: "/image12.jpeg",
    alt: "Kwabena and Sandra sharing a moment during their pre-wedding shoot",
    caption: "Grace, and a whole lot of laughing",
    meta: PLACE_YEAR,
  },
  {
    src: "/image13.jpeg",
    alt: "Kwabena and Sandra walking together in London before the wedding",
    caption: "The long way round, always worth it",
    meta: PLACE_YEAR,
  },
  {
    src: "/image14.jpeg",
    alt: "A portrait of Kwabena and Sandra hand in hand at their pre-wedding shoot",
    caption: "Counting down, hand in hand",
    meta: PLACE_YEAR,
  },
  {
    src: "/image15.jpeg",
    alt: "Kwabena and Sandra together at the close of their London pre-wedding shoot",
    caption: "Ready for whatever comes next",
    meta: PLACE_YEAR,
  },
];
