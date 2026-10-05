import type { RaceWeekend } from "@/lib/types";
import { RACE_CALENDAR } from "@/lib/data/schedule";

/**
 * Live sync for f1.com calendar.
 * - Primary: scrape https://www.formula1.com/en/racing/2026
 * - Fallback: Jolpica Ergast API https://api.jolpi.ca/ergast/f1/2026.json
 * - Final fallback: static RACE_CALENDAR
 *
 * ISR: callers should use `fetch(..., { next: { revalidate: 3600 } })` so
 * Vercel/CDN revalidates every hour without a cron. On-demand revalidation
 * via /api/revalidate/schedule is also supported.
 */

const F1_URL = "https://www.formula1.com/en/racing/2026";
const JOLPICA_URL = "https://api.jolpi.ca/ergast/f1/2026.json";

const MONTH_MAP: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
};

// Preserve enriched static data (podium, sessions, circuit) keyed by country|grandPrix
function enrichedMap(): Map<string, RaceWeekend> {
  const m = new Map<string, RaceWeekend>();
  for (const w of RACE_CALENDAR) {
    m.set(keyOf(w.country, w.grandPrix), w);
    m.set(`round:${w.round}`, w);
    m.set(`iso:${w.startISO}`, w);
  }
  return m;
}
function podiumMap(): Map<string, RaceWeekend["podium"]> {
  const m = new Map<string, RaceWeekend["podium"]>();
  for (const w of RACE_CALENDAR) {
    if (w.podium) m.set(keyOf(w.country, w.grandPrix), w.podium);
    m.set(`round:${w.round}`, w.podium);
  }
  return m;
}
function keyOf(country: string, grandPrix: string) {
  return `${country}|${grandPrix}`.toLowerCase();
}

/** Convert "06 - 08 Mar" or "30 Oct - 01 Nov" to { startISO, endISO } for 2026 */
export function parseF1DateRange(raw: string, year = 2026): { startISO: string; endISO: string } | null {
  const s = raw.replace(/\u2013/g, "-").replace(/\s+/g, " ").trim();
  // Case 1: "06 - 08 Mar" (same month)
  let m = s.match(/^(\d{2})\s*-\s*(\d{2})\s*([A-Za-z]{3})$/i);
  if (m) {
    const [, d1, d2, mon] = m;
    const mm = MONTH_MAP[mon.toLowerCase()];
    if (!mm) return null;
    return { startISO: `${year}-${mm}-${d1}`, endISO: `${year}-${mm}-${d2}` };
  }
  // Case 2: "30 Oct - 01 Nov" (spans months, maybe year boundary)
  m = s.match(/^(\d{2})\s*([A-Za-z]{3})\s*-\s*(\d{2})\s*([A-Za-z]{3})$/i);
  if (m) {
    const [, d1, mon1, d2, mon2] = m;
    const mm1 = MONTH_MAP[mon1.toLowerCase()];
    const mm2 = MONTH_MAP[mon2.toLowerCase()];
    if (!mm1 || !mm2) return null;
    // Handle Dec -> Jan year roll (not needed for 2026 but safe)
    const y2 = mm2 === "01" && mm1 === "12" ? year + 1 : year;
    return { startISO: `${year}-${mm1}-${d1}`, endISO: `${y2}-${mm2}-${d2}` };
  }
  return null;
}

