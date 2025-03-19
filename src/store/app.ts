import { create } from "zustand";

type AppStore = {
  playMusic: boolean;
};

export const useAppStore = create<AppStore>()((_) => ({
  playMusic: false,
}));
