import type { Activity, Pillar, Stat } from "@/lib/types";

/** Hero stats band (live-site scraped values). */
export const STATS: Stat[] = [
  { value: "22", label: "Race Weekends a Year" },
  { value: "LIVE", label: "Members & Counting", live: true },
  { value: "260+", label: "At Our First Watch Party" },
  { value: "1", label: "State. One Grid." },
];

/** "Who We Are / Odisha Meets The Grid" — verbatim story from the live site. */
export const WHO_WE_ARE = {
  kicker: "Who We Are",
  title: "Odisha Meets The Grid",
  paragraphs: [
    "F1 Odisha is the state's first dedicated Formula 1 community — built by fans, for fans. We're a crew from Bhubaneswar, Cuttack, Puri and beyond who believe that the passion for motorsport in Odisha deserves a real home.",
    "Whether you've watched every race since Schumacher's era or just got into it after Drive to Survive — you belong here. We run watch parties, organise karting sessions, debate tyre strategies at 3am, and celebrate Odisha's culture through the lens of the fastest sport on earth.",
  ],
  closing: "The Konark Chakra turns at 18,000 RPM in our hearts. Come be part of it.",
};

export const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Watch Parties",
    blurb:
      "Every race weekend, we gather. Live screenings, big screens, race-day food and the kind of energy only a room full of F1 fans can create.",
  },
  {
    number: "02",
    title: "Sim & Karting",
    blurb:
      "From iRacing nights to real-world kart track sessions — we take racing off the TV and put you in the seat.",
  },
  {
    number: "03",
    title: "Online Community",
    blurb:
      "WhatsApp, Discord, Instagram — stay connected through every race weekend, every transfer rumour, every controversial penalty.",
  },
  {
    number: "04",
    title: "Odisha Identity",
    blurb:
      "We celebrate F1 through an Odia lens. Our culture, our heritage, our community — the Kalinga spirit on the global grid.",
  },
];

/** "Life on the Calendar" activity cards — six real community activities. */
export const ACTIVITIES = {
  kicker: "What We Do",
  title: "Life on the Calendar",
};

export const ACTIVITY_ITEMS: Activity[] = [
  {
    emoji: "🏁",
    title: "Race Watch Parties",
    blurb:
      "Every Grand Prix. A proper venue, great company, live commentary reactions. No spoilers from the algorithm — just the race, live.",
  },
  {
    emoji: "🎮",
    title: "Sim Racing Nights",
    blurb:
      "F1 2024, iRacing, Assetto Corsa. Monthly sim racing tournaments with leaderboards, rivalries, and bragging rights.",
  },
  {
    emoji: "🏎️",
    title: "Karting Sessions",
    blurb:
      "Quarterly kart track days at venues around Odisha. Because talking about racing is good, but actually doing it is better.",
  },
  {
    emoji: "🏆",
    title: "Fantasy F1 League",
    blurb:
      "Our own internal Fantasy F1 league running through the full season. Transfers, wildcards, strategy — and a trophy at year end.",
  },
  {
    emoji: "🎙️",
    title: "Fan Debates & Trivia",
    blurb:
      "Is Max the GOAT? Was that a racing incident? F1 trivia nights and structured debates that get genuinely intense.",
  },
  {
    emoji: "📸",
    title: "Content & Creator Nights",
    blurb:
      "For fans who make content — collaboration nights, reel shoots at watch parties, and a creator network within the community.",
  },
];
