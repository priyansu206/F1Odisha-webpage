/**
 * Shared types. Chrome types first; community/event/race-weekend types power
 * the homepage modules (Batch 2) and data pages (Batch 3). Every shape here
 * mirrors a future DB table (docs/architecture.md §4–5).
 */

export interface NavItem {
  label: string;
  href: string;
  /** Slugs that count as "active" for this item (e.g. nested routes). */
  match?: string[];
}

export interface SocialLink {
  label: string;
  /** null until a real public URL exists; keep muted until then. */
  href: string | null;
  note?: string;
}

export interface SiteIdentity {
  name: string;
  shortName: string;
  tagline: string;
  city: string;
  region: string;
  foundedLabel: string;
}

/* --- Homepage content (verbatim scraped copy, docs/design.md §8) --- */

export interface Stat {
  /** Big display value, e.g. "23", "260+", "1". */
  value: string;
  label: string;
  /** Pulsing LIVE treatment instead of a numeric value. */
  live?: boolean;
}

export interface Pillar {
  number: string;
  title: string;
  blurb: string;
}

export interface Activity {
  emoji: string;
  title: string;
  blurb: string;
}

/* --- Community events --- */

export type EventStatus = "completed" | "upcoming" | "sold-out";
export type EventKind = "watch-party" | "karting" | "car-display" | "community";

export interface WaveSlot {
  name: string;
  slots: number;
  openedIST: string;
  status: "closed" | "sold-out" | "open";
}

export interface CommunityEvent {
  slug: string;
  title: string;
  kind: EventKind;
  status: EventStatus;
  emoji: string;
  headline: string;
  dateLabel: string; // "Sunday 7 June 2026"
  dateISO: string; // "2026-06-07"
  doorsIST?: string; // "5:00 PM IST"
  raceIST?: string; // "6:30 PM IST"
  venue: string;
  access: string; // e.g. "F1 Odisha Members Only"
  copy: string[];
  perks: string[];
  activities?: string[];
  capacity?: number;
  waves?: WaveSlot[];
}

/* --- 2026 race calendar --- */

export type RaceStatus = "completed" | "upcoming" | "live";

export interface PodiumResult {
  position: 1 | 2 | 3;
  /** Driver code, e.g. "RUS" (scraped from formula1.com results). */
  code: string;
  /** Full result time for P1, gap for P2/P3, e.g. "1:23:06.801" / "+2.974". */
  time: string;
}

export interface RaceWeekend {
  round: number;
  country: string;
  grandPrix: string; // "Italian Grand Prix"
  /** Weekend start (Friday), IST-aware ISO date. */
  startISO: string; // "2026-09-04"
  /** Race day (Sunday). */
  endISO: string; // "2026-09-06"
  /** Sunday race start, local India time as "HH:MM" (IST). The countdown
   *  and any race-start display target this instant. */
  raceStartIST?: string; // "18:30"
  /** Winner etc. present only for completed rounds (real scraped results). */
  podium?: PodiumResult[];
}
