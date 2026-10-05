"use client";

import { useEffect, useState } from "react";
import type { RaceWeekend } from "@/lib/types";
import { raceStartUTC, statusOf } from "@/lib/data/schedule";
import { countdownParts, formatDateRange } from "@/lib/utils";

function pad(n: number) { return String(n).padStart(2,"0"); }

export function NextRaceTiming({ weekends }: { weekends: RaceWeekend[] }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const nowDate = now !== null ? new Date(now) : new Date();
  // Next race is the next whose race start is in future (live counts as next until race start)
  const next = weekends.find((w) => {
    const t = w.raceStartIST ? new Date(`${w.endISO}T${w.raceStartIST}:00+05:30`).getTime() : new Date(`${w.startISO}T00:00:00+05:30`).getTime();
    return (now ?? Date.now()) < t;
  }) ?? weekends.find((w) => statusOf(w, nowDate) === "upcoming") ?? null;

  if (!next) {
    return (
      <div className="border border-white/10 bg-carbon-2/60 p-6 text-center">
        <p className="font-sans text-lg font-black uppercase text-white">Season Complete — See You in 2027</p>
      </div>
    );
  }

  const target = raceStartUTC(next);
  const left = now !== null ? countdownParts(target, now) : null;
  const times = next.sessionTimesIST ?? {};

  return (
    <div className="overflow-hidden border border-white/10 bg-carbon-2/60 backdrop-blur-md">
      <div className="border-b-2 border-f1-red bg-carbon-3/60 px-4 py-3 md:px-6">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-f1-red-bright">Next Race · Round {String(next.round).padStart(2,"0")}</p>
        <h3 className="mt-1 font-sans text-lg font-black uppercase tracking-tight text-white md:text-xl">
          {next.country} — {next.grandPrix}
        </h3>
        <p className="text-xs text-grey-400">{next.circuit} · {formatDateRange(next.startISO, next.endISO)} · Race <span className="font-bold text-white tabular">{next.raceStartIST} IST</span></p>
      </div>

      <div className="grid gap-px bg-white/10 grid-cols-4">
        {[
          { k: "days", label: "Days", v: left ? pad(left.days) : "00" },
          { k: "hours", label: "Hours", v: left ? pad(left.hours) : "00" },
          { k: "mins", label: "Mins", v: left ? pad(left.mins) : "00" },
          { k: "secs", label: "Secs", v: left ? pad(left.secs) : "00" },
        ].map((c) => (
          <div key={c.k} className="bg-carbon-2/80 px-2 py-4 text-center md:py-5">
            <span className="font-display text-2xl font-bold text-f1-red md:text-3xl tabular">{c.v}</span>
            <span className="mt-1 block text-[0.6rem] font-bold uppercase tracking-[0.18em] text-grey-500">{c.label}</span>
          </div>
        ))}
      </div>

      {Object.keys(times).length > 0 && (
        <div className="border-t border-white/10 bg-carbon/40 px-4 py-3 md:px-6">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-grey-500">Weekend Schedule (IST)</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {Object.entries(times).map(([k, v]) => (
              <span key={k} className="border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white tabular">
                <span className="text-grey-500">{k.replace(/([A-Z])/g, " $1").trim()}:</span> {v}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="h-0.5 w-full bg-f1-red" />
    </div>
  );
}
