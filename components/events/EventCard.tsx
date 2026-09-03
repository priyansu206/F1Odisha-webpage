import Link from "next/link";

import { Tag } from "@/components/ui/Tag";
import type { CommunityEvent } from "@/lib/types";

const KIND_LABEL: Record<CommunityEvent["kind"], string> = {
  "watch-party": "Watch Party",
  karting: "Karting",
  "car-display": "Car Display",
  community: "Community",
};

export function EventCard({ event }: { event: CommunityEvent }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col border border-white/10 bg-carbon-2/60 backdrop-blur-md transition-colors duration-150 hover:border-f1-red/60 hover:bg-carbon-3/70"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-grey-500">
          <span aria-hidden className="text-base">{event.emoji}</span>
          {KIND_LABEL[event.kind]}
        </span>
        <Tag tone={event.status === "completed" ? "success" : "neutral"}>
          {event.status === "completed" ? "Completed ✓" : "Upcoming"}
        </Tag>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-5">
        <h2 className="font-sans text-xl font-black uppercase tracking-tight text-white">
          {event.title}
        </h2>
        <p className="text-sm leading-6 text-grey-300">{event.headline}</p>

        <dl className="mt-auto space-y-2 border-t border-white/10 pt-4 text-xs">
          <Row label="Date" value={event.dateLabel.split(" · ")[0]} />
          <Row label="Venue" value={event.venue} />
          <Row label="Access" value={event.access} accent />
          {event.capacity && <Row label="Capacity" value={`${event.capacity}+ members`} />}
          {event.waves && (
            <Row label="Waves" value={`${event.waves.length} · all ${event.waves.every((w) => w.status === "sold-out") ? "sold out" : "open"}`} />
          )}
        </dl>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-5 py-3">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-grey-500 transition-colors group-hover:text-f1-red-bright">
          Full recap
        </span>
        <span aria-hidden className="text-f1-red transition-transform duration-150 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

function Row({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="shrink-0 font-bold uppercase tracking-wider text-grey-500">{label}</dt>
      <dd className={`text-right ${accent ? "font-semibold text-f1-red-bright" : "text-white"}`}>
        {value}
      </dd>
    </div>
  );
}
