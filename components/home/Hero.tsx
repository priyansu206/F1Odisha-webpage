"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import GhostFibers from "@/components/ui/GhostFibers";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { StatsBand } from "@/components/home/StatsBand";
import { SITE } from "@/lib/data/site";

export function Hero() {
  const copyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        Array.from(el.children),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          duration: 1,
          stagger: 0.14,
          delay: 0.2,
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden border-b-2 border-f1-red">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <GhostFibers
          lineColor="#1a0909"
          glowColor="#a03434"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(21,21,30,0.7) 0%, rgba(21,21,30,0.35) 40%, transparent 70%)",
        }}
      />

      <div
        ref={copyRef}
        className="relative z-20 mx-auto flex min-h-[92svh] w-full max-w-7xl flex-col items-start justify-center px-4 py-24 md:px-6"
      >
        <Tag tone="live" live>
          {SITE.foundedLabel}
        </Tag>

        <h1 className="mt-6 max-w-5xl font-sans text-5xl leading-[0.95] font-black uppercase tracking-tight md:text-7xl lg:text-8xl">
          Born in the{" "}
          <span className="inline-block bg-f1-red px-3 skew-accent-rev">
            <span className="inline-block skew-accent">Temple City</span>
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-grey-300 md:text-lg">
          Odisha&apos;s fastest-growing Formula 1 fan community. Watch parties,
          sim racing, karting events — and a family that bleeds motorsport.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/membership" size="lg" skew>
            Join the Community
          </Button>
          <Button href="/about" variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>

      <StatsBand />
    </section>
  );
}
