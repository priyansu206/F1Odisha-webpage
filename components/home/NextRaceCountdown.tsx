"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/Button";
import {
  getNextRaceWeekend,
  raceStartUTC,
} from "@/lib/data/schedule";
import { cn, countdownParts } from "@/lib/utils";

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
          Race Weekend Schedule (IST)
        </p>

        {seasonOver ? (
          <p className="mt-4 font-sans text-2xl font-black uppercase text-white md:text-4xl">
            Season Complete — See You in 2027
          </p>
        ) : (
          <>
            <h2 className="mt-3 font-sans text-2xl font-black uppercase tracking-tight text-white md:text-4xl">
              {weekend && (
                <>
                  Round {weekend.round} — {weekend.country}
                </>
              )}
            </h2>
            <p className="mt-1 text-sm text-grey-500">
              {weekend?.grandPrix} · Race start {weekend?.raceStartIST} IST
            </p>

            {/* Digits are decorative ticking values — hidden from AT to avoid
                per-second announcements; the h2/status line carries meaning. */}
            <div
              aria-hidden="true"
              className="mt-8 grid max-w-3xl grid-cols-4 gap-px bg-white/10"
            >
              {CELLS.map((cell) => (
                <div key={cell.key} className="bg-carbon-2/60 backdrop-blur-sm px-2 py-5 text-center md:py-7">
                  <span className="font-display text-4xl font-bold text-f1-red tabular md:text-6xl">
                    {left ? pad(left[cell.key]) : "00"}
                  </span>
                  <span className="mt-2 block text-[0.6rem] font-bold uppercase tracking-[0.2em] text-grey-500 md:text-xs">
                    {cell.label}
                  </span>
                </div>
              ))}
            </div>

            <p
              className={cn(
                "mt-3 text-xs tracking-wide text-grey-500 uppercase",
                left === null && "text-f1-red-bright"
              )}
            >
              {left === null
                ? "Lights out — race underway"
                : "Countdown to race start · IST"}
            </p>
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
