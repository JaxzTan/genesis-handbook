import { HomeScroller } from "@/components/home/home-scroller";
import { getContributorStats } from "@/actions/contributors";

// Regenerate the page hourly so new GitHub contributors appear on the wall
// without re-fetching on every request (and staying within GitHub rate limits).
export const revalidate = 3600;

// Server Component: fetch live contributor data close to the source, then hand
// it to the client scroller that owns the scroll/observer interactivity.
export default async function HomePage() {
  const { stats, contributors } = await getContributorStats();

  return <HomeScroller stats={stats} contributors={contributors} />;
}
