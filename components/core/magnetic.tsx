"use client";

import { useRef, type ReactNode, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type ActionArea = "global" | "parent";
type SpringOptions = Record<string, unknown>;

interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  springOptions?: SpringOptions;
  actionArea?: ActionArea;
  range?: number;
  className?: string;
}

export function Magnetic({
  children,
  intensity = 0.3,
  springOptions = { bounce: 0 },
  actionArea = "global",
  range = 100,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const area =
        actionArea === "parent" && el.parentElement
          ? (el.parentElement.getBoundingClientRect() as DOMRect)
          : null;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      if (area) {
        if (
          event.clientX < area.left ||
          event.clientX > area.right ||
          event.clientY < area.top ||
          event.clientY > area.bottom
        ) {
          x.set(0);
          y.set(0);
          return;
        }
      }

      const relX = event.clientX - centerX;
      const relY = event.clientY - centerY;
      const distance = Math.hypot(relX, relY);

      if (distance <= range) {
        const strength = 1 - distance / range;
        x.set(relX * intensity * strength);
        y.set(relY * intensity * strength);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [actionArea, intensity, range, x, y]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export default Magnetic;
