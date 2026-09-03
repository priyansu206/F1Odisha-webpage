"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/Button";
import {
  getNextRaceWeekend,
  raceStartUTC,
} from "@/lib/data/schedule";
import { countdownParts } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

function useNow(): number | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

const CELLS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "mins", label: "Mins" },
  { key: "secs", label: "Secs" },
] as const;

/** Client-side ticking so a statically built page stays correct until the
 *  season ends, when the module flips to "season complete". */
export function NextRaceCountdown() {
  const now = useNow();
  const headerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 0.9,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  const weekend = now !== null ? getNextRaceWeekend(new Date(now)) : null;
  const target = weekend ? raceStartUTC(weekend) : null;
  const left = target && now !== null ? countdownParts(target, now) : null;
  const seasonOver = now !== null && weekend === null;

  return (
    <section id="race-weekends" className="relative overflow-hidden border-y border-white/10 bg-carbon-2/70 backdrop-blur-lg">
      <div ref={headerRef} className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
          Race Weekend Schedule
        </p>

        {seasonOver ? (
          <p className="mt-4 font-sans text-2xl font-black uppercase text-white md:text-4xl">
            Season Complete — See You in 2027
          </p>
        ) : (
          <>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {weekend && (
                <span className="skew-accent-rev inline-block bg-f1-red px-3 py-1.5">
                  <span className="skew-accent font-display text-lg font-bold uppercase tracking-wide text-white md:text-2xl">
                    Round {weekend.round}
                  </span>
                </span>
              )}
              <h2 className="font-sans text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
                {weekend?.country}
              </h2>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-grey-500">
              <span>{weekend?.grandPrix}</span>
              <span className="text-f1-red">/</span>
              <span className="font-display font-semibold tabular text-off-white">
                ⏱ Race start {weekend?.raceStartIST} IST
              </span>
            </p>

            {/* Digits are decorative ticking values — hidden from AT to avoid
                per-second announcements; the h2/status line carries meaning. */}
            <div
              aria-hidden="true"
              className="mt-8 max-w-3xl border border-white/10"
            >
              {/* Checkered top edge — F1 start-line strip */}
              <div className="checker-strip h-2 w-full opacity-80" />

              <div className="grid grid-cols-4 gap-px bg-white/10">
                {CELLS.map((cell) => (
                  <div
                    key={cell.key}
                    className="relative bg-carbon-2/80 px-2 py-5 text-center md:py-7"
                  >
                    <span className="font-display text-4xl font-bold text-f1-red tabular md:text-6xl">
                      {left ? pad(left[cell.key]) : "00"}
                    </span>
                    <span className="mt-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-grey-500 md:text-xs">
                      {cell.label}
                    </span>
                    {/* Red corner tick on the last cell (F1 flag-mark detail) */}
                    {cell.key === "secs" && (
                      <span className="absolute bottom-0 right-0 h-1 w-6 bg-f1-red" />
                    )}
                  </div>
                ))}
              </div>
              {/* Bottom red bar */}
              <div className="h-0.5 w-full bg-f1-red" />
            </div>

            {/* F1 start-lights rack */}
            <div className="mt-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="flex items-end gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={
                        left === null
                          ? "inline-block h-3 w-3 bg-f1-red"
                          : "animate-live-pulse inline-block h-3 w-3 bg-f1-red"
                      }
                    />
                  ))}
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-off-white">
                  {left === null ? "Lights out — race underway 🏁" : "Countdown to race start · IST"}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="mt-8">
          <Button href="/schedule" variant="outline" size="md">
            Full 2026 Schedule
          </Button>
        </div>
      </div>
    </section>
  );
}
