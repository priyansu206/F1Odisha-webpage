import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { PILLARS, WHO_WE_ARE } from "@/lib/data/community";
import { SITE, SOCIALS } from "@/lib/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "About",
  "Odisha's first dedicated Formula 1 community — built by fans, for fans, from Bhubaneswar, Cuttack, Puri and beyond."
);

export default function AboutPage() {
  return (
    <>
      <section className="bg-off-white/80 backdrop-blur-lg text-carbon">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <Tag tone="live" live>
            {SITE.foundedLabel}
          </Tag>
          <h1 className="mt-5 font-sans text-4xl leading-[0.95] font-black uppercase tracking-tight md:text-6xl">
            {WHO_WE_ARE.title}
          </h1>
          <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-f1-red-bright">
            {SITE.city} · {SITE.region} · {SITE.tagline}
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="space-y-5">
              {WHO_WE_ARE.paragraphs.map((para) => (
                <p key={para.slice(0, 24)} className="leading-7 text-grey-700">
                  {para}
                </p>
              ))}
              <p className="border-l-4 border-f1-red pl-4 font-sans text-xl font-bold text-carbon">
                {WHO_WE_ARE.closing}
              </p>
            </div>

            <div className="h-fit border-2 border-carbon/10 bg-white/70 backdrop-blur-md p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
                Find us online
              </p>
              <ul className="mt-4 divide-y divide-grey-100">
                {SOCIALS.map((social) =>
                  social.href ? (
                    <li key={social.label} className="py-3">
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between font-bold text-carbon transition-colors hover:text-f1-red-bright"
                      >
                        {social.label}
                        <span aria-hidden className="text-f1-red">↗</span>
                      </Link>
                    </li>
                  ) : (
                    <li key={social.label} className="flex items-center justify-between py-3">
                      <span className="font-bold text-grey-500">{social.label}</span>
                      <span className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-grey-500">
                        Members only
                      </span>
                    </li>
                  )
                )}
              </ul>
              <p className="mt-4 border-t border-grey-100 pt-4 text-xs leading-5 text-grey-500">
                WhatsApp &amp; Discord open up after you join — the WhatsApp group
                carries race-day alerts, memes and event invites.
              </p>
              <div className="mt-5">
                <Button href="/membership" size="md" skew>
                  Join free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-carbon/80 backdrop-blur-lg text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
            What we&apos;re built on
          </p>
          <h2 className="mt-3 font-sans text-3xl font-black uppercase tracking-tight md:text-4xl">
            Four pillars, one grid
          </h2>
          <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <div key={pillar.number} className="bg-carbon-2/60 backdrop-blur-sm p-6">
                <p className="font-display text-3xl font-bold text-f1-red tabular">
                  {pillar.number}
                </p>
                <h3 className="mt-3 font-sans text-base font-bold uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-grey-300">{pillar.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