// Map trackCountry/path to normalized country/grandPrix used in our types
function normalizeRace(raceName: string, trackCountry: string, path: string): { country: string; grandPrix: string } {
  // raceName is like "FORMULA 1 QATAR AIRWAYS AUSTRALIAN GRAND PRIX 2026"
  // grandPrix should be "Australian Grand Prix", country from trackCountry but normalize
  // Use path slug as tie-breaker for Spain duplicates
  const lowerPath = path.toLowerCase();
  // Extract grand prix core: strip "FORMULA 1" prefix and "2026" suffix, keep "XX Grand Prix"
  let core = raceName.replace(/^FORMULA 1\s+/i, "").replace(/\s+2026\s*$/i, "").trim();
  // core still has sponsor prefix e.g. "QATAR AIRWAYS AUSTRALIAN GRAND PRIX"
  // We want "Australian Grand Prix" — find "GRAND PRIX" and take preceding word(s) + "Grand Prix"
  // Simpler: map known slugs to expected grandPrix/country
  const slugMap: Record<string, { country: string; grandPrix: string }> = {
    "/en/racing/2026/australia": { country: "Australia", grandPrix: "Australian Grand Prix" },
    "/en/racing/2026/china": { country: "China", grandPrix: "Chinese Grand Prix" },
    "/en/racing/2026/japan": { country: "Japan", grandPrix: "Japanese Grand Prix" },
    "/en/racing/2026/miami": { country: "Miami", grandPrix: "Miami Grand Prix" },
    "/en/racing/2026/canada": { country: "Canada", grandPrix: "Canadian Grand Prix" },
    "/en/racing/2026/monaco": { country: "Monaco", grandPrix: "Monaco Grand Prix" },
    "/en/racing/2026/barcelona-catalunya": { country: "Spain", grandPrix: "Spanish Grand Prix" },
    "/en/racing/2026/austria": { country: "Austria", grandPrix: "Austrian Grand Prix" },
    "/en/racing/2026/great-britain": { country: "Great Britain", grandPrix: "British Grand Prix" },
    "/en/racing/2026/belgium": { country: "Belgium", grandPrix: "Belgian Grand Prix" },
    "/en/racing/2026/hungary": { country: "Hungary", grandPrix: "Hungarian Grand Prix" },
    "/en/racing/2026/netherlands": { country: "Netherlands", grandPrix: "Dutch Grand Prix" },
    "/en/racing/2026/italy": { country: "Italy", grandPrix: "Italian Grand Prix" },
    "/en/racing/2026/spain": { country: "Spain", grandPrix: "Spanish Grand Prix" }, // Madrid
    "/en/racing/2026/azerbaijan": { country: "Azerbaijan", grandPrix: "Azerbaijan Grand Prix" },
    "/en/racing/2026/bahrain": { country: "Bahrain", grandPrix: "Bahrain Grand Prix" },
    "/en/racing/2026/singapore": { country: "Singapore", grandPrix: "Singapore Grand Prix" },
    "/en/racing/2026/united-states": { country: "United States", grandPrix: "United States Grand Prix" },
    "/en/racing/2026/mexico": { country: "Mexico", grandPrix: "Mexico City Grand Prix" },
    "/en/racing/2026/brazil": { country: "Brazil", grandPrix: "Sao Paulo Grand Prix" },
    "/en/racing/2026/las-vegas": { country: "Las Vegas", grandPrix: "Las Vegas Grand Prix" },
    "/en/racing/2026/qatar": { country: "Qatar", grandPrix: "Qatar Grand Prix" },
    "/en/racing/2026/united-arab-emirates": { country: "Abu Dhabi", grandPrix: "Abu Dhabi Grand Prix" },
  };
  if (slugMap[lowerPath]) return slugMap[lowerPath];
  // Fallback: derive from raceName
  const gpMatch = core.match(/([A-Za-z\-]+(?:\s+[A-Za-z\-]+)*)\s+GRAND PRIX/i);
  let gp = gpMatch ? `${gpMatch[1]} Grand Prix` : core;
  // Title-case
  gp = gp
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .replace("Grand Prix", "Grand Prix");
  // Country fallback is trackCountry (already proper like "Australia", "Bahrain")
  // Normalize trackCountry for known differences
  if (trackCountry === "Great Britain") trackCountry = "Great Britain";
  if (trackCountry === "United States" && lowerPath.includes("united-states")) trackCountry = "United States";
  if (trackCountry === "Abu Dhabi") trackCountry = "Abu Dhabi";
  return { country: trackCountry, grandPrix: gp };
}

