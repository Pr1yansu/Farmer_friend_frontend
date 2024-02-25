import React, { useState } from "react";
import { User2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "../styles/nav-bar.module.css";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [user, setUser] = useState(false);

  return (
    <header className={styles.navbar}>
      <ul className={styles.navList}>
        {navLinks.map((link, index) => (
          <li key={index} className={styles.navItem}>
            <NavLink href={link.path}>{link.title}</NavLink>
          </li>
        ))}
      </ul>
      {user ? (
        <div className={styles.loggedIn}>
          <User2 size={24} />
          <button
            onClick={() => setUser(false)}
            className="btn btn-danger btn-sm"
          >
            Logout
          </button>
        </div>
      ) : (
        <img
          src="/assets/images/Login.svg"
          onClick={() => setUser(true)}
          className={styles.login}
        />
      )}
    </header>
  );
};

export default Navbar;
