import { create } from "zustand";

export const useTotalCar = create((set) => ({
  total: 0,
  sumarTotal: (sum) => {
    set((state) => ({
      total: state.total + sum,
    }));
  },
  resTotal: () => {
    set((state) => ({
      total: 0,
    }));
  },
}));