/** Parse f1.com HTML -> RaceWeekend[] or null on failure */
export function parseF1ComCalendar(html: string): RaceWeekend[] | null {
  try {
    // Extract base64 contexts (race tiles)
    const ctxRe = /data-f1rd-a7s-context="([^"]+)"/g;
    const contexts: { raceName: string; trackCountry: string; path: string }[] = [];
    let m: RegExpExecArray | null;
    while ((m = ctxRe.exec(html)) !== null) {
      try {
        const json = Buffer.from(m[1], "base64").toString("utf-8");
        const obj = JSON.parse(json);
        if (obj.raceName && obj.trackCountry && obj.path) {
          contexts.push(obj);
        }
      } catch {}
    }
    // De-duplicate by path, keep first occurrence order (main calendar is later in HTML, so we need last occurrence?)
    // The page has a duplicated teaser strip (Spain/Azerbaijan/Bahrain/Singapore) at top, then full calendar below.
    // To get chronological order, take the segment from the full calendar onward.
    // Heuristic: find index of Australia path, slice from there.
    const ausIdx = contexts.findIndex((c) => c.path.toLowerCase() === "/en/racing/2026/australia");
    const sliced = ausIdx >= 0 ? contexts.slice(ausIdx) : contexts;
    // De-duplicate within sliced, preserving order
    const seen = new Set<string>();
    const races: typeof contexts = [];
    for (const c of sliced) {
      const k = c.path.toLowerCase();
      if (k.includes("pre-season-testing")) continue;
      if (!seen.has(k)) {
        seen.add(k);
        races.push(c);
      }
      if (races.length >= 24) break;
    }
    if (races.length < 15) return null;

    // Extract dates in order as they appear in the same sliced segment
    // Find the HTML segment from Australia tile onward to avoid teaser dates
    const ausHtmlIdx = html.indexOf("/en/racing/2026/australia");
    const relevantHtml = ausHtmlIdx >= 0 ? html.slice(ausHtmlIdx) : html;
    // Dates appear as <span ...>06 - 08 Mar</span> or <span ...>30 Oct - 01 Nov</span>
    const dateRe = />(\d{2}\s*-\s*\d{2}\s*[A-Za-z]{3}|\d{2}\s+[A-Za-z]{3}\s*-\s*\d{2}\s+[A-Za-z]{3})</g;
    const rawDates: string[] = [];
    let dm: RegExpExecArray | null;
    while ((dm = dateRe.exec(relevantHtml)) !== null) {
      rawDates.push(dm[1].trim());
      if (rawDates.length >= races.length) break;
    }
    if (rawDates.length < races.length) return null;

    const enriched = enrichedMap();
    const out: RaceWeekend[] = [];
    for (let i = 0; i < races.length; i++) {
      const r = races[i];
      const rawDate = rawDates[i];
      const parsed = parseF1DateRange(rawDate);
      if (!parsed) continue;
      const { country, grandPrix } = normalizeRace(r.raceName, r.trackCountry, r.path);
      const round = i + 1; // chronological order defines round
      const key = keyOf(country, grandPrix);
      // Resolve enriched static entry (handle Spain duplicate by round order)
      let staticMatch: RaceWeekend | undefined = enriched.get(key);
      if (country === "Spain" && grandPrix === "Spanish Grand Prix") {
        const spainCount = out.filter((x) => x.country === "Spain" && x.grandPrix === "Spanish Grand Prix").length;
        if (spainCount === 1) {
          // Madrid — use round-based or iso-based lookup instead of Barcelona
          staticMatch = RACE_CALENDAR.find((w) => w.startISO === parsed.startISO) ?? RACE_CALENDAR.find((w) => w.round === round);
        } else {
          staticMatch = RACE_CALENDAR.find((w) => w.circuit?.includes("Barcelona") || w.round === 7);
        }
      }
      if (!staticMatch) {
        staticMatch = RACE_CALENDAR.find((w) => w.startISO === parsed.startISO) ?? RACE_CALENDAR.find((w) => w.round === round);
      }
      // If still Barcelona vs Madrid collision, prefer iso match
      if (staticMatch && staticMatch.startISO !== parsed.startISO && RACE_CALENDAR.some((w) => w.startISO === parsed.startISO)) {
        staticMatch = RACE_CALENDAR.find((w) => w.startISO === parsed.startISO);
      }
      const podium = staticMatch?.podium;
      out.push({
        round,
        country,
        grandPrix,
        startISO: parsed.startISO,
        endISO: parsed.endISO,
        raceStartIST: staticMatch?.raceStartIST ?? "18:00",
        circuit: staticMatch?.circuit,
        circuitLength: staticMatch?.circuitLength,
        sessionTimesIST: staticMatch?.sessionTimesIST,
        sessions: staticMatch?.sessions,
        ...(podium ? { podium } : {}),
      });
    }
    return out.length >= 15 ? out : null;
  } catch {
    return null;
  }
}

