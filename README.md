# Kwabena & Sandra — Anchored in Grace

An editorial, "magazine issue" wedding website. Rather than one long scroll,
the site reads as a single printed issue: a **cover**, a **contents** page,
then numbered **chapters**, each on its own route with a running header and a
page number in the footer. You navigate prev/next, the way you'd turn pages.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS**, self-hosted
fonts via `next/font`, and `next/image` for all imagery. Deploys cleanly to
Vercel.

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

---

## The issue

| Route            | Chapter | Purpose                                            |
| ---------------- | ------- | -------------------------------------------------- |
| `/`              | Cover   | Full-bleed cover, monogram, single "Contents →"    |
| `/contents`      | Page 01 | Chapter index + countdown                          |
| `/story`         | 01      | How you met, the proposal                          |
| `/details`       | 02      | Dates, venues, dress code, travel, day timeline    |
| `/registry`      | 03      | Gift guide                                         |
| `/rsvp`          | 04      | Attendance form                                    |
| `/gallery`       | 05      | Curated photo set                                  |
| `/guest-gallery` | ✦       | Guest photo uploads (marked with a symbol)         |
| `/faq`           | 06      | Common questions                                   |
| `/trivia`        | 07      | Optional light quiz                                |

To **drop a chapter**, remove it from `lib/chapters.ts` — page numbers and
prev/next navigation renumber automatically.

---

## Where things live

```
app/
  layout.tsx              Root layout, fonts, site-wide metadata + OG/Twitter
  fonts.ts                Self-hosted display / body / UI fonts
  globals.css             Base styles + editorial helpers (.eyebrow, .numeral…)
  page.tsx                Cover
  contents/               Contents (Page 01) + countdown
  story|details|…/        One route per chapter, each with per-page metadata
  api/rsvp/               RSVP submission endpoint
  api/guest-gallery/      Guest upload endpoint (storage stub — see below)
components/
  ChapterLayout.tsx       The shared frame: running header + footer + page no.
  ChapterOpener.tsx       Eyebrow → large title → subtitle
  NumberedIndex.tsx       01 / 02 / 03 at-a-glance strip
  Countdown.tsx           Client countdown with "--" placeholders (no CLS)
  FeatureBlock.tsx        Full-bleed image + text + detail cards (alternating)
  Timeline.tsx            Stacked schedule
  InfoGrid.tsx            2–3 logistics cards
  ActionCard.tsx          Heading + description + primary/secondary buttons
  RsvpForm.tsx            The attendance form
  TriviaQuiz.tsx          The quiz
  GuestUpload.tsx         Guest photo picker + upload
lib/
  content.ts              ← ALL your copy, dates, links and imagery
  chapters.ts             Chapter order → page numbers + prev/next
tailwind.config.ts        Palette + editorial type scale
```

---

## Making it yours

**1. Content.** Almost everything you'll change lives in `lib/content.ts`:
couple names, monogram, hashtag, the wedding date (drives the countdown),
story copy, ceremony/reception details, registry links, FAQ pairs, gallery
images and trivia questions.

**2. Photography.** Placeholders point at Unsplash during the build. Before
launch, drop real photos into `public/` and update the `src` values in
`lib/content.ts` (e.g. `"/photos/cover.jpg"`). Keep the `width`/`height`
accurate so `next/image` reserves the right space. If you use another remote
host, add it to `images.remotePatterns` in `next.config.mjs`.

**3. Design tokens.** Palette and type scale are in `tailwind.config.ts`
(warm off-white `paper`, soft near-black `ink`, one muted `accent`). Update
`themeColor` in `app/layout.tsx` if you change the background.

**4. The OG image.** Most guests meet the site through a WhatsApp / iMessage
link preview, so set `ogImage` in `lib/content.ts` to a real 1200×630 photo
and set `siteUrl` to your deployed URL.

---

## RSVP submissions

`app/api/rsvp/route.ts` validates each reply and currently logs it
server-side so the form works end to end. Before launch, replace the marked
section with real storage or a notification — a Google Sheet, Airtable,
Notion, a database, or an email via Resend/SendGrid.

## Guest gallery uploads

`app/api/guest-gallery/route.ts` validates uploads but returns `501` until a
storage provider is connected — the UI stays honest about that. On Vercel,
[Vercel Blob](https://vercel.com/docs/storage/vercel-blob) is the natural fit:

```ts
import { put } from "@vercel/blob";
const blob = await put(file.name, file, { access: "public" });
```

(Add `@vercel/blob` and a `BLOB_READ_WRITE_TOKEN` env var first.)

---

## Deploy

Push to a Git repo and import it on [Vercel](https://vercel.com/new) — no
configuration needed. Set any env vars you add for RSVP storage or Blob
uploads in the project settings.
