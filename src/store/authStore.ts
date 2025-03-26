// import { create } from "zustand";

// interface AuthState {
//   isAuthenticated: boolean;
//   username: string | null;
//   login: (username: string) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>(
//   (set: (partial: Partial<AuthState>) => void) => ({
//     isAuthenticated: false,
//     username: null,
//     login: (username: string) => {
//       setTimeout(() => {
//         localStorage.setItem("isAuthenticated", "true");
//         set({ isAuthenticated: true, username });
//       }, 1000);
//     },
//     logout: () => {
//       setTimeout(() => {
//         localStorage.setItem("isAuthenticated", "false");
//         set({ isAuthenticated: false, username:null});
//       }, 1000);
//     },
//   })
// );

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      login: (username: string) => {
        setTimeout(() => {
          set({ isAuthenticated: true, username });
        }, 1000);
      },
      logout: () => {
        setTimeout(() => {
          set({ isAuthenticated: false, username: null });
        }, 1000);
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Add these for debugging:
      onRehydrateStorage: () => (state) => {
        console.log("Hydration starts", state);
      },
      version: 1,
    }
  )
);

// Debug helper - check what's in localStorage
if (typeof window !== 'undefined') {
  console.log(
    "Current localStorage auth:",
    localStorage.getItem("auth-storage")
  );
}