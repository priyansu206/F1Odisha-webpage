# F1 Odisha — Architecture

> Next.js App Router rebuild. **Phase A (current): static UI with typed local data.** **Phase B (future): database + auth**, designed for from day one via repository interfaces — no UI rewrites later.

---

## 1. Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Server Components by default; `use client` only for interactivity islands (countdown, marquee, forms) |
| Language | **TypeScript (strict)** | `strict: true`; no `any` at component boundaries |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) | Tokens centralized in `app/globals.css` via `@theme`; sharp-corner design means `rounded-*` never used |
| Fonts | `next/font/google` | **Titillium Web** (primary) + **Rajdhani** (display digits) — see `docs/design.md §3` |
| Icons | Inline SVG components | F1.com uses crisp line icons; emoji retained only where the scraped content uses them (activity cards 🏁 🎮 etc.) |
| Data (static phase) | Typed TS modules in `lib/data/` | Shape mirrors future DB tables (see §5) so swap is mechanical |
| Validation (future) | Zod | At every trust boundary (forms, API routes, server actions) |
| Lint/format | ESLint + Prettier | `create-next-app` defaults + prettier-plugin-tailwindcss |
| Testing (optional, later batch) | Vitest + Testing Library | Component tests for countdown & forms only where logic exists |

---

## 2. Directory Structure (target, generated in Batch 1)

```
f1odisha/
├── app/
│   ├── layout.tsx            # Root layout: fonts, ThemeNav, ticker, footer
│   ├── page.tsx              # Home (hero → modules per flow.md)
│   ├── globals.css           # @theme tokens, base reset, skew utilities
│   ├── not-found.tsx         # 404 styled in-system
│   ├── about/page.tsx        # Odisha Meets The Grid
│   ├── events/page.tsx       # Community calendar (F1-style round cards)
│   ├── events/[slug]/page.tsx# Event detail (Monaco archive, Red Bull archive)
│   ├── schedule/page.tsx     # 2026 race-weekend schedule w/ IST countdown strip
│   ├── membership/page.tsx   # "Get on the Grid" + registration form (static mock)
│   └── docs/page.tsx         # "My Docs" badge re-generation (static mock)
├── components/
│   ├── layout/               # UtilityBar, SiteNav, TickerMarquee, SiteFooter
│   ├── ui/                   # Button, ModuleHeader, Tag, DataTable, Countdown, ...
│   └── home/                 # Hero, StatsBand, WhoWeAre, ActivitiesGrid, ...
├── lib/
│   ├── data/                 # events.ts, members.ts, schedule.ts, site.ts (typed)
│   ├── types.ts              # Event, RaceWeekend, Member, SlotWave ...
│   └── utils.ts              # cn(), date/IST helpers, formatDuration
├── public/
│   ├── images/               # Community assets (asset pass in Batch 2)
│   └── icons/                # SVG mark "Konark Chakra grid" lockup
├── middleware.ts             # (Phase B) route protection
└── docs/                     # THIS documentation set
```

---

## 3. Tailwind Configuration

**Tailwind v4, CSS-first tokens** in `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-f1-red: #E10600;
  --color-f1-red-dark: #B00500;
  --color-carbon: #15151E;
  --color-carbon-2: #1E1E2A;
  --color-carbon-3: #26262F;
  --color-off-white: #F5F5F5;
  --color-grey-100: #E8E8E8;
  --color-grey-300: #A9A9A9;
  --color-grey-500: #767676;
  --color-grey-700: #4C4C52;
  --font-sans: var(--font-titillium), ui-sans-serif, system-ui, sans-serif;
  --font-display: var(--font-rajdhani), var(--font-sans);
}

/* Global guard: zero curves by default */
* { border-radius: 0; }
```

Utility classes to add (custom `@utility`): `.skew-accent` (container `-skew-x-12`, content re-skewed `skew-x-12`), `.cut-corner` (clip-path polygon cut), `.checker-strip` (repeating-linear-gradient 4px black/white band), `.tabular` (`font-variant-numeric: tabular-nums`).

