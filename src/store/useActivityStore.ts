import { create } from "zustand";

type ActivityType = "commit" | "pr" | "issue" | "release" | "fork" | "star";

interface Activity {
  type: ActivityType;
  repoName: string;
  timeAgo: string;
  commitsCount?: number;
}

interface ActivityStore {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  fetchActivities: (username: string) => Promise<void>;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  loading: false,
  error: null,

  fetchActivities: async (username) => {
    if (!username) return;

    set({ loading: true, error: null });

    try {
      const response = await fetch(`https://api.github.com/users/${username}/events`);
      if (!response.ok) throw new Error("Failed to fetch user activities");

      const data = await response.json();

      // Transform API response to match UI activity types
      const transformedActivities: Activity[] = data.map((event: any) => ({
        type: mapGitHubEventToActivityType(event.type),
        repoName: event.repo.name,
        timeAgo: new Date(event.created_at).toLocaleString(),
        commitsCount: event.payload.commits?.length || undefined,
      }));

      set({ activities: transformedActivities, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));

// Map GitHub event types to match UI filter tabs
const mapGitHubEventToActivityType = (eventType: string): ActivityType => {
  const eventMap: Record<string, ActivityType> = {
    PushEvent: "commit",
    PullRequestEvent: "pr",
    IssuesEvent: "issue",
    ReleaseEvent: "release",
    ForkEvent: "fork",
    WatchEvent: "star",
  };

  return eventMap[eventType] || "commit"; // Default to "commit" if unknown
};
