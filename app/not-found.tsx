import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 py-24 text-center md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-f1-red-bright">
          DNF — Page Not Found
        </p>
        <h1 className="mt-4 font-sans text-8xl font-black tracking-tighter text-white md:text-9xl">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-grey-300">
          This lap got cut short. The page you&apos;re looking for isn&apos;t on
          the track — head back to the grid.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/" size="lg" skew>
            Back to the Grid
          </Button>
        </div>
        <p className="mt-8 text-xs text-grey-500">
          Not found · <Link href="/events" className="text-grey-300 underline underline-offset-4 hover:text-f1-red-bright">Browse events</Link>
        </p>
      </div>
    </section>
  );
}
