import React, { useEffect, useState } from "react";
import { LogOut, User2 } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/nav-bar.module.css";
import { useUserStore } from "../../store/user-store";

const Navbar = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [navLinks, setNavLinks] = useState([
    { title: "Home", path: "/" },
    { title: "Contact", path: "/contact" },
  ]);
  useEffect(() => {
    if (user) {
      setNavLinks([
        { title: "Home", path: "/" },
        { title: "History", path: "/history" },
        { title: "Contact", path: "/contact" },
      ]);
    }
  }, [user]);
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
                  color:
                    location.pathname === "/" || location.pathname === "/login"
                      ? "white"
                      : "black",
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
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                style={{
                  color:
                    location.pathname === "/" || location.pathname === "/login"
                      ? "white"
                      : "black",
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
              filter:
                location.pathname === "/" || location.pathname === "/login"
                  ? "none"
                  : "invert(1)",
              WebkitFilter:
                location.pathname === "/" || location.pathname === "/login"
                  ? "none"
                  : "invert(1)",
            }}
          />
        )}
      </header>
    </div>
  );
};

export default Navbar;
