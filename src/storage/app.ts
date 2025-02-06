import { create } from "zustand";

interface AppStore {
  showInfoModal: boolean;
  setShowInfoModal: (value: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showInfoModal: false,
  setShowInfoModal: (value: boolean) => set({ showInfoModal: value }),
}));
