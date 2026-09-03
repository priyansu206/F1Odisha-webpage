import Link from "next/link";

import { cn } from "@/lib/utils";

interface ModuleHeaderProps {
  kicker: string;
  title: string;
  actionHref?: string;
  actionLabel?: string;
  tone?: "dark" | "light";
  className?: string;
  id?: string;
}

export function ModuleHeader({
  kicker,
  title,
  actionHref,
  actionLabel = "View All",
  tone = "dark",
  className,
  id,
}: ModuleHeaderProps) {
  const onDark = tone === "dark";
  return (
    <div
      id={id}
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 pb-4",
        onDark ? "border-grey-300/30" : "border-carbon/15",
        className
      )}
    >
      <div>
        <p
          className={cn(
            "mb-2 text-xs font-bold uppercase tracking-[0.18em]",
            onDark ? "text-f1-red-bright" : "text-f1-red-dark"
          )}
        >
          {kicker}
        </p>
        <h2
          className={cn(
            "font-sans text-3xl font-black uppercase tracking-tight md:text-4xl",
            onDark ? "text-white" : "text-carbon"
          )}
        >
          {title}
        </h2>
      </div>
      {actionHref && (
        <Link
          href={actionHref}
          className={cn(
            "group inline-flex items-center gap-1.5 border-b-2 border-f1-red pb-0.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-150",
            onDark
              ? "text-white hover:text-f1-red-bright"
              : "text-carbon hover:text-f1-red-dark"
          )}
        >
          {actionLabel}
          <span
            aria-hidden
            className="text-f1-red transition-transform duration-150 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      )}
    </div>
  );
}
