import { ModuleHeader } from "@/components/ui/ModuleHeader";
import { Reveal } from "@/components/ui/Reveal";
import { PILLARS, WHO_WE_ARE } from "@/lib/data/community";

export function WhoWeAre() {
  return (
    <section className="bg-carbon/80 backdrop-blur-lg text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <Reveal variant="up">
          <ModuleHeader
            kicker={WHO_WE_ARE.kicker}
            title={WHO_WE_ARE.title}
            id="who-we-are"
          />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <Reveal variant="left" delay={0.1}>
            <div>
              {WHO_WE_ARE.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} className="mb-5 max-w-xl leading-7 text-grey-300">
                  {para}
                </p>
              ))}
              <p className="border-l-4 border-f1-red pl-4 font-sans text-lg font-bold text-white">
                {WHO_WE_ARE.closing}
              </p>
            </div>
          </Reveal>

          <Reveal variant="right" delay={0.15}>
            <ol className="grid gap-px bg-white/10">
              {PILLARS.map((pillar) => (
                <li
                  key={pillar.number}
                  className="group bg-carbon-2/60 backdrop-blur-sm px-5 py-5 transition-colors duration-150 hover:bg-carbon-3/70"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl font-bold text-f1-red tabular">
                      {pillar.number}
                    </span>
                    <h3 className="font-sans text-lg font-bold uppercase tracking-tight">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-2 pl-11 text-sm leading-6 text-grey-500 group-hover:text-grey-300">
                    {pillar.blurb}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
