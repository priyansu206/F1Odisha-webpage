"use client";

import { motion } from "motion/react";
import { RACE_CALENDAR } from "@/lib/data/schedule";
import { formatISTDay } from "@/lib/utils";

export function RaceMobileList() {
  return (
    <div className="border-y border-white/10">
      {RACE_CALENDAR.map((weekend, i) => (
        <motion.div
          key={`${weekend.round}-${weekend.country}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: (i % 6) * 0.04 }}
          className={`flex items-center justify-between gap-3 px-1 py-3.5 ${
            i > 0 ? "border-t border-white/10" : ""
          }`}
        >
          <span className="flex shrink-0 items-baseline gap-2">
            <span className="font-display text-xs font-bold text-f1-red-bright tabular">
              R{String(weekend.round).padStart(2, "0")}
            </span>
            <span className="text-sm font-bold uppercase tracking-tight text-white">
              {weekend.country}
            </span>
          </span>
          <span className="shrink-0 text-[0.7rem] font-semibold text-grey-300 tabular">
            {formatISTDay(weekend.startISO)}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
