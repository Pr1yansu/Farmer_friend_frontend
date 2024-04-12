import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const isTokenExpired = (token) => {
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (!tokenExpiration) {
    return false;
  }
  const currentTime = Date.now();
  return currentTime > tokenExpiration;
};

export const useUserStore = create((set) => ({
  user: null,
  fetchUser: async (token) => {
    try {
      if (!token) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        return;
      }
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        toast.error("Token expired, please login again");
        window.location.href = "/login";
        return;
      }
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
