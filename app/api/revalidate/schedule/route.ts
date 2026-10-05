import { revalidatePath } from "next/cache";
import { getLiveRaceCalendar } from "@/lib/data/schedule-sync";

/**
 * On-demand revalidation for the schedule.
 * - Called by Vercel Cron (vercel.json) or manually via POST with secret.
 * - GET also allowed for health check (returns live calendar length + first/last dates).
 *
 * Env: REVALIDATE_SECRET (optional). If set, ?secret= must match.
 */
export const dynamic = "force-dynamic";

function isAuthorized(req: Request): boolean {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return true; // no secret configured = open (safe for this public calendar)
  const url = new URL(req.url);
  return url.searchParams.get("secret") === secret;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) return new Response("Unauthorized", { status: 401 });
  try {
    const cal = await getLiveRaceCalendar();
    // Revalidate schedule page and home (which embeds teaser)
    revalidatePath("/schedule", "page");
    revalidatePath("/", "page");
    return Response.json({
      ok: true,
      rounds: cal.length,
      first: cal[0],
      last: cal[cal.length - 1],
      revalidated: ["/schedule", "/"],
    });
  } catch (e) {
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  return GET(req);
}
