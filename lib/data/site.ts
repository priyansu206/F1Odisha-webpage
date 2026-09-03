import type { NavItem, SiteIdentity, SocialLink } from "@/lib/types";

/**
 * Site-wide chrome content — verbatim from live f1odisha.com (scraped 2026-09-03).
 * Social hrefs are null until the Batch 2 asset pass extracts the real URLs.
 */

export const SITE: SiteIdentity = {
  name: "F1 Odisha",
  shortName: "F1 ODISHA",
  tagline: "From the Temple City to the Grid",
  city: "Bhubaneswar",
  region: "Odisha",
  foundedLabel: "ODISHA'S FIRST F1 COMMUNITY",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", match: ["/"] },
  { label: "About", href: "/about" },
  { label: "Events", href: "/events", match: ["/events"] },
  { label: "Schedule", href: "/schedule" },
  { label: "Membership", href: "/membership" },
];

export const UTILITY_CTA: NavItem = { label: "My Docs", href: "/docs" };

/** Scrolling community ticker content (live-site marquee items). */
export const TICKER_ITEMS: string[] = [
  "Watch Parties",
  "Sim Racing",
  "Karting Events",
  "Driver Debates",
  "Race Predictions",
  "One State. One Grid.",
];

/** Footer social row — real URLs extracted from the live site's HTML
 *  (asset pass, Batch 2). WhatsApp/Discord links are not public on the live
 *  site (members-only perks), so they render muted until Phase B. */
export const SOCIALS: SocialLink[] = [
  {
    label: "WhatsApp",
    href: null,
    note: "Members only — join to get access",
  },
  {
    label: "Discord",
    href: null,
    note: "Members only — join to get access",
  },
  { label: "Instagram", href: "https://instagram.com/f1odisha" },
  { label: "X (Twitter)", href: "https://twitter.com/f1odisha" },
];
