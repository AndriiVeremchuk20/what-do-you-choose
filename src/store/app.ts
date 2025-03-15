import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AppStore = {
  playMusic: boolean;
};

export const useAppStore = create<AppStore>()(
  persist(
    (_) => ({
      playMusic: false,
    }),
    {
      name: "what-do-choose-app-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
