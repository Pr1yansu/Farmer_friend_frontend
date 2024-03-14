import { create } from "zustand";

export const useLoginStore = create((set) => ({
  tab: "register",
  email: "",
  password: "",
  loading: false,
  showPassword: false,
  username: "",
  mounted: false,
  setMounted: (value) => set({ mounted: value }),
  setTab: (value) => set({ tab: value }),
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
  setLoading: (value) => set({ loading: value }),
  setShowPassword: (value) => set({ showPassword: value }),
  setUsername: (value) => set({ username: value }),
}));
