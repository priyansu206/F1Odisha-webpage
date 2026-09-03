import type { Metadata } from "next";
import Link from "next/link";

import { MagneticNested } from "@/components/MagneticNested";
import { MemberForm } from "@/components/membership/MemberForm";
import { Tag } from "@/components/ui/Tag";
import {
  MEMBERSHIP,
  MEMBERSHIP_BENEFITS,
} from "@/lib/data/membership";
import { SITE } from "@/lib/data/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "Membership",
  "Join F1 Odisha free — WhatsApp community, watch parties, karting days, fantasy league and your member badge."
);

export default function MembershipPage() {
  return (
    <>
      <section className="border-b-2 border-f1-red">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <Tag tone="live" live>
            {SITE.foundedLabel}
          </Tag>
          <h1 className="mt-5 font-sans text-4xl leading-[0.95] font-black uppercase tracking-tight md:text-6xl">
            {MEMBERSHIP.title}
          </h1>
          <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-f1-red-bright">
            {MEMBERSHIP.sub}
          </p>
          <p className="mt-5 max-w-2xl leading-7 text-grey-300">{MEMBERSHIP.intro}</p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1fr_26rem]">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
            What you get
          </p>
          <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
            {MEMBERSHIP_BENEFITS.map((benefit, i) => (
              <li
                key={benefit}
                className="flex items-center gap-4 px-2 py-4 transition-colors duration-150 hover:bg-carbon-2/60"
              >
                <span className="font-display text-lg font-bold text-f1-red tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-6 text-grey-300">{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-l-4 border-f1-red bg-carbon-2/60 backdrop-blur-md px-5 py-4">
            <p className="text-sm leading-6 text-grey-300">
              Your badge QR doubles as your entry pass to F1 Odisha events —{" "}
              <Link href="/events" className="font-bold text-white underline underline-offset-4 hover:text-f1-red-bright">
                relive the Season 2026 archives
              </Link>
              .
            </p>
          </div>
        </div>

        <div>
          <MemberForm />
          <div className="mt-8">
            <MagneticNested />
          </div>
        </div>
      </section>
    </>
  );
}
