import Link from "next/link";

import { NAV_ITEMS, SITE, SOCIALS, UTILITY_CTA } from "@/lib/data/site";
import { Magnetic } from "@/components/core/magnetic";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-carbon/80 backdrop-blur-lg">
      <div aria-hidden className="checker-strip h-1.5 opacity-60" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-sans text-xl font-black tracking-tight uppercase">
            <span className="bg-f1-red px-1.5 py-0.5 text-white">F1</span>{" "}
            <span>ODISHA</span>
          </p>
          <p className="mt-1 text-[0.6rem] font-bold tracking-[0.24em] text-f1-red-bright uppercase">
            {SITE.foundedLabel}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-grey-300">
            {SITE.name}, {SITE.city} · {SITE.tagline}. The Konark Chakra turns at
            18,000 RPM in our hearts.
          </p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-grey-500">
            {SITE.region}&apos;s first dedicated F1 community — built by fans, for
            fans.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
            Explore
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Magnetic intensity={0.2} actionArea="parent" range={90}>
                  <Link
                    href={item.href}
                    className="inline-block text-sm text-white transition-colors hover:text-f1-red-bright"
                  >
                    {item.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
            <li>
              <Magnetic intensity={0.2} actionArea="parent" range={90}>
                <Link
                  href={UTILITY_CTA.href}
                  className="inline-block text-sm text-white transition-colors hover:text-f1-red-bright"
                >
                  {UTILITY_CTA.label}
                </Link>
              </Magnetic>
            </li>
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-grey-500">
            Community
          </p>
          <ul className="mt-4 space-y-2.5">
            {SOCIALS.map((social) =>
              social.href ? (
                <li key={social.label}>
                  <Magnetic intensity={0.2} actionArea="parent" range={90}>
                    <Link
                      href={social.href}
                      className="inline-block text-sm text-white transition-colors hover:text-f1-red-bright"
                    >
                      {social.label} ↗
                    </Link>
                  </Magnetic>
                </li>
              ) : (
                <li key={social.label} className="flex items-baseline gap-2">
                  <span
                    title={`${social.label}: ${social.note}`}
                    className="cursor-not-allowed text-sm text-grey-500"
                  >
                    {social.label}
                  </span>
                  <span className="text-[0.55rem] font-bold tracking-[0.16em] text-grey-500/70 uppercase">
                    {social.note}
                  </span>
                </li>
              )
            )}
          </ul>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 md:px-6">
          <p className="text-[0.65rem] tracking-wide text-grey-500">
            © {new Date().getFullYear()} {SITE.name} · {SITE.tagline}
          </p>
          <p className="text-[0.65rem] tracking-wide text-grey-500">
            Unofficial fan community · Not affiliated with Formula 1 or Red Bull
            Racing
          </p>
        </div>
      </div>
    </footer>
  );
}
