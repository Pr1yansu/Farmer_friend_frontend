import React, { useEffect } from "react";
import { useUserStore } from "../../store/user-store";

const AuthProvider = ({ children }) => {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, [fetchUser]);

  return <>{children}</>;
};

export default AuthProvider;
