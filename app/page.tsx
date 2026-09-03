import { Hero } from "@/components/home/Hero";
import { NextRaceCountdown } from "@/components/home/NextRaceCountdown";
import { WhoWeAre } from "@/components/home/WhoWeAre";
import { ActivitiesGrid } from "@/components/home/ActivitiesGrid";
import { EventTeasers } from "@/components/home/EventTeasers";
import { ScheduleTeaser } from "@/components/home/ScheduleTeaser";
import { JoinBand } from "@/components/home/JoinBand";

export default function Home() {
  return (
    <>
      <Hero />
      <NextRaceCountdown />
      <WhoWeAre />
      <ActivitiesGrid />
      <EventTeasers />
      <ScheduleTeaser />
      <JoinBand />
    </>
  );
}
