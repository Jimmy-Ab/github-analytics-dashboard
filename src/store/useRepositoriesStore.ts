// store/repositoriesStore.ts

import { create } from "zustand";

interface Repository {
  owner: string;
  stargazers_count: number;
  updated_at: string | number | Date;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  visibility: string;
  date: string;
}

interface RepositoriesState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  fetchRepositories: (username: string) => Promise<void>;
}

export const useRepositoriesStore = create<RepositoriesState>((set) => ({
  repositories: [],
  loading: false,
  error: null,
  fetchRepositories: async (username) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(
        `https://api.github.com/users/${username}/repos`
      );
      const data = await response.json();
      set({ repositories: data, loading: false });
    } catch {
      set({ loading: false, error: "Failed to fetch repositories" });
    }
  },
}));
