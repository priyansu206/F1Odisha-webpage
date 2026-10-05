import type { Metadata } from "next";

import { RaceFlowingMenu } from "@/components/schedule/RaceFlowingMenu";
import { RaceMobileList } from "@/components/schedule/RaceMobileList";
import { WinnersBoard } from "@/components/schedule/WinnersBoard";
import { CurrentRaceDetails } from "@/components/schedule/CurrentRaceDetails";
import { NextRaceTiming } from "@/components/schedule/NextRaceTiming";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { getLiveRaceCalendar } from "@/lib/data/schedule-sync";
import { getRecentRaceWeekends } from "@/lib/data/schedule";
import { pageMetadata } from "@/lib/metadata";

// Race statuses change every weekend — revalidate every hour and via Vercel Cron (/api/revalidate/schedule).
export const revalidate = 3600;

export const metadata: Metadata = pageMetadata(
  "Schedule",
  "The 2026 Formula 1 race calendar in IST — with results from every round so far."
);

export default async function SchedulePage() {
  // Live-synced calendar (f1.com -> Jolpica -> static fallback)
  const liveCalendar = await getLiveRaceCalendar();
  // Use live calendar for recent winners; fallback helper still works on live data via direct filter
  const now = new Date();
  const winners = liveCalendar
    .filter((w) => new Date(`${w.endISO}T23:59:59+05:30`).getTime() < now.getTime())
    .reverse()
    .slice(0, 3);
  // Also keep static helper for compatibility (unused if live differs)
  void getRecentRaceWeekends;

  return (
    <>
      <section className="border-b-2 border-f1-red">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <ModuleHeader
            kicker="2026 FIA Formula One World Championship"
            title="Race Calendar"
          />
          <p className="mt-6 max-w-2xl text-grey-300">
            All times IST. Every Grand Prix weekend with its start date —
            past rounds never vanish, they just move into the record books. Tap any session to see who topped it.
          </p>

          {winners.length > 0 && (
            <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-3">
              {winners.map((w) => (
                <div key={w.round} className="bg-carbon-2/60 backdrop-blur-sm px-5 py-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-grey-500 tabular">
                    Round {String(w.round).padStart(2, "0")} · {w.country} · {w.circuit}
                  </p>
                  <p className="mt-1 font-sans text-sm font-bold uppercase text-white">
                    {w.podium?.[0]?.code} won
                  </p>
                  <p className="text-xs text-grey-500 tabular">{w.podium?.[0]?.time} · 2nd {w.podium?.[1].code} 3rd {w.podium?.[2].code}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/#race-weekends" variant="outline" size="md">
              Back to countdown
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10 space-y-8">
        <NextRaceTiming weekends={liveCalendar} />
        <CurrentRaceDetails weekends={liveCalendar} now={now} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <WinnersBoard weekends={liveCalendar} />
      </section>

      <section
        id="race-weekends"
        className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
            {liveCalendar.length} rounds · 5 continents
          </p>
          <p className="text-xs text-grey-500">
            Results are official · synced from formula1.com · revalidates every hour
          </p>
        </div>

        <div className="md:hidden">
          <RaceMobileList weekends={liveCalendar} />
        </div>
        <div className="hidden md:block">
          <RaceFlowingMenu weekends={liveCalendar} />
        </div>
      </section>
    </>
  );
}
