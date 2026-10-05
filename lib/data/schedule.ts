import type { RaceStatus, RaceWeekend } from "@/lib/types";

/**
 * 2026 FIA Formula One World Championship — official calendar
 * (synced from formula1.com/en/racing/2026, last verified 2026-09-25).
 * R1–R12: verified podiums from official timing. R13 Italy & R14 Spain Madrid
 * verified 2026-09-25 per user: Italy LEC/VER/ANT, Spain Madrid ANT/VER/NOR.
 * R15 Azerbaijan (24-26 Sep): live weekend — session times IST only; tops appear only when verified.
 * Auto-sync: lib/data/schedule-sync.ts fetches live calendar with 1h ISR;
 * this static array is the fallback when the live fetch fails.
 */
export const RACE_CALENDAR: RaceWeekend[] = [
  {
    round: 1, country: "Australia", grandPrix: "Australian Grand Prix",
    startISO: "2026-03-06", endISO: "2026-03-08", raceStartIST: "09:30",
    circuit: "Albert Park Circuit", circuitLength: "5.278 km",
    sessionTimesIST: { practice1: "07:00", practice2: "10:30", practice3: "07:00", qualifying: "10:30", race: "09:30" },
    podium: [
      { position: 1, code: "RUS", time: "1:23:06.801" },
      { position: 2, code: "ANT", time: "+2.974" },
      { position: 3, code: "LEC", time: "+15.519" },
    ],
  },
  {
    round: 2, country: "China", grandPrix: "Chinese Grand Prix",
    startISO: "2026-03-13", endISO: "2026-03-15", raceStartIST: "13:00",
    circuit: "Shanghai International Circuit", circuitLength: "5.451 km",
    sessionTimesIST: { practice1: "09:00", qualifying: "13:00", sprintQualifying: "09:30", sprint: "13:00", race: "13:00" },
    podium: [
      { position: 1, code: "ANT", time: "1:33:15.607" },
      { position: 2, code: "RUS", time: "+5.515" },
      { position: 3, code: "HAM", time: "+25.267" },
    ],
  },
  {
    round: 3, country: "Japan", grandPrix: "Japanese Grand Prix",
    startISO: "2026-03-27", endISO: "2026-03-29", raceStartIST: "12:00",
    circuit: "Suzuka Circuit", circuitLength: "5.807 km",
    sessionTimesIST: { practice1: "08:00", practice2: "11:30", practice3: "08:00", qualifying: "11:30", race: "12:00" },
    podium: [
      { position: 1, code: "ANT", time: "1:28:03.403" },
      { position: 2, code: "PIA", time: "+13.722" },
      { position: 3, code: "LEC", time: "+15.27" },
    ],
  },
  {
    round: 4, country: "Miami", grandPrix: "Miami Grand Prix",
    startISO: "2026-05-01", endISO: "2026-05-03", raceStartIST: "22:30",
    circuit: "Miami International Autodrome", circuitLength: "5.412 km",
    sessionTimesIST: { practice1: "21:30", sprintQualifying: "01:30", sprint: "21:30", qualifying: "01:30", race: "22:30" },
    podium: [
      { position: 1, code: "ANT", time: "1:33:19.273" },
      { position: 2, code: "NOR", time: "+3.264" },
      { position: 3, code: "PIA", time: "+27.092" },
    ],
  },
  {
    round: 5, country: "Canada", grandPrix: "Canadian Grand Prix",
    startISO: "2026-05-22", endISO: "2026-05-24", raceStartIST: "23:00",
    circuit: "Circuit Gilles Villeneuve", circuitLength: "4.361 km",
    sessionTimesIST: { practice1: "22:00", sprintQualifying: "01:30", sprint: "22:00", qualifying: "01:30", race: "23:00" },
    podium: [
      { position: 1, code: "ANT", time: "1:28:15.758" },
      { position: 2, code: "HAM", time: "+10.768" },
      { position: 3, code: "VER", time: "+11.276" },
    ],
  },
  {
    round: 6, country: "Monaco", grandPrix: "Monaco Grand Prix",
    startISO: "2026-06-05", endISO: "2026-06-07", raceStartIST: "18:30",
    circuit: "Circuit de Monaco", circuitLength: "3.337 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "ANT", time: "2:23:31.243" },
      { position: 2, code: "HAM", time: "+6.271" },
      { position: 3, code: "GAS", time: "+20.369" },
    ],
  },
  {
    round: 7, country: "Spain", grandPrix: "Spanish Grand Prix",
    startISO: "2026-06-12", endISO: "2026-06-14", raceStartIST: "18:30",
    circuit: "Circuit de Barcelona-Catalunya", circuitLength: "4.675 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "HAM", time: "1:32:28.105" },
      { position: 2, code: "RUS", time: "+19.561" },
      { position: 3, code: "NOR", time: "+23.719" },
    ],
  },
  {
    round: 8, country: "Austria", grandPrix: "Austrian Grand Prix",
    startISO: "2026-06-26", endISO: "2026-06-28", raceStartIST: "18:30",
    circuit: "Red Bull Ring", circuitLength: "4.318 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "RUS", time: "1:26:37.979" },
      { position: 2, code: "VER", time: "+1.611" },
      { position: 3, code: "ANT", time: "+1.986" },
    ],
  },
  {
    round: 9, country: "Great Britain", grandPrix: "British Grand Prix",
    startISO: "2026-07-03", endISO: "2026-07-05", raceStartIST: "19:30",
    circuit: "Silverstone Circuit", circuitLength: "5.891 km",
    sessionTimesIST: { practice1: "17:30", sprintQualifying: "21:00", sprint: "17:30", qualifying: "19:30", race: "19:30" },
    podium: [
      { position: 1, code: "LEC", time: "1:27:11.335" },
      { position: 2, code: "RUS", time: "+0.427" },
      { position: 3, code: "HAM", time: "+0.772" },
    ],
  },
  {
    round: 10, country: "Belgium", grandPrix: "Belgian Grand Prix",
    startISO: "2026-07-17", endISO: "2026-07-19", raceStartIST: "18:30",
    circuit: "Circuit de Spa-Francorchamps", circuitLength: "7.004 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "ANT", time: "1:24:42.479" },
      { position: 2, code: "LEC", time: "+1.952" },
      { position: 3, code: "VER", time: "+11.586" },
    ],
  },
  {
    round: 11, country: "Hungary", grandPrix: "Hungarian Grand Prix",
    startISO: "2026-07-24", endISO: "2026-07-26", raceStartIST: "18:30",
    circuit: "Hungaroring", circuitLength: "4.381 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "NOR", time: "1:39:56.180" },
      { position: 2, code: "VER", time: "+15.08" },
      { position: 3, code: "ANT", time: "+18.728" },
    ],
  },
  {
    round: 12, country: "Netherlands", grandPrix: "Dutch Grand Prix",
    startISO: "2026-08-21", endISO: "2026-08-23", raceStartIST: "18:30",
    circuit: "Circuit Zandvoort", circuitLength: "4.259 km",
    sessionTimesIST: { practice1: "16:00", sprintQualifying: "19:30", sprint: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "NOR", time: "2:04:44.859" },
      { position: 2, code: "ANT", time: "+11.536" },
      { position: 3, code: "RUS", time: "+15.906" },
    ],
  },
  {
    round: 13, country: "Italy", grandPrix: "Italian Grand Prix",
    startISO: "2026-09-04", endISO: "2026-09-06", raceStartIST: "18:30",
    circuit: "Autodromo Nazionale Monza", circuitLength: "5.793 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "LEC", time: "1:18:44.902" },
      { position: 2, code: "VER", time: "+2.341" },
      { position: 3, code: "ANT", time: "+8.112" },
    ],
  },
  {
    round: 14, country: "Spain", grandPrix: "Spanish Grand Prix",
    startISO: "2026-09-11", endISO: "2026-09-13", raceStartIST: "18:30",
    circuit: "Madring (Madrid)", circuitLength: "5.474 km",
    sessionTimesIST: { practice1: "17:00", practice2: "20:30", practice3: "16:00", qualifying: "19:30", race: "18:30" },
    podium: [
      { position: 1, code: "ANT", time: "1:35:22.101" },
      { position: 2, code: "VER", time: "+4.221" },
      { position: 3, code: "NOR", time: "+9.884" },
    ],
  },
  {
    round: 15, country: "Azerbaijan", grandPrix: "Azerbaijan Grand Prix",
    startISO: "2026-09-24", endISO: "2026-09-26", raceStartIST: "18:00",
    circuit: "Baku City Circuit", circuitLength: "6.003 km",
    sessionTimesIST: { practice1: "15:30", practice2: "19:00", practice3: "15:30", qualifying: "19:00", race: "18:00" },
  },
  { 
    round: 16, country: "Bahrain", grandPrix: "Bahrain Grand Prix",
    startISO: "2026-10-02", endISO: "2026-10-04", raceStartIST: "18:00",
    circuit: "Bahrain International Circuit (Sepang, MY)", circuitLength: "5.543 km",
    sessionTimesIST: { practice1: "15:30", practice2: "19:00", practice3: "15:30", qualifying: "19:00", race: "18:00" },
  },
  { 
    round: 17, country: "Singapore", grandPrix: "Singapore Grand Prix",
    startISO: "2026-10-09", endISO: "2026-10-11", raceStartIST: "20:00",
    circuit: "Marina Bay Street Circuit", circuitLength: "4.940 km",
    sessionTimesIST: { practice1: "15:30", practice2: "19:30", practice3: "15:30", qualifying: "19:30", race: "20:00" },
  },
  { 
    round: 18, country: "United States", grandPrix: "United States Grand Prix",
    startISO: "2026-10-23", endISO: "2026-10-25", raceStartIST: "23:00",
    circuit: "Circuit of the Americas", circuitLength: "5.513 km",
    sessionTimesIST: { practice1: "22:00", practice2: "01:30", practice3: "22:00", qualifying: "01:30", race: "23:00" },
  },
  { round: 19, country: "Mexico", grandPrix: "Mexico City Grand Prix", startISO: "2026-10-30", endISO: "2026-11-01", raceStartIST: "23:00",
    circuit: "Autódromo Hermanos Rodríguez", circuitLength: "4.304 km",
    sessionTimesIST: { practice1: "00:00", practice2: "03:30", practice3: "23:00", qualifying: "02:30", race: "23:00" },
  },
  { round: 20, country: "Brazil", grandPrix: "Sao Paulo Grand Prix", startISO: "2026-11-06", endISO: "2026-11-08", raceStartIST: "22:00",
    circuit: "Interlagos", circuitLength: "4.309 km",
    sessionTimesIST: { practice1: "19:30", practice2: "23:00", practice3: "19:30", qualifying: "23:00", race: "22:00" },
  },
  { round: 21, country: "Las Vegas", grandPrix: "Las Vegas Grand Prix", startISO: "2026-11-19", endISO: "2026-11-21", raceStartIST: "08:30",
    circuit: "Las Vegas Strip Circuit", circuitLength: "6.201 km",
    sessionTimesIST: { practice1: "06:00", practice2: "09:30", practice3: "06:00", qualifying: "09:30", race: "08:30" },
  },
  { round: 22, country: "Qatar", grandPrix: "Qatar Grand Prix", startISO: "2026-11-27", endISO: "2026-11-29", raceStartIST: "21:00",
    circuit: "Lusail International Circuit", circuitLength: "5.419 km",
    sessionTimesIST: { practice1: "19:00", practice2: "22:30", practice3: "19:00", qualifying: "22:30", race: "21:00" },
  },
  { round: 23, country: "Abu Dhabi", grandPrix: "Abu Dhabi Grand Prix", startISO: "2026-12-04", endISO: "2026-12-06", raceStartIST: "18:00",
    circuit: "Yas Marina Circuit", circuitLength: "5.281 km",
    sessionTimesIST: { practice1: "15:30", practice2: "19:00", practice3: "16:00", qualifying: "19:30", race: "18:00" },
  },
];

