
import { create } from "zustand";

interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface Repository {
  name: string;
  stargazers_count: number;
  html_url: string;
  description: string;
  language: string;
}

interface GitHubStore {
  username: string;
  user: GitHubUser | null;
  topRepos: Repository[];
  loading: boolean;
  error: string | null;
  setUsername: (username: string) => void;
  fetchUserData: () => Promise<void>;
}

export const useGitHubStore = create<GitHubStore>((set, get) => ({
  username: "",
  user: null,
  topRepos: [],
  loading: false,
  error: null,

  setUsername: (username) => set({ username }),

  fetchUserData: async () => {
    const { username } = get();
    if (!username) return;

    set({ loading: true, error: null });

    try {
      const [userResponse, reposResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`), // Fetch more for sorting
      ]);

      if (!userResponse.ok) throw new Error("User not found");
      if (!reposResponse.ok) throw new Error("Repositories not found");

      const userData: GitHubUser = await userResponse.json();
      let reposData: Repository[] = await reposResponse.json();

      // Sort repos by stargazers_count (descending) and pick the top 3
    //   reposData = reposData
    //     .sort((a, b) => b.stargazers_count - a.stargazers_count)
    //     .slice(0, 3);

      set({ user: userData, topRepos: reposData, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
