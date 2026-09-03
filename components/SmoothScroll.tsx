"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";

declare global {
  var __lenis: Lenis | undefined;
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    globalThis.__lenis = lenis;

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (event: Event) => {
      const anchor = (event.target as HTMLElement)?.closest?.('a[href^="#"]');
      const href = anchor?.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, {
        offset: -80,
        duration: 1.2,
      });
    };
    document.addEventListener("click", onAnchor);

    return () => {
      gsap.ticker.remove(update);
      document.removeEventListener("click", onAnchor);
      lenis.destroy();
      delete globalThis.__lenis;
    };
  }, []);

  return null;
}
