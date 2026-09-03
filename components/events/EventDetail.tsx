import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { SlotTimeline } from "@/components/events/SlotTimeline";
import type { CommunityEvent } from "@/lib/types";

const KIND_LABEL: Record<CommunityEvent["kind"], string> = {
  "watch-party": "Watch Party",
  karting: "Karting",
  "car-display": "Car Display",
  community: "Community",
};

interface EventDetailProps {
  event: CommunityEvent;
}

export function EventDetail({ event }: EventDetailProps) {
  const isCompleted = event.status === "completed";

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-f1-red">
        <div aria-hidden className="absolute inset-y-0 right-0 w-1/3 -skew-x-12 bg-carbon-2/60 backdrop-blur-sm" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone={isCompleted ? "success" : "neutral"}>
              {isCompleted ? "Completed ✓" : "Upcoming"}
            </Tag>
            <Tag tone="neutral">{KIND_LABEL[event.kind]}</Tag>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-8">
            <div>
              <h1 className="max-w-3xl font-sans text-4xl leading-[0.95] font-black uppercase tracking-tight md:text-6xl">
                {event.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-grey-300">
                {event.headline}
              </p>
            </div>
            <span aria-hidden className="text-6xl md:text-8xl">{event.emoji}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1fr_20rem]">
        <div>
          <div className="space-y-5">
            {event.copy.map((para) => (
              <p key={para.slice(0, 24)} className="max-w-2xl leading-7 text-grey-300">
                {para}
              </p>
            ))}
          </div>

          {event.perks.length > 0 && (
            <div className="mt-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
                On the day
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {event.perks.map((perk) => (
                  <li
                    key={perk}
                    className="border border-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white"
                  >
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.activities && event.activities.length > 0 && (
            <ul className="mt-9 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {event.activities.map((activity) => (
                <li
                  key={activity}
                  className="bg-carbon-2/60 backdrop-blur-sm px-4 py-4 text-xs font-semibold tracking-wide text-grey-300"
                >
                  {activity}
                </li>
              ))}
            </ul>
          )}

          {event.waves && event.waves.length > 0 && (
            <div className="mt-9">
              <SlotTimeline waves={event.waves} capacity={event.capacity} />
            </div>
          )}
        </div>

        <aside className="h-fit border border-white/10 bg-carbon-2/60 backdrop-blur-md lg:sticky lg:top-24">
          <p className="border-b border-white/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
            Event details
          </p>
          <dl className="divide-y divide-white/10 px-5">
            <MetaRow label="Date" value={event.dateLabel.split(" · ")[0]} />
            {event.doorsIST && <MetaRow label="Doors" value={event.doorsIST} />}
            {event.raceIST && <MetaRow label="Race" value={event.raceIST} />}
            <MetaRow label="Venue" value={event.venue} />
            <MetaRow label="Access" value={event.access} accent />
            {event.capacity && (
              <MetaRow label="Capacity" value={`${event.capacity}+ members`} />
            )}
          </dl>

          <div className="border-t border-white/10 px-5 py-5">
            <Button href="/events" variant="outline" size="sm" className="w-full">
              ← All Events
            </Button>
          </div>
        </aside>
      </section>

      <section className="border-t border-white/10 bg-carbon-2/70 backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center md:px-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
              Lost your documents?
            </p>
            <p className="mt-1 font-sans text-xl font-black uppercase text-white md:text-2xl">
              Re-generate your member badge
            </p>
          </div>
          <Button href="/docs" size="md" skew>
            My Docs
          </Button>
        </div>
      </section>
    </>
  );
}

function MetaRow({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 py-4">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-grey-500">
        {label}
      </dt>
      <dd
        className={
          accent
            ? "text-sm font-semibold text-f1-red-bright"
            : "text-sm font-semibold text-white"
        }
      >
        {value}
      </dd>
    </div>
  );
}
