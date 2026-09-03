import { TICKER_ITEMS } from "@/lib/data/site";
import { Tag } from "@/components/ui/Tag";

export function UtilityBar() {
  const loop = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      aria-label="Community news ticker"
      className="flex items-stretch overflow-hidden border-b border-white/10 bg-carbon/80 backdrop-blur-lg"
    >
      <div className="z-10 flex shrink-0 items-center gap-2 bg-f1-red px-3 py-1.5 md:px-4">
        <Tag tone="live" live>
          Live
        </Tag>
      </div>
      <div className="relative flex-1 overflow-hidden py-1.5">
        <ul className="ticker-track flex w-max items-center gap-0 will-change-transform">
          {loop.map((item, i) => (
            <li
              key={`${item}-${i}`}
              aria-hidden={i >= TICKER_ITEMS.length}
              className="flex shrink-0 items-center gap-6 pr-6 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-grey-300 whitespace-nowrap md:text-xs"
            >
              {item}
              <span aria-hidden className="text-f1-red">
                ◆
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
