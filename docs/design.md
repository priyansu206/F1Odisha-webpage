# F1 Odisha — Design System

> Pixel-perfect homage to the official Formula 1 website aesthetic, rebuilt around real F1 Odisha community content.
> **Motto: aggressive, data-heavy, zero curves.** No rounded corners anywhere. Ever.

---

## 1. Brand North Star

The current live site (f1odisha.com) positions the community as:
> *"Odisha's fastest-growing Formula 1 fan community. Watch parties, sim racing, karting events — and a family that bleeds motorsport."*
> Tagline: **"From the Temple City to the Grid"** · Region: Bhubaneswar, Odisha (cities: Bhubaneswar, Cuttack, Puri).

The rebuild fuses two identities:
1. **F1.com visual language** — carbon-black panels, F1 Red, Titillium Web, uppercase micro-labels, dense tables, ticker marquees, sharp diagonals.
2. **Odisha identity** — "The Konark Chakra turns at 18,000 RPM in our hearts", "One State. One Grid.", "the Kalinga spirit on the global grid."

Every UI decision must serve both: motorsport aggression + regional pride.

---

## 2. Color System

### 2.1 Core tokens (CSS custom properties → Tailwind `@theme`)

| Token | Hex | Usage |
|---|---|---|
| `--color-f1-red` | `#E10600` | Primary brand red. Buttons, kickers, active states, live dots, countdown numbers |
| `--color-f1-red-dark` | `#B00500` | Hover/depressed red |
| `--color-carbon` | `#15151E` | Primary background (hero, footer, dark panels) |
| `--color-carbon-2` | `#1E1E2A` | Raised dark panel / card on carbon |
| `--color-carbon-3` | `#26262F` | Hover state for dark panels, table row zebra on dark |
| `--color-white` | `#FFFFFF` | Text on carbon, primary light bg |
| `--color-off-white` | `#F5F5F5` | Section background alternate (light sections) |
| `--color-grey-100` | `#E8E8E8` | Borders/dividers on light |
| `--color-grey-300` | `#A9A9A9` | Muted borders on dark, disabled text |
| `--color-grey-500` | `#767676` | Muted/secondary body text |
| `--color-grey-700` | `#4C4C52` | Placeholder text on light |

### 2.2 Semantic accent tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-live-red` | `#E10600` | Pulsing "LIVE" dot / band (matches f1.com live coverage band) |
| `--color-podium-gold` | `#D8A300` | 1st place medal/row accent |
| `--color-podium-silver` | `#B9B9C0` | 2nd place |
| `--color-podium-bronze` | `#A0652E` | 3rd place |
| `--color-success` | `#0F9D58` | "Confirmed / Sold Out → Completed ✓" states (kept minimal) |
| `--color-warning` | `#E1A400` | "Last slots" warnings |

### 2.3 Usage rules
- **Red is a scalpel, not a bucket.** Use F1 Red for: CTA buttons, section kicker labels, the top ticker band, countdown numerals, active nav underline, key numbers (e.g. "23 Race Weekends"). Never flood a whole page in red.
- Carbon Black is the default surface on the home experience; alternating **off-white (light) sections** are permitted for rhythm exactly like f1.com alternates dark hero → light content → dark footer.
- Text contrast must pass WCAG AA on its assigned surface (white on carbon = OK; grey-500 text only on white/off-white).

---

## 3. Typography

