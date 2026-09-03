import type { MemberProfile } from "@/lib/validation";

interface BadgePreviewProps {
  profile: MemberProfile;
  memberId: string;
}

/** Deterministic pseudo-random QR-style grid seeded by the member ID. */
function QrMock({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h;
  };
  const size = 21;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i += 1) cells.push(rand() % 2 === 0);
  const cellPx = 5;

  const inFinder = (x: number, y: number) => {
    const fx = (x < 7 && y < 7) || (x >= size - 7 && y < 7) || (x < 7 && y >= size - 7);
    if (!fx) return null;
    return true;
  };

  return (
    <svg
      width={size * cellPx}
      height={size * cellPx}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="Member QR code (preview)"
      className="h-24 w-24 bg-white p-1"
    >
      {cells.map((on, i) => {
        const x = i % size;
        const y = Math.floor(i / size);
        const inFinderCell = inFinder(x, y);
        const filled = inFinderCell !== null ? (x === 0 || x === 6 || y === 0 || y === 6) : on;
        if (!filled) return null;
        return <rect key={i} x={x} y={y} width={1} height={1} fill="#15151e" />;
      })}
    </svg>
  );
}

/** Static badge mock — watermarked, carries no real credentials. */
export function BadgePreview({ profile, memberId }: BadgePreviewProps) {
  return (
    <div className="relative overflow-hidden border-2 border-white/80 bg-carbon/80 backdrop-blur-md text-white">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] border-2 border-f1-red/70 px-3 py-1 text-xs font-black tracking-[0.3em] text-f1-red/70 uppercase"
      >
        Preview
      </span>

      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <p className="font-sans text-sm font-black uppercase tracking-tight">
          <span className="bg-f1-red px-1 py-0.5">F1</span> ODISHA
        </p>
        <p className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-grey-500">
          Member — Season 2026
        </p>
      </div>

      <div className="flex items-center gap-5 px-5 py-6">
        <div>
          <p className="font-sans text-2xl leading-none font-black uppercase">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="mt-1 text-xs font-semibold text-f1-red-bright">{memberId}</p>
          <dl className="mt-4 space-y-1 text-[0.7rem]">
            <div className="flex gap-2">
              <dt className="font-bold tracking-wider text-grey-500 uppercase">Team</dt>
              <dd className="text-white">{profile.favouriteTeam}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="font-bold tracking-wider text-grey-500 uppercase">Driver</dt>
              <dd className="text-white">{profile.favouriteDriver}</dd>
            </div>
          </dl>
        </div>
        <div className="ml-auto">
          <QrMock seed={memberId} />
        </div>
      </div>

      <div className="border-t border-white/10 bg-carbon-2/60 backdrop-blur-sm px-5 py-2.5">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-grey-500">
          Badge QR = entry pass for all F1 Odisha events
        </p>
      </div>
    </div>
  );
}
