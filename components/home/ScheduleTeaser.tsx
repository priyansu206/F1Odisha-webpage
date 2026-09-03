import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import {
  getUpcomingRaceWeekends,
  statusOf,
} from "@/lib/data/schedule";
import { formatDateRange } from "@/lib/utils";

export function ScheduleTeaser() {
  const weekends = getUpcomingRaceWeekends(new Date(), 4);
  const now = new Date();

  return (
    <section className="border-t border-white/10 bg-carbon-2/70 backdrop-blur-lg text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <Reveal variant="up">
          <ModuleHeader
            kicker="2026 Season"
            title="Race Weekends"
            actionHref="/schedule"
            actionLabel="Full Calendar"
          />
        </Reveal>
        <Reveal variant="up" stagger className="mt-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {weekends.map((weekend) => {
            const status = statusOf(weekend, now);
            return (
              <li key={weekend.round}>
                <div className="grid items-center gap-x-6 gap-y-1 px-2 py-4 transition-colors duration-150 hover:bg-carbon-3 sm:grid-cols-[4.5rem_1fr_auto_auto] md:px-4">
                  <span className="font-display text-sm font-bold tracking-widest text-f1-red-bright uppercase tabular">
                    R{String(weekend.round).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-sans text-base font-bold uppercase tracking-tight">
                      {weekend.country}
                    </span>
                    <span className="block text-xs tracking-wide text-grey-500 uppercase">
                      {weekend.grandPrix}
                    </span>
                  </span>
                  <span className="hidden text-xs font-bold tracking-[0.14em] text-grey-300 uppercase tabular sm:block">
                    {formatDateRange(weekend.startISO, weekend.endISO)}
                  </span>
                  <span className="justify-self-start sm:justify-self-end">
                    <Tag tone={status === "live" ? "live" : "neutral"}>
                      {status === "live" ? "Live now" : "Upcoming"}
                    </Tag>
                  </span>
                </div>
              </li>
            );
          })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
