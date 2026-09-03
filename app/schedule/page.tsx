import type { Metadata } from "next";

import { RaceFlowingMenu } from "@/components/schedule/RaceFlowingMenu";
import { RaceMobileList } from "@/components/schedule/RaceMobileList";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Button } from "@/components/ui/Button";
import { getRecentRaceWeekends } from "@/lib/data/schedule";
import { pageMetadata } from "@/lib/metadata";

// Race statuses change every weekend — revalidate every 6 hours (owner decision).
export const revalidate = 21600;

export const metadata: Metadata = pageMetadata(
  "Schedule",
  "The 2026 Formula 1 race calendar in IST — with results from every round so far."
);

export default function SchedulePage() {
  const winners = getRecentRaceWeekends(new Date(), 3);

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
            past rounds never vanish, they just move into the record books.
          </p>

          {winners.length > 0 && (
            <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-3">
              {winners.map((w) => (
                <div key={w.round} className="bg-carbon-2/60 backdrop-blur-sm px-5 py-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-grey-500 tabular">
                    Round {String(w.round).padStart(2, "0")} · {w.country}
                  </p>
                  <p className="mt-1 font-sans text-sm font-bold uppercase text-white">
                    {w.podium?.[0]?.code} won
                  </p>
                  <p className="text-xs text-grey-500 tabular">{w.podium?.[0]?.time}</p>
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

      <section
        id="race-weekends"
        className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16"
      >
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
            22 rounds · 5 continents
          </p>
          <p className="text-xs text-grey-500">
            Results are official · scraped from formula1.com
          </p>
        </div>

        <div className="md:hidden">
          <RaceMobileList />
        </div>
        <div className="hidden md:block">
          <RaceFlowingMenu />
        </div>
      </section>
    </>
  );
}
