import { cn } from "@/lib/utils";

type TagTone = "live" | "neutral" | "success" | "warning" | "dark";

const toneClasses: Record<TagTone, string> = {
  live: "bg-f1-red text-white",
  neutral: "bg-white/10 text-grey-300",
  success: "bg-success text-white",
  warning: "bg-warning text-carbon",
  dark: "bg-carbon text-white",
};

interface TagProps {
  children: React.ReactNode;
  tone?: TagTone;
  className?: string;
  live?: boolean;
}

export function Tag({ children, tone = "neutral", className, live = false }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em]",
        toneClasses[tone],
        className
      )}
    >
      {live && (
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 bg-white animate-live-pulse"
        />
      )}
      {children}
    </span>
  );
}
