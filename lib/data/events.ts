import type { CommunityEvent } from "@/lib/types";

/**
 * Community events — real content scraped from f1odisha.com (2026-09-03),
 * corrected by the site owner:
 *  - Monaco GP Watch Party was at SYMPHONY MALL (owner-confirmed).
 *  - Emirates Kitchen & Music hosted the official after-party (2 Sep 2026),
 *    added as a completed event per owner ("today's program").
 * All three are complete as of the session date; UI renders COMPLETED states.
 */
export const COMMUNITY_EVENTS: CommunityEvent[] = [
  {
    slug: "monaco-gp-watch-party",
    title: "Monaco GP Watch Party",
    kind: "watch-party",
    status: "completed",
    emoji: "🇲🇨",
    headline: "Our First Watch Party — 7th June 2026",
    dateLabel: "Sunday 7 June 2026 · Completed ✓",
    dateISO: "2026-06-07",
    doorsIST: "5:00 PM IST",
    raceIST: "6:30 PM IST",
    venue: "Symphony Mall, Bhubaneswar",
    access: "F1 Odisha Members Only",
    capacity: 260,
    copy: [
      "F1 Odisha's first ever watch party. Monaco Grand Prix — the most iconic race on the calendar. 260 members. Sold out in hours. Symphony Mall, Bhubaneswar.",
      "This was the one. And you were there.",
    ],
    perks: [
      "Live Screening",
      "Food & Drinks",
      "Race Simulator",
      "Live Debates",
      "Fan Activities",
    ],
    waves: [
      { name: "Wave 1", slots: 100, openedIST: "1st June 10:00 AM IST", status: "sold-out" },
      { name: "Wave 2", slots: 100, openedIST: "2nd June", status: "sold-out" },
      { name: "Wave 3", slots: 50, openedIST: "same day — gone instantly", status: "sold-out" },
    ],
  },
  {
    slug: "red-bull-f1-car-display",
    title: "Red Bull F1 Car Display",
    kind: "car-display",
    status: "completed",
    emoji: "🏎️",
    headline: "A real Formula 1 car came to Bhubaneswar",
    dateLabel: "Wednesday 2 September 2026 · Completed ✓",
    dateISO: "2026-09-02",
    venue: "Symphony Mall, Bhubaneswar",
    access: "Open to All · Members Get Exclusive Access",
    copy: [
      "A real Formula 1 car is coming to Bhubaneswar. The F1 Odisha community gets exclusive access to the dedicated display zone — all you need is your member badge QR.",
      "Your F1 Odisha membership badge QR was your entry pass — members accessed the dedicated display zone up close.",
    ],
    perks: ["F1 Car Up Close", "Photo Opportunity", "Engagement Activities", "Pit Stop Challenge"],
    activities: ["🌍 Open entry event", "💰 Completely Free", "🎟️ Members — Badge QR Required"],
  },
  {
    slug: "emirates-after-party",
    title: "F1 After Party",
    kind: "community",
    status: "completed",
    emoji: "🎉",
    headline: "The official after party at Emirates Kitchen & Music",
    dateLabel: "Wednesday 2 September 2026 · Completed ✓",
    dateISO: "2026-09-02",
    venue: "Emirates Kitchen & Music, Bhubaneswar",
    access: "F1 Odisha Community",
    copy: [
      "After the Symphony Mall program, the party moved to Emirates Kitchen & Music — the official F1 after party with the whole community.",
      "Food, music and motorsport talk carried the night. If you were at the Red Bull F1 car display, you know exactly how it ended.",
    ],
    perks: ["Food & Music", "Community Hangout", "After-Party Vibes"],
  },
];

export function getEventBySlug(slug: string): CommunityEvent | undefined {
  return COMMUNITY_EVENTS.find((e) => e.slug === slug);
}

export function getCommunityEvents(): CommunityEvent[] {
  return COMMUNITY_EVENTS;
}

export function getEventSlugs(): string[] {
  return COMMUNITY_EVENTS.map((e) => e.slug);
}
