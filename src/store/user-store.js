import axios from "axios";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  fetchUser: async (token) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/auth/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ user: data });
    } catch (error) {
      console.log("Error fetching user:", error);
      return;
    }
  },
}));
