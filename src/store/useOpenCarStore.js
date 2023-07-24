import { create } from "zustand";

const useOpenCarStore = create((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useOpenCarStore;
