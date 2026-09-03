"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  variant?: "up" | "fade" | "left" | "right" | "mask-up";
  as?: React.ElementType;
  className?: string;
  stagger?: boolean;
  delay?: number;
  scrub?: boolean;
}

const FROM: Record<
  Exclude<RevealProps["variant"], undefined>,
  { y?: number; x?: number; opacity?: number }
> = {
  up: { y: 40, opacity: 0 },
  fade: { opacity: 0 },
  left: { x: -60, opacity: 0 },
  right: { x: 60, opacity: 0 },
  "mask-up": { y: 40, opacity: 0 },
};

export function Reveal({
  children,
  variant = "up",
  as: Tag = "div",
  className,
  stagger = false,
  delay = 0,
  scrub = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context;
    if (stagger) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          Array.from(el.children),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1,
            stagger: 0.12,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              scrub,
            },
          }
        );
      });
    } else {
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          FROM[variant],
          {
            y: 0,
            x: 0,
            opacity: 1,
            ease: "power3.out",
            duration: 1,
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              scrub,
            },
          }
        );
      });
    }

    return () => ctx.revert();
  }, [variant, stagger, delay, scrub]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export default Reveal;
