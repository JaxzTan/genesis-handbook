// A single contributor shown on the wall (slide S4).
export type Contributor = {
  id: string;
  name: string;
  avatarUrl: string | null;
  profileUrl: string | null;
  // Number of commits (from GitHub). Optional so other sources can omit it.
  contributions?: number;
};

// Aggregate stats rendered on the live counter / contributor wall.
export type HandbookStats = {
  contributions: number;
  contributors: number;
  topics: number;
  capacity: number;
};
