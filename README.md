# Kwabena & Sandra — Anchored in Grace

The wedding website for Kwabena & Sandra (Saturday 21 November 2026, London).

A multipage site with an immersive **Gold Dust cover** — gold particles
(three.js) drifting over the couple's black-and-white photo, morphing between
their monogram, an anchor, and the date — opening onto warm, cream editorial
pages for the story, the day, the gallery, the registry and the RSVP.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, self-hosted
fonts via `next/font`, `next/image` for photography, and a little three.js on
the cover. Deploys cleanly to Vercel.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint       # eslint
npm run start      # serve the production build
```

---

## The pages

| Route        | Page        | What's on it                                                        |
| ------------ | ----------- | ------------------------------------------------------------------- |
| `/`          | Cover       | Gold-particle three.js hero over the couple's photo + nav          |
| `/story`     | Our Story   | Alternating photo/text blocks + pull-quote                          |
| `/details`   | The Wedding | Three celebrations, per-event countdowns, day-of contacts          |
| `/gallery`   | Gallery     | The 16-photo London pre-wedding shoot (editorial grid)             |
| `/registry`  | Registry    | Cash gifts — PayPal + bank transfer                                 |
| `/rsvp`      | RSVP        | The invitation card, then the attendance form                      |

Navigation is the floating gold menu (top-right ☰) and a persistent **RSVP**
button (both site-wide), plus the monogram top-left that links home.

**The Wedding** covers three events: the **Traditional Ceremony** (Sat 14 Nov
2026, Akropong, Ghana), the **White Wedding** (Sat 21 Nov 2026, 1:00 PM,
Presbyterian Church of Ghana — Revival Congregation, Leyton, London), and the
**Reception** (immediately after). The traditional ceremony and white wedding
each show a live countdown.

> Some earlier magazine-style routes (`/contents`, `/faq`, `/trivia`,
> `/guest-gallery`, `/preview/*`) still exist in `app/` but are **not linked**
> from the site. They can be restyled to the current look or deleted.

---

## Design

Gold-on-monochrome, drawn from the couple's invitation:

- **Cover** — near-black, gold particles (`#e7c766`), the B&W photo.
- **Pages** — warm cream ground (`paper` `#FAF8F5` / `paper-dim`), near-black
  `ink` text, a deep gold accent (`#a8842c`), and navy (`accent` `#2E3C56`) on
  the menu overlay and invitation. Fonts: Playfair-style display, Cormorant
  serif body, Inter UI.
- **Motion** — `Reveal` fades/lifts content in on load and on scroll,
  everywhere, and respects `prefers-reduced-motion`.

Palette and type scale live in `tailwind.config.ts`.

---

## Where things live

```
app/
  layout.tsx              Root layout, fonts, metadata (title: "Anchored in Grace — <page>")
  icon.svg                K&S monogram favicon
  fonts.ts                Self-hosted display / body / UI fonts
  globals.css             Base styles + editorial helpers
  page.tsx                Cover (GoldDustCover)
  story|details|gallery|registry|rsvp/   One route per page, with per-page <title>
  api/rsvp/               RSVP endpoint → forwards to a Google Sheet
components/
  GoldDustCover.tsx       three.js particle cover
  Countdown.tsx           Live countdown (hydration-safe placeholders, no CLS)
  Reveal.tsx              Scroll/-load reveal wrapper
  Invitation.tsx          Opening card → RSVP form (name, email, attending, guests, message)
  BankGift.tsx            Cash-gift card: PayPal button + bank-transfer details
  home/
    SectionMenu.tsx       Floating ☰ menu + persistent RSVP button (site-wide)
    PageHeader.tsx        Monogram top-left on section pages
    SiteFooter.tsx        Footer with nav + smooth "Back to top"
    StorySection.tsx      Our Story
    DetailsSection.tsx    The three celebrations + countdowns
    GallerySection.tsx    12-col editorial grid (9-slot cycle)
    GalleryFigure.tsx     One photo: shimmer + fade-in + hover
    RegistrySection.tsx   Registry wrapper
    ContactsSection.tsx   Day-of contacts (tap-to-call)
lib/
  content.ts              ← Copy, dates, venues, registry, contacts, invitation
  gallery.ts              ← Ordered gallery photos ({ src, alt, caption, meta })
docs/
  RSVP-SHEET-SETUP.md     One-time Google Sheet setup for RSVPs
tailwind.config.ts        Palette + type scale
next.config.mjs           Allowed remote image hosts
```

---

## Making it yours

**1. Copy & details** — almost everything is in `lib/content.ts`: names,
monogram, hashtag, the wedding date, story blocks, the three celebrations
(dates/times/venues/dress code/map links/countdown targets), registry details,
and the day-of contacts.

**2. Photos** — real photos live in `public/` and are referenced by path:

- `cover.jpeg` — the cover photo (kept black & white).
- `story1.jpg` … `story3.jpg` — Our Story blocks.
- `traditional.jpg`, `white-wedding.jpg`, `reception.jpg` — the three celebrations.
- `image0.jpeg` … `image15.jpeg` — the gallery (edit the list in `lib/gallery.ts`).

Keep the `width`/`height` in the content files roughly accurate so `next/image`
reserves the right space (no layout shift). Remote image hosts must be listed
in `images.remotePatterns` in `next.config.mjs`.

**3. Registry** — bank details and the PayPal link are in
`lib/content.ts → registry.cashGift`. No amounts are suggested; gifts are made
on the couple's own platforms.

**4. Design tokens** — `tailwind.config.ts` (`paper`, `ink`, `accent` navy,
`accent-soft` gold). `themeColor` for mobile browser chrome is in
`app/layout.tsx`.

---

## RSVP submissions → Google Sheet

Each RSVP is forwarded to a Google Sheet the couple can open anytime. The site
POSTs the reply to a Google Apps Script web-app URL stored in the
**`RSVP_SHEET_WEBHOOK_URL`** environment variable.

- One-time setup (create sheet, add the script, deploy, set the env var,
  redeploy): see **`docs/RSVP-SHEET-SETUP.md`**.
- If the variable isn't set, replies are logged server-side so the form still
  works — but they won't be collected anywhere until it's connected.

---

## Deploy

Hosted on **Vercel**. Push to the Git repo and it deploys automatically. Set
`RSVP_SHEET_WEBHOOK_URL` (and any future env vars) in **Project → Settings →
Environment Variables**, then redeploy so they take effect.

### Maintenance notes

- **Next.js** is pinned to a patched `14.2.x`. `npm audit` will suggest Next 16
  to clear historical advisories; most are self-hosted-only or build-time and
  don't apply to this Vercel-hosted site. Treat a Next 15/16 upgrade as a
  separate, tested task — don't run `npm audit fix --force`.
- Deprecation warnings from dev tooling (eslint 8, glob, rimraf, etc.) are
  build-time only and don't affect the live site.
