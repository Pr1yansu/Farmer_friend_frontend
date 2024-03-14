import { create } from "zustand";

export const useModalStore = create((set) => ({
  isOpen: false,
  openModal: (type) => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
