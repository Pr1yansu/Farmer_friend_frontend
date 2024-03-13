import React, { useEffect } from "react";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/nav-bar.module.css";
import useUserStore from "../../store/user-store";

const Navbar = () => {
  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    }
  }, [fetchUser]);
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={styles.navContainer}
      style={{
        backgroundColor:
          location.pathname === "/" || location.pathname === "/login"
            ? "transparent"
            : "white",
      }}
    >
      <header className={styles.navbar}>
        <ul className={styles.navList}>
          {navLinks.map((link, index) => (
            <li key={index} className={styles.navItem}>
              <NavLink
                to={link.path}
                style={{
                  color:
                    location.pathname === "/" || location.pathname === "/login"
                      ? "white"
                      : "black",
                }}
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
        {user ? (
          <div className={styles.loggedIn}>
            <Link to="/profile">
              <User2
                size={24}
                style={{
                  color: location.pathname !== "/" && "black",
                }}
              />
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="btn-default btn-danger btn-sm"
            >
              <LogOut
                size={24}
                style={{
                  color: location.pathname !== "/" && "black",
                }}
              />
            </button>
          </div>
        ) : (
          <img
            src="/assets/images/Login.svg"
            onClick={() => navigate("/login")}
            className={styles.login}
            style={{
              filter: location.pathname !== "/" && "invert(1)",
              WebkitFilter: location.pathname !== "/" && "invert(1)",
            }}
          />
        )}
      </header>
    </div>
  );
};

export default Navbar;
