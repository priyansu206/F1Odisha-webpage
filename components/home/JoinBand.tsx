import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { MEMBERSHIP_BENEFITS } from "@/lib/data/membership";

export function JoinBand() {
  return (
    <section className="relative overflow-hidden bg-f1-red text-white">
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/3 -skew-x-12 bg-carbon/15"
      />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-4 py-12 md:flex-row md:items-center md:px-6 md:py-14">
        <Reveal variant="left">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">
              Join the Community
            </p>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase tracking-tight md:text-5xl">
              Get on the Grid
            </h2>
            <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-white/80">
              It&apos;s free. It&apos;s fast. It&apos;s yours.
            </p>
          </div>
        </Reveal>

        <Reveal variant="right" delay={0.1}>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm font-semibold sm:grid-cols-2">
            {MEMBERSHIP_BENEFITS.slice(0, 4).map((point) => (
              <li key={point} className="flex items-center gap-2">
                <span aria-hidden className="font-black">›</span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal variant="up" delay={0.2}>
          <Button href="/membership" variant="outline" size="lg" skew className="border-white text-white hover:bg-white hover:text-f1-red-dark">
            Join the Community
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
