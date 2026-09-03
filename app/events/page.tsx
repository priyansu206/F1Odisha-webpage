import type { Metadata } from "next";

import { EventCard } from "@/components/events/EventCard";
import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { getCommunityEvents } from "@/lib/data/events";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Events",
  "F1 Odisha community events — watch parties, karting days and car displays in Bhubaneswar."
);

export default function EventsPage() {
  const events = getCommunityEvents();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <ModuleHeader kicker="Community Calendar" title="Events" />

      <p className="mt-6 max-w-2xl text-grey-300">
        Every F1 Odisha gathering — watch parties, car displays and community
        nights across Bhubaneswar. Season 2026 recaps live here.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>

      <div className="mt-10 border-2 border-dashed border-white/10 px-6 py-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
          Next watch party — announced in the WhatsApp community first
        </p>
        <p className="mt-2 text-sm text-grey-300">
          New race-weekend screenings are announced ahead of every Grand Prix.
        </p>
      </div>
    </section>
  );
}
