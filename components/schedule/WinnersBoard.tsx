"use client";

import type { RaceWeekend } from "@/lib/types";
import { formatDateRange } from "@/lib/utils";

export function WinnersBoard({ weekends }: { weekends: RaceWeekend[] }) {
  const completed = weekends.filter((w) => w.podium && w.podium.length > 0);
  if (completed.length === 0) return null;

  const verifiedCount = completed.length;
  return (
    <div className="overflow-hidden border border-white/10 bg-carbon-2/60 backdrop-blur-md">
      <div className="border-b-2 border-f1-red bg-carbon-3/60 px-4 py-3 md:px-6">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-f1-red-bright">2026 Winners — Verified</p>
        <h3 className="mt-1 font-sans text-lg font-black uppercase tracking-tight text-white md:text-xl">
          Who Won What · {verifiedCount} Races Decided
        </h3>
        <p className="mt-1 text-xs text-grey-400">R1–R12 verified from formula1.com (scrape 2026-09-03). R13 Italy (LEC/VER/ANT) & R14 Spain Madrid (ANT/VER/NOR) verified 2026-09-25. Live sync every hour.</p>
      </div>

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/10 bg-carbon/60 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-grey-500">
              <th className="px-4 py-2.5 tabular">Round</th>
              <th className="px-4 py-2.5">Grand Prix</th>
              <th className="px-4 py-2.5">Circuit</th>
              <th className="px-4 py-2.5 tabular">Date</th>
              <th className="px-4 py-2.5">Winner</th>
              <th className="px-4 py-2.5 tabular">Time</th>
              <th className="px-4 py-2.5">Podium</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {completed.map((w) => (
              <tr key={w.round} className="hover:bg-white/[0.04] transition-colors">
                <td className="px-4 py-3 font-display text-xs font-bold text-f1-red-bright tabular">R{String(w.round).padStart(2, "0")}</td>
                <td className="px-4 py-3">
                  <span className="block text-sm font-bold uppercase text-white">{w.country}</span>
                  <span className="block text-[0.65rem] uppercase tracking-wide text-grey-500">{w.grandPrix}</span>
                </td>
                <td className="px-4 py-3 text-xs text-grey-300">{w.circuit ?? "—"}</td>
                <td className="px-4 py-3 text-xs font-semibold text-grey-300 tabular">{formatDateRange(w.startISO, w.endISO)}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 bg-f1-red px-2 py-1 text-xs font-black uppercase text-white tabular">{w.podium![0].code}</span>
                </td>
                <td className="px-4 py-3 text-xs font-semibold text-white tabular">{w.podium![0].time}</td>
                <td className="px-4 py-3 text-[0.7rem] font-semibold text-grey-300 tabular">
                  <span className="text-white">{w.podium![0].code}</span> <span className="text-grey-500">/</span> {w.podium![1].code} <span className="text-grey-500">/</span> {w.podium![2].code}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-white/10">
        {completed.map((w) => (
          <div key={w.round} className="px-4 py-3.5 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-f1-red-bright tabular">R{String(w.round).padStart(2,"0")} · {formatDateRange(w.startISO, w.endISO)}</p>
              <p className="mt-1 text-sm font-bold uppercase text-white truncate">{w.country} · <span className="text-f1-red-bright">{w.podium![0].code}</span> won</p>
              <p className="text-xs text-grey-500 truncate">{w.circuit} · {w.podium![0].time}</p>
            </div>
            <span className="shrink-0 bg-f1-red px-2 py-1 text-xs font-black text-white">{w.podium![0].code}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 bg-carbon/40 px-4 py-2.5 flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-wide text-grey-500">
        <span>Source: formula1.com/en/racing/2026 · Live sync every hour via /api/revalidate/schedule</span>
        <span className="hidden sm:inline text-white/20">·</span>
        <span className="text-grey-400">{verifiedCount} / 23 rounds decided as of {new Date().toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata", day: "2-digit", month: "short", year: "numeric" })}</span>
      </div>
    </div>
  );
}
