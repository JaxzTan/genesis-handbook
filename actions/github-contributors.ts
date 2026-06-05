import "server-only";
import {
  CONTRIBUTOR_CAPACITY,
  GITHUB_OWNER,
  GITHUB_REPO,
} from "@/constants/site";
import type { Contributor, HandbookStats } from "@/types";

// Shape of the GitHub "list repository contributors" response item.
// https://docs.github.com/rest/repos/repos#list-repository-contributors
type GitHubContributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
};

const CONTRIBUTORS_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors?per_page=100`;

// Build the aggregate stats shown on the live counter + wall (slide S4) from a
// contributor list. Shared by the live GitHub path and the DB-backed reader.
// `topics` stays 0 until a topic source exists.
export function buildStats(contributors: Contributor[]): HandbookStats {
  return {
    contributors: contributors.length,
    contributions: contributors.reduce(
      (sum, c) => sum + (c.contributions ?? 0),
      0
    ),
    topics: 0,
    // Grow the grid past the goal if we ever exceed it.
    capacity: Math.max(CONTRIBUTOR_CAPACITY, contributors.length),
  };
}

// Fetch real repo contributors from GitHub. Cached for an hour (well within the
// 60 req/hr unauthenticated limit) and degrades to an empty list on any error
// so the landing page always renders. Used by both the live wall fallback and
// the scheduled DB sync.
export async function fetchGitHubContributors(): Promise<Contributor[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch(CONTRIBUTORS_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        // GitHub asks every request to identify itself with a User-Agent.
        "User-Agent": "genesis-handbook",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Handled, non-fatal: the wall just renders empty. Use warn (not error)
      // so Next's dev overlay doesn't block the page on a recoverable miss.
      console.warn(
        `[github] contributors fetch failed: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const data = (await res.json()) as GitHubContributor[];

    return data
      .filter((c) => c.type !== "Bot" && !c.login.endsWith("[bot]"))
      .map((c) => ({
        id: String(c.id),
        name: c.login,
        avatarUrl: c.avatar_url,
        profileUrl: c.html_url,
        contributions: c.contributions,
      }));
  } catch (error) {
    console.warn("[github] failed to load contributors:", error);
    return [];
  }
}

// Live stats straight from GitHub (no DB). Used as the fallback when the DB is
// empty or unreachable.
export async function getLiveContributorStats(): Promise<{
  stats: HandbookStats;
  contributors: Contributor[];
}> {
  const contributors = await fetchGitHubContributors();
  return { stats: buildStats(contributors), contributors };
}
