# F1 Odisha — Flow: Routing & Page Map

> Derived from the **live scraped f1odisha.com** (single-page community site) re-expressed through the **f1.com multi-section model**.

---

## 1. Current Site Anatomy (as scraped 2026-09-03)

The live site is effectively a **one-page scroll** with four interactive tools opened in-page:

1. Hero + stats band
2. Ticker/marquee (Watch Parties • Sim Racing • …)
3. Next-race countdown ("Race Weekend Schedule (IST)")
4. Who We Are ("Odisha Meets The Grid") — 4 pillars
5. What We Do — 6 activity cards
6. Monaco GP Watch Party event block (sold out, completed 7 June 2026) + 3-wave slot timeline
7. Membership registration ("Get on the Grid" → Member ID + badge)
8. My Docs (badge re-generation via Member ID + DOB + favourites)
9. Red Bull F1 Car Display event block (2 September 2026, completed) + attendance confirmation
10. Footer (WhatsApp / Discord / Instagram socials)

---

## 2. Target Route Map (App Router)

| Route | Page | Source section(s) | Key components | Batch |
|---|---|---|---|---|
| `/` | **Home** — hero poster, ticker, countdown, module stack | 1,2,3,4,5 + teasers | `Hero`, `StatsBand`, `TickerMarquee`, `NextRaceCountdown`, `WhoWeAre`, `ActivitiesGrid`, module teasers → events | 2 |
| `/about` | **Odisha Meets The Grid** — full story + 4 pillars + socials | 4,5 (context) | `Pillars`, social card grid | 4 |
| `/events` | **Community calendar** — F1-style round cards for every event (past + upcoming) | 6,9 | `EventRoundCard` (ROUND n / date range / status / result recap) | 3 |
| `/events/monaco-gp-watch-party` | **Monaco GP Watch Party** (completed ✓ archive): copy, perks, 3-wave slot timeline, sold-out states | 6 | `EventHero`, `SlotTimeline`, `PerksList`, sold-out banner | 3 |
| `/events/red-bull-f1-car-display` | **Red Bull F1 Car Display** (completed archive): car/venue/date, exclusive member zone + QR note | 9 | `EventHero`, `AccessPanel`, activity list | 3 |
| `/schedule` | **2026 race-weekend schedule** in IST with countdown + completed race list (data page) | 3 | `Countdown`, `RaceWeekendTable`/cards | 3 |
| `/membership` | **Get on the Grid** — benefits + static registration form mock | 7 | `BenefitsList`, `MemberForm` (mock) | 4 |
| `/docs` | **My Docs** — re-generate badge tool (static mock w/ validation) | 8 | `BadgeRegenForm`, `BadgePreview` (mock QR) | 4 |
| `/news` | (future, optional) community news & content cards | — | `NewsCard` (mm:ss durations) | post-MVP |
| `/not-found` | 404 in-system | — | carbon panel, red 404 | 1 |

**Anchor shortcuts on Home** (kept from current one-page behavior): `#who-we-are`, `#activities`, `#events`, `#join`, `#my-docs`.

---

## 3. User Flows

### Flow A — Join the community (top conversion)
```
/ → hero CTA "JOIN THE COMMUNITY" → /membership
→ fill registration (mock) → success panel
→ "Your badge is ready" → Member ID + downloadable badge (static mock)
→ CTA cross-link: "Red Bull members' zone needs your QR" → /events/red-bull-f1-car-display
```

### Flow B — My Docs badge re-generation (existing members)
```
Nav "MY DOCS" or footer link → /docs
→ Member ID + First/Last name + DOB + Fav team + Fav driver
→ (mock validation; Phase B: server lookup) → badge + QR re-issued
```

### Flow C — Event discovery & RSVP
```
/events → calendar (round cards) → pick event card
→ event detail: dates in IST, venue, capacity bars, status (COMPLETED/SOLD OUT/UPCOMING)
→ RSVP/confirm (mock; Phase B: guarded by auth + membership check)
```

### Flow D — Race-weekend habit (data page)
```
Home countdown "NEXT RACE" (IST) → "FULL SCHEDULE" → /schedule
→ list of 2026 rounds w/ dates; completed rounds collapse to result-style rows
```

---

## 4. Navigation Model (f1.com-style)

- **Utility/ticker bar (top, carbon):** scrolling community ticker — low priority content, high aggression.
- **Primary nav (sticky):** `HOME · ABOUT · EVENTS · SCHEDULE · MEMBERSHIP` + right-aligned red CTA `JOIN THE GRID` (→ /membership) and ghost link `MY DOCS`. Mobile: full-screen overlay menu (carbon, no curves, red active underline).
- **Active state:** red underline offset below the uppercase item; hover = red text on white→ carbon flip on dark.
- **Footer (carbon):** logo lockup "F1 ODISHA — From the Temple City to the Grid", column links, social row (WhatsApp · Discord · Instagram), tiny legal line. This is the only nav location for external social links (guessed URLs forbidden — asset pass in Batch 2).

---

## 5. Data/Time Rules
- **Timezone: IST everywhere.** Countdown, door times, wave open times ("1st June 10:00 AM IST"), event dates. One helper owns the conversion (`lib/utils.ts: ist()`).
- **Status engine** derives `upcoming / sold-out / completed` from date + capacity — drives labels, banners, and CTA visibility so archive pages (both current events are completed as of today) render correctly with zero copy drift.
- Completed events keep full content but swap CTAs for `COMPLETED ✓` and recap panels (mirrors f1.com past-round result blocks).
