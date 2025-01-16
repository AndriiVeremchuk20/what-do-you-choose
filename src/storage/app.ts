import { create } from "zustand";

interface AppStore {
  showBuyMeCoffeeModal: boolean;
  setShowBuyMeCoffeeModal: (value: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  showBuyMeCoffeeModal: false,
  setShowBuyMeCoffeeModal: (value: boolean) =>
    set({ showBuyMeCoffeeModal: value }),
}));