### 3.1 Fonts (via `next/font/google`)
- **Titillium Web** — primary UI + body (this is F1.com's own family).
  - Weights: 400, 600, 700, 900. **No italic** except forced skew accents.
- **Rajdhani** — optional display/condensed alternative for big numerals and countdown digits (500/600/700). Rajdhani also ships Devanagari coverage — a safe fallback if any Hindi copy appears. If Odia script (ଓଡ଼ିଆ) is ever needed, pair with **Noto Sans Oriya** — neither Titillium nor Rajdhani covers Odia.
- Mono numerals for data: Titillium Web already has tabular-ish figures; set `font-variant-numeric: tabular-nums` on all timing/standing data.

### 3.2 Type scale (fluid via `clamp`)

| Role | Size / weight | Style |
|---|---|---|
| Display / Hero H1 | `clamp(3rem, 7vw, 6rem)` · 900 · uppercase | Tracking `-0.02em` |
| Section H2 | `clamp(2rem, 4vw, 3.5rem)` · 900 · uppercase | Tracking `-0.01em` |
| Card H3 | 1.25–1.5rem · 700 | Sentence case OK |
| Micro-label / kicker | 0.75rem · 700 · **uppercase** · tracking `0.12em` | F1.com signature element |
| Standings/schedule table | 0.875–1rem · 600 · tabular | Density is a feature |
| Countdown digits | `clamp(2.5rem, 6vw, 5rem)` · 700 | Rajdhani/Titillium, red |

### 3.3 Typography rules
- **Uppercase + letter-spaced** labels everywhere they'd be on f1.com (nav, module headers, table headers, timestamps). Sentence case only for headlines that are long-form.
- All numbers that represent data (points, slots, dates, counts, durations like `7:59`) use tabular numerals.
- Minimum body size 16px on light, 14px allowed for dense data tables.

---

## 4. Shape Language — "No curves, only corners"

- **Radius: `0`.** Every component, button, card, input, image, badge uses square corners. Add a global guard: a lint rule / utility name `no-rounded` is unnecessary — simply never apply `rounded-*`. New UI review checklist includes "any curve = bug".
- **Diagonal accents via `skew-x` / `clip-path`** (the aggressiveness layer):
  - CTA buttons and tag pills may use `-skew-x-12` with inner `skew-x-12` content to keep glyphs straight.
  - Section intro panels and hero divider bands use `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 24px), 0 100%)` (or mirrored) cut corners.
  - Diagonal **checkered-flag strip** (CSS repeating-linear-gradient black/white) reserved as a thin (4–8px) accent line under heroes and above footers.
- Sharp edge separators: 1px borders, 2px–4px solid bars in red/carbon. No soft shadows that blur edges — flat design; a hard offset shadow (`box-shadow: 6px 6px 0 #000`) is permitted for "poster" hero chips.

---

## 5. Layout & Density

- **12-column grid** (container max `1280px`, generous side padding on mobile).
- **Data-heavy, aggressive**: dense tabular modules (standings, round lists, slot timelines) sit beside bold display type — the f1.com contrast of "poster hero + spreadsheet".
- Default section rhythm: `py-16 md:py-24`, module headers carry a red kicker (e.g. `2026 SEASON`) + big title + right-aligned **"View All →"** link (f1.com pattern).
- Small screens: tables become stacked "data cards"; ticker becomes a marquee animation.

---

## 6. Component Inventory (mapped from formula1.com)

Analyzed from the live f1.com homepage + 2026 race calendar:

| F1.com component | Behavior observed | F1 Odisha adaptation |
|---|---|---|
| **Utility bar / live band** | Dark bar above nav; pulsing red LIVE tag + scrolling headlines | Carbon bar w/ scrolling community ticker: "Watch Parties • Sim Racing • Karting Events • Driver Debates • Race Predictions" |
| **Primary nav** | Top-level items: News, Videos, Live Timing, Fantasy, Gaming, New to F1?, F1 Awards; white text on carbon; red hover underline | Nav: Home, About, Events, Schedule, Membership, My Docs (see flow.md); left logo lockup "F1 ODISHA", right CTA "JOIN THE GRID" |
| **Module header** | Red uppercase kicker + H2 + "View All" | Every homepage module |
| **News card** | Thumbnail + tag ("Unlocked"/"Exclusive") + headline + meta; video cards show duration badge `mm:ss` | Community news / content cards |
| **Standings table** | Pos / Driver (avatar + name + code) / Nationality / Team / Pts; top-3 podium highlight | Community stats tables (waves, capacity, member counts) |
| **Round / race card** | "ROUND N" + date range `21 - 23 AUG` + country + official GP name + completed rounds show top-3 results | Event cards: watch parties, karting days, car displays; completed events show recap data (see content in §8) |
| **Countdown hero** | (F1 uses next-race ticks in live timing) | Big red digit countdown to next race in IST |
| **CTA buttons** | Solid red blocks, sharp corners, uppercase | "JOIN THE COMMUNITY", "LEARN MORE", "REGISTER FREE" |

---

## 7. Motion

- Fast & utilitarian: transitions `150–200ms ease-out`; hover states darken red / lift carbon panels with hard offset shadow.
- Marquee ticker: pure CSS `translateX` loop, pause on hover.
- Countdown: digits update with `tabular-nums`, optional 1s tick.
- No bouncy easing, no spring physics, no rounded card flips. Motion supports data, not decoration.
- `prefers-reduced-motion`: disable marquee + pulse.

---

## 8. Extracted Real Content (do NOT invent copy)

All copy below was scraped from f1odisha.com on this session date (2026-09-03) and is the canonical content source. Dates: today is **after** both recorded events; the UI must label them **"Completed ✓"** (Monaco) and keep the Red Bull event as a completed archive entry, per live-site copy.

### Hero
- Eyebrow: `ODISHA'S FIRST F1 COMMUNITY` · Headline: `BORN IN THE TEMPLE CITY`
- Sub: *"Odisha's fastest-growing Formula 1 fan community. Watch parties, sim racing, karting events — and a family that bleeds motorsport."*
- CTAs: `JOIN THE COMMUNITY` / `LEARN MORE`
- Stats band: `23 RACE WEEKENDS A YEAR` · `LIVE` · `— MEMBERS & COUNTING` · `1 STATE. ONE GRID.`

### Marquee
`Watch Parties · Sim Racing · Karting Events · Driver Debates · Race Predictions` (repeat). Secondary lockup: `F1 ODISHA — BHUBANESWAR — FROM THE TEMPLE CITY TO THE GRID`.

### Who We Are ("Odisha Meets The Grid")
- Crew from **Bhubaneswar, Cuttack, Puri and beyond**; fans "since Schumacher's era" to "Drive to Survive" newcomers; "debate tyre strategies at 3am".
- Pillars: `01 WATCH PARTIES` · `02 SIM & KARTING` · `03 ONLINE COMMUNITY` (WhatsApp, Discord, Instagram) · `04 ODISHA IDENTITY` ("Kalinga spirit on the global grid").

### Life on the Calendar (activity cards)
🏁 Race Watch Parties · 🎮 Sim Racing Nights (F1 2024, iRacing, Assetto Corsa) · 🏎️ Karting Sessions (quarterly) · 🏆 Fantasy F1 League (full-season, trophy at year end) · 🎙️ Fan Debates & Trivia · 📸 Content & Creator Nights.

### Event 1 — Monaco GP Watch Party (COMPLETED, archive)
- **Race**: Monaco Grand Prix 🇲🇨 · **Date**: Sunday 7 June 2026 · Completed ✓
- **Doors** 5:00 PM IST · Race 6:30 PM IST · **Venue**: Emirates Kitchen & Music, Bhubaneswar (note: one banner variant says Symphony Mall — resolve against final event page copy during Batch 3)
- **Entry**: F1 Odisha Members Only · Perks: live screening, food & drinks, race simulator, live debates, fan activities
- **Capacity**: 260+ members, 3 waves — Wave 1: 100 slots (1 June 10:00 AM IST) · Wave 2: 100 slots (2 June) · Wave 3: 50 slots — all **Sold Out**

### Membership ("Get on the Grid")
- Free. Benefits: WhatsApp community access, watch-party/karting invites, Fantasy League entry, exclusive content, member badge.
- **Member Registration — Season 2026 — Member Intake.** Output: **Member ID + QR badge** ("entry pass for all F1 Odisha events including the Red Bull F1 Car Display").
- **My Docs**: re-generate badge using Member ID + First Name + Last Name + Date of Birth + Favourite Team + Favourite Driver.

### Event 2 — Red Bull F1 Car Display (COMPLETED, archive)
- **Car**: Official Red Bull Racing F1 Car · **Date**: Wednesday 2 September 2026 · **Venue**: Symphony Mall, Bhubaneswar
- Open to all; **members get an exclusive display zone** via badge QR. Free. Activities: F1 car up close, photo opportunity, engagement activities, pit stop challenge.
- Attendance confirm flow: Member ID + Full Name → "YOU'RE CONFIRMED FOR 2ND SEPTEMBER".

### Footer / social
WhatsApp community, Discord, Instagram are referenced across the site. Exact handle/URLs must be captured during the Batch 2 asset pass (they were not exposed in text extraction) — **do not hardcode guessed URLs.**

---

## 9. Imagery

- Live site imagery is raster (event photos, badges). Reuse real community assets where available; **extract exact asset URLs from the live site HTML in Batch 2** (asset pass) rather than guessing paths.
- F1.com aesthetic for any generated graphics: dark carbon panels, red skew accents, checkered strips, high-contrast photos with hard-edged crops (`object-cover`, no rounded masks).
- Respect trademarks: we reference "Red Bull Racing F1 Car" as the community did on the live site; no fabricated F1 logos.

---

## 10. Accessibility
- Semantic landmarks (`header/nav/main/footer`), skip link, focus-visible rings (hard 2px red offset ring — no blur).
- Uppercase/label text must never rely on case alone for meaning.
- Marquee/ticker content duplicated in an accessible (non-animated) list.
- Tables get real `<table>` semantics + `caption`/`scope`.