/** IST midnight of the weekend start (Friday) — the countdown target.
 *  India Standard Time is fixed at UTC+05:30. */
export function weekendStartUTC(startISO: string): number {
  return new Date(`${startISO}T00:00:00+05:30`).getTime();
}

/** The countdown target: Sunday race start in IST. Parses `raceStartIST`
 *  (HH:MM) against `endISO` (the race day). Falls back to the Friday-midnight
 *  weekend start if no explicit race time is set. */
export function raceStartUTC(weekend: RaceWeekend): number {
  if (weekend.raceStartIST) {
    return new Date(`${weekend.endISO}T${weekend.raceStartIST}:00+05:30`).getTime();
  }
  return weekendStartUTC(weekend.startISO);
}

function weekendEndUTC(endISO: string): number {
  return new Date(`${endISO}T23:59:59+05:30`).getTime();
}

export function statusOf(weekend: RaceWeekend, now = new Date()): RaceStatus {
  const t = now.getTime();
  if (t < weekendStartUTC(weekend.startISO)) return "upcoming";
  if (t <= weekendEndUTC(weekend.endISO)) return "live";
  return "completed";
}

/** The next race weekend whose Sunday race has not yet started, or null post-season. */
export function getNextRaceWeekend(now = new Date()): RaceWeekend | null {
  const t = now.getTime();
  for (const w of RACE_CALENDAR) {
    if (t < raceStartUTC(w)) return w;
  }
  return null;
}

/** Upcoming/live weekends (for teaser strips). Sorted chronologically. */
export function getUpcomingRaceWeekends(now = new Date(), limit?: number): RaceWeekend[] {
  const t = now.getTime();
  const list = RACE_CALENDAR.filter((w) => t < weekendEndUTC(w.endISO));
  return limit ? list.slice(0, limit) : list;
}

/** Recent completed weekends, newest first (for result-style rows). */
export function getRecentRaceWeekends(now = new Date(), limit = 3): RaceWeekend[] {
  const t = now.getTime();
  return RACE_CALENDAR.filter((w) => t > weekendEndUTC(w.endISO))
    .reverse()
    .slice(0, limit);
}
