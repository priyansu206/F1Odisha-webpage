import { Tag } from "@/components/ui/Tag";
import type { WaveSlot } from "@/lib/types";

interface SlotTimelineProps {
  waves: WaveSlot[];
  capacity?: number;
  totalClaimed?: number;
}

const STATUS_META: Record<WaveSlot["status"], { label: string; tone: "success" | "warning" | "neutral" }> = {
  closed: { label: "Closed", tone: "neutral" },
  "sold-out": { label: "Sold Out ✓", tone: "success" },
  open: { label: "Open", tone: "warning" },
};

export function SlotTimeline({ waves, capacity, totalClaimed }: SlotTimelineProps) {
  const claimed = totalClaimed ?? waves.reduce((sum, w) => sum + w.slots, 0);

  return (
    <div className="border border-white/10 bg-carbon/80 backdrop-blur-md">
      <div className="border-b border-white/10 bg-carbon-2/60 backdrop-blur-sm px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
          Slot Timeline
        </p>
        <p className="mt-1 font-sans text-lg font-black uppercase text-white">
          All waves sold out {capacity ? `· ${capacity}+ members` : ""}
        </p>
      </div>

      {capacity && (
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-grey-500">
            <span>Total capacity</span>
            <span className="tabular text-white">{claimed} / {capacity}+</span>
          </div>
          <div className="mt-2 h-2 w-full bg-white/10">
            <div
              className="h-full w-full bg-f1-red"
              style={{ width: `${Math.min(100, (claimed / capacity) * 100)}%` }}
            />
          </div>
        </div>
      )}

      <ol className="divide-y divide-white/10">
        {waves.map((wave, i) => {
          const meta = STATUS_META[wave.status];
          return (
            <li key={wave.name} className="flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-4">
              <span className="font-display text-xl font-bold text-grey-500 tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-24 font-sans text-sm font-bold uppercase tracking-wide text-white">
                {wave.name}
              </span>
              <span className="flex-1 text-xs text-grey-500 tabular">
                {wave.slots} slots · opened {wave.openedIST}
              </span>
              <Tag tone={meta.tone}>{meta.label}</Tag>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
