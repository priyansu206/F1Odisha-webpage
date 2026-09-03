import { describe, expect, it } from "vitest";

import { countdownParts, formatDateRange, formatDuration } from "@/lib/utils";

describe("countdownParts", () => {
  const target = Date.UTC(2026, 8, 3, 18, 30, 0); // 2026-09-04 00:00 IST

  it("returns null once the target has passed", () => {
    expect(countdownParts(target, target + 1)).toBeNull();
  });

  it("splits remaining time into days/hours/mins/secs", () => {
    const parts = countdownParts(target, target - 1000); // exactly 1 sec left
    expect(parts).toEqual({ days: 0, hours: 0, mins: 0, secs: 1 });
  });

  it("handles a multi-day window", () => {
    const parts = countdownParts(target, target - (2 * 86400 + 3600) * 1000);
    expect(parts).toEqual({ days: 2, hours: 1, mins: 0, secs: 0 });
  });
});

describe("formatDateRange", () => {
  it("renders a same-month IST range", () => {
    expect(formatDateRange("2026-09-04", "2026-09-06")).toBe("04 - 06 Sep");
  });

  it("renders a cross-month range", () => {
    expect(formatDateRange("2026-10-30", "2026-11-01")).toBe("30 - 01 Nov");
  });
});

describe("formatDuration", () => {
  it("formats mm:ss media durations", () => {
    expect(formatDuration(478)).toBe("7:58");
    expect(formatDuration(60)).toBe("1:00");
    expect(formatDuration(5)).toBe("0:05");
  });
});
