# F1 Odisha — Execution Batches

> Five sequential, reviewable batches. **Each batch ends with a typed summary + Chatmemory update + an explicit "proceed?" checkpoint** — never chain into the next batch without approval. This prevents context overload and keeps pixel-fidelity reviewable at each layer.

---

## Batch 1 — Foundation: Scaffold, Theme System & Global Shell

**Goal:** A compiling Next.js app wearing the full design system, with every page's chrome in place. Nothing content-heavy yet.

**Scope**
1. `create-next-app` scaffold (TS, Tailwind, ESLint, App Router, src-less per architecture.md), delete boilerplate.
2. `app/globals.css` — full `@theme` token set (design.md §2), zero-radius base guard, custom utilities: `skew-accent`, `cut-corner`, `checker-strip`, `tabular`.
3. Fonts via `next/font/google`: Titillium Web + Rajdhani wired into root layout; metadata + OG baseline.
4. Global shell components:
   - `UtilityBar` (scrolling community ticker)
   - `SiteNav` (desktop + mobile overlay; active states)
   - `SiteFooter` (carbon, columns, social row — placeholders marked `TBD-asset-pass`)
5. `lib/data/site.ts` + `lib/types.ts` skeleton; `lib/utils.ts` (`cn`, IST helpers).
6. Placeholder routes registered for every route in flow.md §2 (each: module-header + "Batch N" stub).
7. Stub `not-found` + `Button`/`ModuleHeader`/`Tag` primitives so later batches reuse them.

**Acceptance criteria**
- `npm run build` + `npm run typecheck` + `npm run lint` green.
- Visual: nav/ticker/footer pixel-consistent with f1.com chrome (carbon, red, uppercase, 0 radius, skew accents on hover).
- Zero `rounded-*` in the tree.

**Deliverable:** chrome + tokens review on `/` (stub hero behind it) and one sample inner page.

---

## Batch 2 — Homepage: Hero & Data Modules

**Goal:** The flagship page: poster hero → module stack with real scraped content.

**Scope**
1. **Asset pass** (first task): extract exact image URLs + social handles from live f1odisha.com HTML via browser/`curl` DevTools pass; download event/badge/hero assets into `public/images/`. Update social placeholders from Batch 1.
2. `Hero` (eyebrow, "Born in the Temple City", dual CTAs, cut-corner poster chips) + `StatsBand` (23 race weekends · LIVE · members counting · 1 State. One Grid).
3. `TickerMarquee` full implementation.
4. `NextRaceCountdown` — IST countdown to next 2026 race weekend (tabular digits, red), client island.
5. `WhoWeAre` (story + 01–04 pillars) and `ActivitiesGrid` (6 emoji activity cards).
6. Module teasers with `View All →` to `/events` and `/schedule`.
7. `lib/data/events.ts` + `schedule.ts` (real data from design.md §8).

**Acceptance criteria:** home matches content inventory 1:1; countdown accurate to IST; responsive down to 360px; image assets real, not lorem.

---

## Batch 3 — Events, Schedule & Data Pages

**Goal:** All data-heavy routing: calendar, two archive event pages, schedule table.

**Scope**
1. `/events` — `EventRoundCard` grid (status: completed/sold-out/upcoming).
2. `/events/monaco-gp-watch-party` — hero, copy, perks, **3-wave SlotTimeline** (Wave 1 · 100 · 1 June 10:00 AM IST … sold out), sold-out banner, "re-generate ticket via My Docs" cross-link.
3. `/events/red-bull-f1-car-display` — hero, car/date/venue/cost panel, member-zone QR explanation, activity list.
4. `/schedule` — 2026 race weekends in IST; completed rounds render result-style rows (f1.com pattern).
5. Status engine (`getEventBySlug` etc.) fully typed with IST date logic.

**Acceptance criteria:** every event data field from design.md §8 renders; past events show `COMPLETED ✓` CTAs; nav active states correct; typecheck/build green.

---

## Batch 4 — Membership & Tools (Static Mocks)

**Goal:** `/membership` and `/docs` with genuine UI + mock flows; interactive islands only where essential.

**Scope**
1. `/about` (Odisha Meets The Grid) if not folded into Batch 2 teasers — full pillars page.
2. `/membership` — benefits grid, `MemberForm` (client-side validation only; fields per scraped form: name/DOB/fav team/fav driver), success panel with generated-looking Member ID + badge preview (placeholder QR — **no real secrets**).
3. `/docs` — `BadgeRegenForm` mirroring the My Docs fields + mock badge re-generation.
4. Cross-links to event archive ("your QR = entry pass") completed.
5. Forms clearly mocked: `aria` + copy "static preview — live sync in Phase B".

**Acceptance criteria:** flows A & B in flow.md navigable end-to-end (mock); validation UX solid; no real data leaves the browser.

---

## Batch 5 — Polish, QA & Handoff

**Goal:** Pixel-perfect pass + production hardening; prepare Phase B seam.

**Scope**
1. F1-ism audit: skew accents, checker strips, hover motion, focus rings, `prefers-reduced-motion`.
2. Typography/rhythm pass on all routes; fix any rounded-edge leaks (`rg 'rounded'`).
3. A11y + Lighthouse pass; metadata/OG per page; `next/image` sizing audit.
4. Optional Vitest for countdown + status engine logic.
5. Final build/typecheck/lint; cross-device check (360px–1440px).
6. Write Phase B kickoff checklist (envs, provider decision, RLS plan hooks to security.md).

**Acceptance criteria:** Lighthouse ≥ 90 (perf/a11y/seo); zero `rounded-*`; design.md checklist fully ticked; Chatmemory clean.

---

## Rules of engagement
- Batches execute **strictly in order** and never in parallel.
- Each batch = one assistant working session sized to fit context; if a batch runs long, stop at a clean sub-checkpoint and update Chatmemory before continuing.
- Content changes (copy, dates) only from live-site research — flag discrepancies in Chatmemory.
- After each batch: update `docs/Chatmemory.md`, summarize what shipped + next batch preview, **await approval**.
