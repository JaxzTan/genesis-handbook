import { syncContributorsFromGitHub } from "@/actions/sync-contributors";

// Scheduled GitHub → DB contributor sync. Invoked hourly by Vercel Cron (see
// vercel.json). Vercel sends `Authorization: Bearer <CRON_SECRET>` when the
// CRON_SECRET env var is set; we reject anything else so the endpoint can't be
// triggered by random traffic.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const synced = await syncContributorsFromGitHub();
    return Response.json({ ok: true, synced });
  } catch (error) {
    console.error("[cron] contributor sync failed:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