**Hard rules**
- No `rounded-*` utility anywhere in the codebase (enforced in review + a lint disallow rule in Batch 1).
- All colors referenced via theme tokens, never raw hex in components.
- Responsive-first: build mobile → desktop; breakpoints `sm/md/lg/xl` default.

---

## 4. Data Layer — Static Phase

`lib/data/*.ts` exports typed, immutable arrays (real scraped content):

```ts
// lib/types.ts (excerpt)
export interface Event {
  slug: string;
  title: string;            // "Monaco GP Watch Party"
  kind: "watch-party" | "karting" | "car-display" | "community";
  status: "completed" | "upcoming" | "sold-out";
  dateLabel: string;        // "Sunday 7 June 2026"
  dateISO: string;          // "2026-06-07" (IST-aware)
  doorsIST: string;         // "5:00 PM IST"
  raceIST?: string;         // "6:30 PM IST"
  venue: string;
  capacity?: number;
  perks: string[];
  copy: string[];           // verbatim scraped paragraphs
}
```

Every array gets a matching `getEventBySlug()`, `getUpcoming()`, `getCompleted()` helper — these helpers are the seam where a database call will later replace the array read (same signatures, `Promise` return type). Components consume **only** these accessor functions, never the raw arrays.

---

## 5. Future Scope — Database & Auth (Phase B, not built now)

> Decisions deferred until Phase B kickoff, but contracts are designed today.

### 5.1 Repository seam
- `lib/data/` accessors become `async`; keep signatures identical so UI never changes.
- Suggested providers evaluated at Phase B: **Supabase** (Postgres + built-in auth + RLS) or **Neon/Postgres + Auth.js (NextAuth v5)**. Choice belongs to the user at that phase; nothing in the UI couples to a provider.

### 5.2 Env conventions (never committed)
```
# .env.local (server-only unless prefixed NEXT_PUBLIC_)
DATABASE_URL=
AUTH_SECRET=
AUTH_GITHUB_ID=          # or Google/WhatsApp OAuth as decided
NEXT_PUBLIC_SITE_URL=https://f1odisha.com
```
- Server-only secrets go in `env.local`, read via `process.env` server-side; never `NEXT_PUBLIC_` unless intentionally public.
- All env reads validated with Zod at startup (`lib/env.ts`).

### 5.3 Planned tables (sketch for Phase B)
`members (id, member_id, first_name, last_name, dob, fav_team, fav_driver, badge_token_hash, joined_at)` · `events` · `event_rsvps (member_id, event_id, confirmed_at, UNIQUE pair)` · `wave_slots (event_id, wave, capacity)`.

### 5.4 Auth shape
- Members authenticate to (a) register, (b) re-generate badge in **My Docs**, (c) RSVP/confirm attendance.
- Badge QR = signed token (HMAC over member_id + season), not raw DB id — see `docs/security.md`.

---

## 6. Scripts & Quality Gates

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (must pass before batch close) |
| `npm run lint` | ESLint |
| `npm run typecheck` (`tsc --noEmit`) | Type gate — run after every batch |
| `npm test` (Batch 5+) | Vitest when logic tests land |

**Definition of Done for any batch**: builds clean, typechecks, zero `rounded-*`, real scraped content only, mobile pass done, Chatmemory updated.

---

## 7. Performance & SEO Baseline

- All components Server Components unless interactive; static rendering everywhere in Phase A (`export const dynamic = "force-static"` where forms exist as mocks).
- `next/image` with explicit sizes; images served from `public/` in Phase A.
- Metadata API per route (`generateMetadata`): title pattern `PAGE | F1 Odisha — From the Temple City to the Grid`.
- Open Graph: site title + "F1 ODISHA" mark; canonical `https://f1odisha.com/...`.
