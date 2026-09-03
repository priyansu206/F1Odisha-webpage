"use client";

import FlowingMenu from "@/components/schedule/FlowingMenu";
import { RACE_CALENDAR } from "@/lib/data/schedule";
import { formatISTDay } from "@/lib/utils";

/**
 * Official F1.com circuit-track image slug per round's host venue. These render
 * the real Grand Prix layout of each place on the marquee. Format:
 * https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/common/f1/2026/track/2026track{slug}detailed.webp
 */
const TRACK_SLUGS: Record<string, string> = {
  Australia: "melbourne",
  China: "shanghai",
  Japan: "suzuka",
  Miami: "miami",
  Canada: "montreal",
  Monaco: "montecarlo",
  Spain: "catalunya",
  Austria: "spielberg",
  "Great Britain": "silverstone",
  Belgium: "spafrancorchamps",
  Hungary: "hungaroring",
  Netherlands: "zandvoort",
  Italy: "monza",
  Azerbaijan: "baku",
  Singapore: "singapore",
  "United States": "austin",
  Mexico: "mexicocity",
  Brazil: "interlagos",
  "Las Vegas": "lasvegas",
  Qatar: "lusail",
  "Abu Dhabi": "yasmarina",
};

const TRACK_IMAGE = (slug: string) =>
  `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/common/f1/2026/track/2026track${slug}detailed.webp`;

export function RaceFlowingMenu() {
  const items = RACE_CALENDAR.map((weekend) => ({
    link: "#race-weekends",
    text: `${weekend.country}`.toUpperCase(),
    meta: `R${String(weekend.round).padStart(2, "0")}`,
    sublabel: `${formatISTDay(weekend.startISO)}`,
    image: TRACK_IMAGE(TRACK_SLUGS[weekend.country] ?? "montecarlo"),
  }));

  return (
    <div className="w-full" style={{ position: "relative" }}>
      <FlowingMenu
        items={items}
        textColor="#ffffff"
        bgColor="#15151e"
        marqueeBgColor="#1e1e2a"
        marqueeTextColor="#ffffff"
        borderColor="rgba(255,255,255,0.12)"
      />
    </div>
  );
}
