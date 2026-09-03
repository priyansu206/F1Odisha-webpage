/** F1 Odisha lives in IST. All rendered datetimes flow through here. */

export const IST_TIMEZONE = "Asia/Kolkata";

/** Best-effort class combiner (tiny, dependency-free stand-in for clsx+tailwind-merge). */
export function cn(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(" ");
}

/** Formats an ISO timestamp as a human IST string, e.g. "Sun, 7 Jun 2026 · 6:30 PM IST". */
export function formatIST(iso: string, withTime = false): string {
  const d = new Date(iso);
  const date = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIMEZONE,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);

  if (!withTime) return date;

  const time = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIMEZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(d);

  return `${date} · ${time} IST`;
}

/** Formats a media duration like 478 → "7:58" (F1.com video card pattern). */
export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.round(totalSeconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export interface CountdownParts {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

/** Days/hours/mins/secs remaining until a UTC target, or null once passed. */
export function countdownParts(target: number, now: number): CountdownParts | null {
  const ms = target - now;
  if (ms <= 0) return null;
  const secs = Math.floor(ms / 1000);
  return {
    days: Math.floor(secs / 86400),
    hours: Math.floor((secs % 86400) / 3600),
    mins: Math.floor((secs % 3600) / 60),
    secs: secs % 60,
  };
}

/** Renders an IST date range like "06 - 08 Mar" from ISO date strings. */
export function formatDateRange(startISO: string, endISO: string): string {
  const start = new Date(`${startISO}T12:00:00+05:30`);
  const end = new Date(`${endISO}T12:00:00+05:30`);
  const sDay = String(start.getUTCDate()).padStart(2, "0");
  const eDay = String(end.getUTCDate()).padStart(2, "0");
  const eMon = MONTHS_SHORT[end.getUTCMonth()];
  return `${sDay} - ${eDay} ${eMon}`;
}

/** Day-of-week + short date for a weekend start ISO, e.g. "Fri, 04 Sep". */
export function formatISTDay(startISO: string): string {
  const d = new Date(`${startISO}T12:00:00+05:30`);
  return `${DAY_SHORT[d.getUTCDay()]}, ${String(d.getUTCDate()).padStart(2, "0")} ${
    MONTHS_SHORT[d.getUTCMonth()]
  }`;
}

const DAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
