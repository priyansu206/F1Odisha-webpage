import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ACTIVITIES, ACTIVITY_ITEMS } from "@/lib/data/community";

export function ActivitiesGrid() {
  return (
    <section className="bg-carbon/80 backdrop-blur-lg text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <Reveal variant="up">
          <ModuleHeader
            kicker={ACTIVITIES.kicker}
            title={ACTIVITIES.title}
            id="activities"
          />
        </Reveal>

        <Reveal variant="up" stagger className="mt-10">
          <ul className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {ACTIVITY_ITEMS.map((activity) => (
              <li
                key={activity.title}
                className="group relative flex flex-col gap-3 bg-carbon-2/60 backdrop-blur-sm p-6 transition-colors duration-150 hover:bg-carbon-3/70"
              >
                <span
                  aria-hidden
                  className="absolute inset-y-0 left-0 w-1 scale-y-0 bg-f1-red transition-transform duration-150 group-hover:scale-y-100"
                />
                <span aria-hidden className="text-2xl">
                  {activity.emoji}
                </span>
                <h3 className="font-sans text-base font-bold uppercase tracking-tight">
                  {activity.title}
                </h3>
                <p className="text-sm leading-6 text-grey-300">{activity.blurb}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
