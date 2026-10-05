import type { RaceWeekend } from "@/lib/types";
import { statusOf } from "@/lib/data/schedule";
import { formatDateRange, formatISTDay } from "@/lib/utils";

type SessionKey = "practice1" | "practice2" | "practice3" | "qualifying" | "sprintQualifying" | "sprint" | "race";

const LABELS: Record<SessionKey, string> = {
  practice1: "Practice 1",
  practice2: "Practice 2",
  practice3: "Practice 3",
  qualifying: "Qualifying",
  sprintQualifying: "Sprint Quali",
  sprint: "Sprint",
  race: "Race",
};

const DAY_ORDER: Record<SessionKey, number> = {
  practice1: 1, sprintQualifying: 1, practice2: 1,
  practice3: 2, qualifying: 2, sprint: 2,
  race: 3,
};

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T12:00:00+05:30`);
  d.setUTCDate(d.getUTCDate() + n);
  // need to return ISO date part in IST (use UTC date since we set at 12:00 IST)
  return d.toISOString().slice(0, 10);
}

function sessionDay(weekend: RaceWeekend, key: SessionKey): string {
  if (key === "practice1" || key === "practice2" || key === "sprintQualifying") return weekend.startISO;
  if (key === "practice3" || key === "qualifying" || key === "sprint") return addDays(weekend.startISO, 1);
  return weekend.endISO; // race
}

function SessionCard({
  label,
  timeIST,
  dayISO,
  result,
  isToday,
  isLiveDay,
}: {
  label: string;
  timeIST?: string;
  dayISO: string;
  result?: { driver: string; time: string; team?: string };
  isToday: boolean;
  isLiveDay: boolean;
}) {
  const hasResult = !!result;
  return (
    <div className={`relative overflow-hidden border bg-carbon-2/80 p-4 flex flex-col gap-2 ${isToday ? "border-f1-red/40 bg-f1-red/[0.07]" : hasResult ? "border-white/10" : "border-white/5 bg-carbon/30"}`}>
      {isToday && <span className="absolute inset-x-0 top-0 h-0.5 bg-f1-red" />}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-grey-500">{label}</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white flex items-center gap-1.5">
            <span className={`inline-block h-1 w-1 ${hasResult ? "bg-white" : isToday ? "bg-f1-red animate-pulse" : "bg-grey-500"}`} />
            {formatISTDay(dayISO)} · <span className="tabular">{timeIST ? `${timeIST} IST` : "TBC"}</span>
          </p>
        </div>
        <span className={`shrink-0 px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide ${hasResult ? "bg-white text-carbon" : isToday ? "bg-f1-red text-white" : "bg-carbon-3 text-grey-500"}`}>
          {hasResult ? "Topped" : isToday ? "Today" : "Scheduled"}
        </span>
      </div>

      {hasResult ? (
        <div className="mt-1 flex items-baseline justify-between gap-3">
          <span className="font-display text-sm font-black uppercase text-white tabular">{result!.driver}</span>
          <span className="text-xs font-bold text-f1-red-bright tabular">{result!.time}</span>
        </div>
      ) : (
        <p className={`text-xs ${isToday ? "text-f1-red-bright font-semibold" : "text-grey-500"}`}>{isToday ? "Session starts today — refresh for live timing" : "Awaiting official timing"}</p>
      )}
      {result?.team && <p className="text-[0.6rem] uppercase tracking-wide text-grey-500 -mt-1">{result.team}</p>}
      {isLiveDay && !hasResult && isToday && <p className="text-[0.6rem] text-grey-400">Live coverage from Baku City Circuit</p>}
    </div>
  );
}

export function CurrentRaceDetails({ weekends, now = new Date() }: { weekends: RaceWeekend[]; now?: Date }) {
  const live = weekends.find((w) => statusOf(w, now) === "live");
  const target = live ?? weekends.find((w) => statusOf(w, now) === "upcoming") ?? weekends[weekends.length - 1];
  if (!target) return null;

  const status = statusOf(target, now);
  const isLive = status === "live";
  const sessions = target.sessions ?? {};
  const times = target.sessionTimesIST ?? {};

  const todayISO = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

  // Build ordered session list: include race, and any practice/quali that has a scheduled time or result
  const keys: SessionKey[] = ["practice1", "practice2", "practice3", "sprintQualifying", "sprint", "qualifying", "race"];
  const ordered = keys
    .filter((k) => k in times || k in sessions || k === "race")
    .sort((a, b) => DAY_ORDER[a] - DAY_ORDER[b]);

  const fri = ordered.filter((k) => DAY_ORDER[k] === 1);
  const sat = ordered.filter((k) => DAY_ORDER[k] === 2);
  const sun = ordered.filter((k) => DAY_ORDER[k] === 3);

  const daySections = [
    { title: "Friday", date: target.startISO, keys: fri },
    { title: "Saturday", date: addDays(target.startISO, 1), keys: sat },
    { title: "Sunday", date: target.endISO, keys: sun },
  ].filter((d) => d.keys.length > 0);

  return (
    <div className="overflow-hidden border border-white/10 bg-carbon-2/60 backdrop-blur-md">
      {/* Header */}
      <div className={`px-4 py-4 md:px-6 flex flex-col gap-3 border-b-2 ${isLive ? "border-f1-red bg-f1-red/10" : "border-white/10 bg-carbon-3/60"}`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
              {isLive && <span className="inline-block h-2 w-2 animate-pulse bg-f1-red" />}
              <span className={isLive ? "text-f1-red-bright" : "text-grey-500"}>{isLive ? "Live Now" : status === "completed" ? "Completed" : "Up Next"} · Round {String(target.round).padStart(2, "0")}</span>
            </p>
            <h3 className="mt-1 font-sans text-xl font-black uppercase tracking-tight text-white md:text-2xl">
              {target.country} — {target.grandPrix}
            </h3>
            <p className="mt-1 text-xs text-grey-400 flex flex-wrap gap-x-3 gap-y-1">
              <span>{target.circuit} {target.circuitLength ? `· ${target.circuitLength}` : ""}</span>
              <span className="text-white/60">·</span>
              <span className="font-semibold text-grey-300 tabular">{formatDateRange(target.startISO, target.endISO)}</span>
              <span className="text-white/60">·</span>
              <span className="font-bold text-white tabular">Race {target.raceStartIST} IST</span>
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${isLive ? "bg-f1-red text-white animate-live-pulse" : status === "completed" ? "bg-white text-carbon" : "bg-carbon-3 text-grey-300"}`}>
            {isLive ? "● Live in Baku" : status === "completed" ? "✓ Completed" : `Next: ${formatISTDay(target.startISO)}`}
          </span>
        </div>
        <p className="text-[0.65rem] text-grey-500">All times IST · {isLive ? "P3 & Qualifying today (25 Sep) — refresh for live timing" : "Times sync from formula1.com · revalidate every hour"}</p>
      </div>

      {/* Day-grouped grid */}
      <div className="grid gap-px bg-white/10 lg:grid-cols-3">
        {daySections.map((day) => (
          <div key={day.title} className="bg-carbon/20">
            <div className="bg-carbon-3/40 px-4 py-2 border-b border-white/5 flex items-center justify-between">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white">{day.title}</span>
              <span className="text-xs font-semibold text-grey-500 tabular">{formatISTDay(day.date)}</span>
            </div>
            <div className="grid gap-px bg-white/5">
              {day.keys.map((k) => {
                const timeIST = (times as Record<string, string>)[k];
                const result = (sessions as Record<string, { driver: string; time: string; team?: string }>)[k];
                const dayISO = sessionDay(target, k);
                const isToday = dayISO === todayISO;
                return (
                  <SessionCard
                    key={k}
                    label={LABELS[k]}
                    timeIST={timeIST ?? (k === "race" ? target.raceStartIST : undefined)}
                    dayISO={dayISO}
                    result={result}
                    isToday={isToday}
                    isLiveDay={isLive}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {target.podium && (
        <div className="border-t border-white/10 bg-carbon/60 px-4 py-3 md:px-6 flex flex-wrap gap-3 text-xs items-center">
          <span className="font-bold uppercase tracking-wide text-grey-500">Race Result:</span>
          <span className="inline-flex items-center gap-1.5 bg-f1-red px-2 py-1 font-black text-white tabular">1 {target.podium[0].code} {target.podium[0].time}</span>
          <span className="text-grey-400 tabular">2 {target.podium[1].code} {target.podium[1].time}</span>
          <span className="text-grey-400 tabular">3 {target.podium[2].code} {target.podium[2].time}</span>
          <span className="text-[0.6rem] uppercase tracking-wide text-grey-500 ml-auto">Verified via formula1.com</span>
        </div>
      )}

      {!target.podium && status !== "completed" && (
        <div className="border-t border-white/10 bg-carbon/40 px-4 py-3 text-center">
          <p className="text-xs text-grey-500">Results TBC — official timing will appear after qualifying/race. No estimated winners shown.</p>
        </div>
      )}
    </div>
  );
}
