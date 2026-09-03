# F1 Odisha — Security: Auth & Data Protection (Phase B rules)

> Phase A is a **static UI**: no secrets exist yet, nothing to protect except the public content itself. This document is the binding contract for the moment database + auth land. Treat these as pre-committed rules, not suggestions.

---

## 1. Threat model (who/what we defend against)

| Asset | Threat | Blast radius if leaked |
|---|---|---|
| Member PII (name, DOB, favourites) | DB dump, scraping, exposed API | Privacy breach — DOB is sensitive under Indian law (DPDP Act 2023) |
| Badge QR / Member ID | Forgery → event-entry fraud | Physical events oversubscribed by fakes |
| Admin/DB credentials | Credential theft | Total compromise |
| Community forms | Spam, mass RSVP | Venue chaos, degraded trust |

---

## 2. Static-phase rules (Phase A — binding today)

1. **No secrets in client code.** No API keys, tokens, or DB strings in components, `public/`, or any `NEXT_PUBLIC_` var. `.env.local` is git-ignored; `.env.example` holds key names only.
2. **Forms are mocks with zero network writes.** MemberForm/BadgeRegenForm validate locally (Zod schema defined in `lib/validation.ts` ready for Phase B) and render a fake success panel. No member data leaves the browser.
3. **Placeholder QR/badge art is clearly fake** ("PREVIEW" watermark) so nobody mistakes a mock for a real pass.
4. No tracking pixels/analytics that fingerprint members without a stated privacy note.

---

## 3. Authentication rules (Phase B)

1. **Provider decision is deferred & user-owned** (Supabase Auth, Auth.js v5, or OAuth — see architecture.md §5). Whatever the choice: **never roll custom password auth**, never store plaintext secrets.
2. **Sessions**: httpOnly, Secure, SameSite=Lax cookies; short-lived access + rotating refresh where provider supports; CSRF protection enabled (Auth.js/Supabase handle by default — keep it on).
3. **Route protection server-side only.** `middleware.ts` + server components check session; client redirects are UX sugar, never the security boundary.
4. **Minimum scopes**: member role can read own profile, write own RSVP; admin role additionally manages events/RSVP lists. Enforce in RLS/DB, not only in UI.
5. MFA + email verification offered for admin accounts.

---

## 4. Database protection rules (Phase B)

1. **Row Level Security (RLS) is mandatory** if Postgres (Supabase/Neon). Default-deny; explicit policies only:
   - `members`: `select` own row (`auth.uid() = id`); `update` own row; **admin** reads all (masked).
   - `event_rsvps`: insert own; select own + event organizers; unique(member_id, event_id) constraint.
   - `events`: public read (it's a community site), admin write.
2. **Never trust client input**: every API route / server action validates with the shared Zod schemas; cap payload sizes; reject unknown fields.
3. **Rate limiting** on auth attempts, registration, badge regeneration, and RSVP endpoints (in-memory for dev; Redis/Upstash-style for prod). Lockout after N failures.
4. **Prepared statements / ORM parameterization only** — no string interpolation into SQL, ever.
5. **Backups**: automated daily snapshots; test restore at least quarterly (prod changes require user sign-off).

---

## 5. Badge / QR integrity (Phase B)

1. Member ID is a **public handle** — fine to show. The badge QR carries a **signed token**, not the raw DB row id:
   - `HMAC-SHA256(secret, member_id | season | issued_at)` with 24h–season validity window and server-side replay check at venue entry.
2. Secrets for signing live **only** on the server (env var, rotated on rotation schedule); never embedded in the QR payload itself.
3. DOB is collected for badge identity but **never displayed** in the UI or logged; it exists to look up/re-issue badges. Mask in admin views (`YYYY` only unless verified need).

---

## 6. Ops & hygiene

1. **Environment**: production credentials only in prod env (never in code or CI logs); `.env.local` git-ignored; `git log -p` audit before push.
2. **Dependencies**: `npm audit` in CI; pin lockfile; Dependabot/renovate on.
3. **Headers** via `next.config`: `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, strict CSP reviewed at Phase B (inline styles from Tailwind need care).
4. **Logging**: structured logs; no PII in log lines (member IDs may be pseudonymous; never DOB/name pairs).
5. **Incident path**: Chatmemory blocker entry → user notified; revoke leaked secret immediately; restore from backup if needed.

---

## 7. Phase B checklist (unlocked when DB/auth approved)

- [ ] Provider chosen + envs validated by Zod at boot
- [ ] Migrations with RLS policies written and reviewed
- [ ] Shared Zod schemas replacing mock validators
- [ ] HMAC badge signing service + venue-verification endpoint
- [ ] Rate limiting live; headers + CSP applied
- [ ] Security.md rules copied into repo `SECURITY.md`
