import type { Metadata } from "next";
import Link from "next/link";

import { BadgeRegenForm } from "@/components/membership/BadgeRegenForm";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "My Docs",
  "Re-generate your F1 Odisha membership badge instantly with your Member ID."
);

export default function DocsPage() {
  return (
    <>
      <section className="border-b-2 border-f1-red">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
            Lost your documents?
          </p>
          <h1 className="mt-4 font-sans text-4xl leading-[0.95] font-black uppercase tracking-tight md:text-6xl">
            Re-generate your docs
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-grey-300">
            Already registered? Re-generate your membership badge instantly here
            using your Member ID. The QR code on the badge works as your entry pass
            for all F1 Odisha events.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[26rem_1fr]">
        <div>
          <BadgeRegenForm />
        </div>

        <aside className="flex flex-col gap-6">
          <div className="border border-white/10 bg-carbon-2/60 backdrop-blur-md px-6 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
              Forgot your Member ID?
            </p>
            <p className="mt-3 text-sm leading-6 text-grey-300">
              Your Member ID was issued when you registered for Season 2026 — check
              the WhatsApp community or your original welcome message. In Phase B
              you&apos;ll be able to look it up with your registered details.
            </p>
            <div className="mt-4">
              <Button href="/membership" variant="outline" size="sm">
                New here? Join the grid
              </Button>
            </div>
          </div>

          <div className="border border-white/10 bg-carbon-2/60 backdrop-blur-md px-6 py-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-f1-red-bright">
              Your QR = your entry
            </p>
            <p className="mt-3 text-sm leading-6 text-grey-300">
              Show your badge QR at every F1 Odisha event —{" "}
              <Link href="/events/red-bull-f1-car-display" className="text-white underline underline-offset-4 hover:text-f1-red-bright">
                members accessed the Red Bull F1 car display zone
              </Link>{" "}
              exactly this way.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
