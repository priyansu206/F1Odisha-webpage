import Link from "next/link";

import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { getCommunityEvents } from "@/lib/data/events";
import type { CommunityEvent } from "@/lib/types";

function TeaserCard({ event }: { event: CommunityEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col border border-white/10 bg-carbon-2/60 backdrop-blur-md transition-colors duration-150 hover:bg-carbon-3/70"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
        <span aria-hidden className="text-xl">{event.emoji}</span>
        <div className="flex flex-wrap justify-end gap-2">
          <Tag tone={event.status === "completed" ? "success" : "neutral"}>
            {event.status === "completed" ? "Completed ✓" : event.status}
          </Tag>
          <Tag tone="neutral">{event.kind.replace("-", " ")}</Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-5">
        <h3 className="font-sans text-lg font-bold uppercase tracking-tight text-white">
          {event.title}
        </h3>
        <p className="text-sm leading-6 text-grey-300">{event.headline}</p>

        <dl className="mt-auto grid grid-cols-1 gap-x-4 gap-y-1.5 border-t border-white/10 pt-4 text-xs">
          <div className="flex justify-between gap-3">
            <dt className="font-bold uppercase tracking-wider text-grey-500">Date</dt>
            <dd className="text-right text-white">{event.dateLabel}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="font-bold uppercase tracking-wider text-grey-500">Venue</dt>
            <dd className="text-right text-grey-300">{event.venue}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="font-bold uppercase tracking-wider text-grey-500">Access</dt>
            <dd className="text-right text-f1-red-bright">{event.access}</dd>
          </div>
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-grey-500 transition-colors group-hover:text-f1-red-bright">
          View event
        </span>
        <span aria-hidden className="text-f1-red transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

export function EventTeasers() {
  const events = getCommunityEvents();
  return (
    <section className="bg-carbon/80 backdrop-blur-lg text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <Reveal variant="up">
          <ModuleHeader
            kicker="Community Events"
            title="Be There. We Were."
            actionHref="/events"
            actionLabel="All Events"
            id="events"
          />
        </Reveal>
        <Reveal variant="up" stagger className="mt-10">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <TeaserCard key={event.slug} event={event} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
