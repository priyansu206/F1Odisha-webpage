-- F1 Odisha — Phase B initial schema (docs/security.md §4, phase-b-kickoff.md §2)
-- Apply in the Supabase SQL editor. Members are stored with a Supabase auth
-- user id (auth.uid()) so RLS can scope every row to its owner.

create extension if not exists pgcrypto;

-- ── members ────────────────────────────────────────────────────────────────
create table if not exists public.members (
  id uuid primary key references auth.users (id) on delete cascade,
  member_id text not null unique,            -- public handle, e.g. F1O-XXXXXX
  first_name text not null,
  last_name text not null,
  dob date not null,                          -- never displayed; used for lookup
  fav_team text not null,
  fav_driver text not null,
  badge_token_hash text not null,             -- HMAC signature of the current badge
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;

create policy "members read own row"
  on public.members for select
  using (auth.uid() = id);

create policy "members update own row"
  on public.members for update
  using (auth.uid() = id);

-- ── events ─────────────────────────────────────────────────────────────────
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  kind text not null check (kind in ('watch-party', 'karting', 'car-display', 'community')),
  status text not null default 'upcoming'
    check (status in ('upcoming', 'sold-out', 'completed')),
  date_iso date not null,
  doors_ist text,
  race_ist text,
  venue text not null,
  access text not null,
  capacity int
);

alter table public.events enable row level security;

-- Anyone (even anonymous) can read the public calendar.
create policy "events readable by all"
  on public.events for select
  using (true);

-- ── event_rsvps ────────────────────────────────────────────────────────────
create table if not exists public.event_rsvps (
  member_id uuid not null references public.members (id) on delete cascade,
  event_id uuid not null references public.events (id) on delete cascade,
  confirmed_at timestamptz not null default now(),
  primary key (member_id, event_id)
);

alter table public.event_rsvps enable row level security;

create policy "rsvp read own"
  on public.event_rsvps for select
  using (auth.uid() = member_id);

create policy "rsvp insert own"
  on public.event_rsvps for insert
  with check (auth.uid() = member_id);

create policy "rsvp delete own"
  on public.event_rsvps for delete
  using (auth.uid() = member_id);

-- ── wave_slots ─────────────────────────────────────────────────────────────
create table if not exists public.wave_slots (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events (id) on delete cascade,
  wave text not null,
  slots int not null,
  opened_ist text not null,
  status text not null default 'open'
    check (status in ('open', 'closed', 'sold-out'))
);

alter table public.wave_slots enable row level security;

create policy "wave slots readable by all"
  on public.wave_slots for select
  using (true);

-- Seed the three archive events (idempotent) — content mirrors lib/data/events.ts.
insert into public.events (slug, title, kind, status, date_iso, doors_ist, race_ist, venue, access, capacity)
values
  ('monaco-gp-watch-party', 'Monaco GP Watch Party', 'watch-party', 'completed', '2026-06-07', '5:00 PM IST', '6:30 PM IST', 'Symphony Mall, Bhubaneswar', 'F1 Odisha Members Only', 260),
  ('red-bull-f1-car-display', 'Red Bull F1 Car Display', 'car-display', 'completed', '2026-09-02', null, null, 'Symphony Mall, Bhubaneswar', 'Open to All · Members Get Exclusive Access', null),
  ('emirates-after-party', 'F1 After Party', 'community', 'completed', '2026-09-02', null, null, 'Emirates Kitchen & Music, Bhubaneswar', 'F1 Odisha Community', null)
on conflict (slug) do nothing;
