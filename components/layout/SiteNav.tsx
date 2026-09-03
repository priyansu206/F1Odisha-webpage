"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV_ITEMS, UTILITY_CTA } from "@/lib/data/site";
import { Magnetic } from "@/components/core/magnetic";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string, match?: string[]): boolean {
  if (match)
    return match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
  return pathname === href;
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-carbon/70 backdrop-blur-xl">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 md:px-6"
      >
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-1 font-sans text-lg font-black tracking-tight uppercase"
        >
          <span className="bg-f1-red px-1.5 py-0.5 text-white skew-accent-rev">
            <span className="inline-block skew-accent">F1</span>
          </span>
          <span className="text-white">ODISHA</span>
          <span className="ml-2 hidden text-[0.55rem] font-bold tracking-[0.2em] text-grey-500 uppercase lg:inline">
            Temple City → Grid
          </span>
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href, item.match);
            return (
              <li key={item.href}>
                <Magnetic intensity={0.2} actionArea="parent" range={90}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative py-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-150",
                      "after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-f1-red",
                      active
                        ? "text-white after:opacity-100"
                        : "text-grey-300 after:opacity-0 hover:text-white hover:after:opacity-100"
                    )}
                  >
                    {item.label}
                  </Link>
                </Magnetic>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Magnetic intensity={0.2} actionArea="parent" range={90}>
            <Link
              href={UTILITY_CTA.href}
              className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-grey-300 transition-colors hover:text-f1-red-bright"
            >
              {UTILITY_CTA.label}
            </Link>
          </Magnetic>
          <Magnetic intensity={0.25} actionArea="parent" range={110}>
            <Link
              href="/membership"
              className="bg-f1-red px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors duration-150 hover:bg-f1-red-dark"
            >
              Join the Grid
            </Link>
          </Magnetic>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/20 text-white md:hidden"
        >
          <span
            className={cn(
              "h-0.5 w-5 bg-current transition-transform duration-150",
              open && "translate-y-1 rotate-45"
            )}
          />
          <span
            className={cn(
              "h-0.5 w-5 bg-current transition-transform duration-150",
              open && "-translate-y-1 -rotate-45"
            )}
          />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav"
          className="absolute top-full right-0 left-0 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-white/10 bg-carbon/80 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col px-6 py-4">
            {NAV_ITEMS.map((item) => {
              const active = isActive(pathname, item.href, item.match);
              return (
                <li key={item.href} className="border-b border-white/10 last:border-0">
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between py-4 font-sans text-lg font-bold uppercase tracking-[0.12em] transition-colors",
                      active ? "text-f1-red-bright" : "text-white"
                    )}
                  >
                    {item.label}
                    <span aria-hidden className="text-f1-red">
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
            <li className="mt-4 flex flex-col gap-3 pb-6">
              <Magnetic intensity={0.2} actionArea="parent" range={120}>
                <Link
                  href="/membership"
                  onClick={close}
                  className="block bg-f1-red px-5 py-3.5 text-center text-sm font-bold uppercase tracking-[0.14em] text-white"
                >
                  Join the Grid
                </Link>
              </Magnetic>
              <Magnetic intensity={0.2} actionArea="parent" range={120}>
                <Link
                  href={UTILITY_CTA.href}
                  onClick={close}
                  className="block border border-white/40 px-5 py-3.5 text-center text-sm font-bold uppercase tracking-[0.14em] text-white"
                >
                  {UTILITY_CTA.label}
                </Link>
              </Magnetic>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
