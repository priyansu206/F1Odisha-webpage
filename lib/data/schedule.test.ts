import { describe, expect, it } from "vitest";

import {
  getNextRaceWeekend,
  getRecentRaceWeekends,
  statusOf,
  weekendStartUTC,
} from "@/lib/data/schedule";

const ist = (iso: string) => new Date(`${iso}+05:30`).getTime();

describe("weekendStartUTC", () => {
  it("maps Friday 00:00 IST to the correct UTC instant", () => {
    // 2026-09-04 00:00 IST == 2026-09-03 18:30 UTC
    expect(weekendStartUTC("2026-09-04")).toBe(Date.UTC(2026, 8, 3, 18, 30));
  });
});

describe("statusOf", () => {
  it("is upcoming before the Friday start", () => {
    const round13 = { round: 13, country: "Italy", grandPrix: "Italian Grand Prix", startISO: "2026-09-04", endISO: "2026-09-06" };
    expect(statusOf(round13, new Date(ist("2026-09-03T12:00:00")))).toBe("upcoming");
  });

  it("is live during the race weekend (IST boundaries)", () => {
    const round13 = { round: 13, country: "Italy", grandPrix: "Italian Grand Prix", startISO: "2026-09-04", endISO: "2026-09-06" };
    expect(statusOf(round13, new Date(ist("2026-09-05T00:00:00")))).toBe("live");
    // still live late Sunday IST, even though UTC has rolled to Monday
    expect(statusOf(round13, new Date(ist("2026-09-06T23:59:00")))).toBe("live");
  });

  it("is completed after the Sunday closes in IST", () => {
    const round13 = { round: 13, country: "Italy", grandPrix: "Italian Grand Prix", startISO: "2026-09-04", endISO: "2026-09-06" };
    expect(statusOf(round13, new Date(ist("2026-09-07T00:00:00")))).toBe("completed");
  });
});

describe("weekend selection", () => {
  it("returns Italy as the next weekend before its Friday in IST", () => {
    const next = getNextRaceWeekend(new Date(ist("2026-09-03T17:00:00")));
    expect(next?.round).toBe(13);
    expect(next?.country).toBe("Italy");
  });

  it("still targets the current race until its Sunday start, then advances", () => {
    // Saturday of the Italian GP: the Sunday race hasn't started yet
    const duringWeekend = getNextRaceWeekend(new Date(ist("2026-09-05T12:00:00")));
    expect(duringWeekend?.round).toBe(13); // Italy
    // After Italy's race (Sun 06 Sep, 18:30 IST) it becomes Spain
    const afterRace = getNextRaceWeekend(new Date(ist("2026-09-07T12:00:00")));
    expect(afterRace?.round).toBe(14); // Spain
  });

  it("returns null after the season finale", () => {
    expect(getNextRaceWeekend(new Date(ist("2026-12-07T00:00:00")))).toBeNull();
  });

  it("returns the newest completed rounds first, with real podiums", () => {
    const recent = getRecentRaceWeekends(new Date(ist("2026-09-03T17:00:00")), 3);
    expect(recent.map((r) => r.round)).toEqual([12, 11, 10]); // Netherlands, Hungary, Belgium
    expect(recent[0]?.podium?.[0]?.code).toBeDefined();
    expect(recent[0]?.podium?.[0]?.time).toBeDefined();
  });
});
