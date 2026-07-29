import { HomeScroller } from "@/components/home/home-scroller";
import { SiteNav } from "@/components/site-nav";
import { getContributorStats } from "@/actions/contributors";

const NAV_SECTIONS = [
  { href: "#s2", label: "Problem" },
  { href: "#s3", label: "About" },
  { href: "#s4", label: "Live" },
  { href: "#s5", label: "Process" },
  { href: "#s9", label: "Building" },
  { href: "#s10", label: "Roadmap" },
  { href: "#s12", label: "Join" },
];

// Regenerate the page hourly so new GitHub contributors appear on the wall
// without re-fetching on every request (and staying within GitHub rate limits).
export const revalidate = 3600;

// Server Component: fetch live contributor data close to the source, then hand
// it to the client scroller that owns the scroll/observer interactivity.
export default async function HomePage() {
  const { stats, contributors } = await getContributorStats();

  return (
    <>
      <SiteNav
        variant="dark"
        active="home"
        menu={{ label: "On this page", items: NAV_SECTIONS }}
      />
      <HomeScroller stats={stats} contributors={contributors} />
    </>
  );
}
