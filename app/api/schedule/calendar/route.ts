import { getLiveRaceCalendar } from "@/lib/data/schedule-sync";

export const revalidate = 3600; // 1h

export async function GET() {
  const cal = await getLiveRaceCalendar();
  return Response.json(cal, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
