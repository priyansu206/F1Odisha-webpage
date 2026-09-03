import { ModuleHeader } from "@/components/ui/ModuleHeader";

interface RouteStubProps {
  kicker: string;
  title: string;
  batch: string;
}

export function RouteStub({ kicker, title, batch }: RouteStubProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <ModuleHeader kicker={kicker} title={title} />
      <div className="mt-10 border-2 border-dashed border-grey-300/30 bg-carbon-2 px-6 py-14 text-center">
        <p className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-f1-red">
          {batch}
        </p>
        <p className="mt-3 text-lg text-grey-300">
          Static UI for this route ships in {batch}. Global chrome is live.
        </p>
      </div>
    </section>
  );
}
