import { STATS } from "@/lib/data/community";

export function StatsBand() {
  return (
    <div className="relative border-t-2 border-f1-red bg-carbon/80 backdrop-blur-lg">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 px-4 py-6 md:px-6 md:py-8">
            <span className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold tracking-tight text-white tabular md:text-5xl">
                {stat.value}
              </span>
              {stat.live && (
                <span
                  aria-hidden
                  className="inline-block h-2 w-2 bg-f1-red animate-live-pulse"
                />
              )}
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-grey-500 md:text-xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
