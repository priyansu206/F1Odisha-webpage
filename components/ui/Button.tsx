import Link from "next/link";

import { Magnetic } from "@/components/core/magnetic";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-wider select-none transition-colors duration-150 ease-out";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-f1-red text-white hover:bg-f1-red-dark active:bg-f1-red-dark",
  outline:
    "border border-white/70 text-white hover:bg-white hover:text-carbon active:bg-grey-100",
  ghost: "text-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm md:text-base",
};

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  skew?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  magnetic?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  skew = false,
  className,
  ariaLabel,
  onClick,
  magnetic = true,
}: ButtonProps) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);

  let content: React.ReactNode;

  if (skew) {
    const inner = <span className="inline-block skew-accent-rev">{children}</span>;
    const label = <span className="flex items-center gap-2">{inner}</span>;
    const innerClasses = cn(classes, "skew-accent");
    content = href ? (
      <Link href={href} aria-label={ariaLabel} onClick={onClick} className={innerClasses}>
        {label}
      </Link>
    ) : (
      <button aria-label={ariaLabel} onClick={onClick} className={innerClasses}>
        {label}
      </button>
    );
  } else if (href) {
    content = (
      <Link href={href} aria-label={ariaLabel} onClick={onClick} className={classes}>
        {children}
      </Link>
    );
  } else {
    content = (
      <button aria-label={ariaLabel} onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  if (!magnetic) return content;

  return (
    <Magnetic intensity={0.3} actionArea="parent" range={150}>
      {content}
    </Magnetic>
  );
}