async function fetchF1Com(): Promise<RaceWeekend[] | null> {
  try {
    const res = await fetch(F1_URL, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: { revalidate: 3600 } as any,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; F1Odisha/1.0; +https://f1odisha.com)",
        Accept: "text/html",
      },
    });
    if (!res.ok) return null;
    const html = await res.text();
    return parseF1ComCalendar(html);
  } catch {
    return null;
  }
}

async function fetchJolpica(): Promise<RaceWeekend[] | null> {
  try {
    const res = await fetch(JOLPICA_URL, {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: { revalidate: 3600 } as any,
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const races: unknown[] = json?.MRData?.RaceTable?.Races ?? [];
    if (!Array.isArray(races) || races.length < 15) return null;
    const enriched = enrichedMap();
    const out: RaceWeekend[] = [];
    for (const r of races as Array<{
      round: string;
      raceName: string;
      date: string;
      Circuit: { Location: { country: string } };
    }>) {
      const round = parseInt(r.round, 10);
      const country = r.Circuit.Location.country;
      const grandPrix = r.raceName;
      const endISO = r.date;
      const start = new Date(`${endISO}T00:00:00Z`);
      start.setUTCDate(start.getUTCDate() - 2);
      const startISO = start.toISOString().slice(0, 10);
      const key = keyOf(country, grandPrix);
      const staticMatch = enriched.get(key) ?? enriched.get(`round:${round}`) ?? RACE_CALENDAR.find((w) => w.startISO === startISO);
      out.push({
        round,
        country: staticMatch?.country ?? country,
        grandPrix: staticMatch?.grandPrix ?? grandPrix,
        startISO: staticMatch?.startISO ?? startISO,
        endISO: staticMatch?.endISO ?? endISO,
        raceStartIST: staticMatch?.raceStartIST ?? "18:00",
        circuit: staticMatch?.circuit,
        circuitLength: staticMatch?.circuitLength,
        sessionTimesIST: staticMatch?.sessionTimesIST,
        sessions: staticMatch?.sessions,
        ...(staticMatch?.podium ? { podium: staticMatch.podium } : {}),
      });
    }
    return out;
  } catch {
    return null;
  }
}

/** Public: get calendar, live-synced with fallback chain. Always returns at least static. */
export async function getLiveRaceCalendar(): Promise<RaceWeekend[]> {
  const live = await fetchF1Com();
  if (live && live.length >= 15) return live;
  const jolpica = await fetchJolpica();
  if (jolpica && jolpica.length >= 15) return jolpica;
  return RACE_CALENDAR;
}

/** Sync helpers that use live calendar for status/next calculations */
export async function getLiveNextRaceWeekend(now = new Date()): Promise<RaceWeekend | null> {
  const cal = await getLiveRaceCalendar();
  const t = now.getTime();
  for (const w of cal) {
    const raceStart = w.raceStartIST
      ? new Date(`${w.endISO}T${w.raceStartIST}:00+05:30`).getTime()
      : new Date(`${w.startISO}T00:00:00+05:30`).getTime();
    if (t < raceStart) return w;
  }
  return null;
}
