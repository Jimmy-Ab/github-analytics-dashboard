import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark";
export type Layout = "compact" | "comfortable";

interface SettingsState {
  theme: Theme;
  layout: Layout;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: string;
  showPrivateRepos: boolean;
  defaultSorting: string;
  setTheme: (theme: Theme) => void;
  setLayout: (layout: Layout) => void;
  updateSettings: (updates: Partial<Omit<SettingsState, "setTheme" | "setLayout" | "updateSettings" | "resetSettings">>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: "light",
      layout: "comfortable",
      notifications: true,
      autoRefresh: true,
      refreshInterval: "30",
      showPrivateRepos: true,
      defaultSorting: "stars",
      setTheme: (theme) => set({ theme }),
      setLayout: (layout) => set({ layout }),
      updateSettings: (updates) => set((state) => ({ ...state, ...updates })),
      resetSettings: () =>
        set({
          theme: "light",
          layout: "comfortable",
          notifications: true,
          autoRefresh: true,
          refreshInterval: "30",
          showPrivateRepos: true,
          defaultSorting: "stars",
        }),
    }),
    { name: "settings-storage" }
  )
);
