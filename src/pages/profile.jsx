import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user-store";
import styles from "../styles/profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useModalStore } from "../store/modal";
import Loader from "../components/ui/loader";

const Profile = () => {
  const { user } = useUserStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
  }, [navigate]);

  return (
    <>
      {user ? (
        <section className={`${styles.parent}`}>
          {user.role === "ADMIN" && (
            <div className={styles.sidebar}>
              <div className={styles.dashboard}>
                <div className={styles.menu_head}>Dashboard</div>
                <ul className={styles.menu_items}>
                  {[
                    "My Tasks",
                    "Manage Team",
                    "Hours Reports",
                    "Edit Time",
                    "Settings",
                  ].map((items, index) => (
                    <Link to={"/"} id={index}>
                      <li>{items}</li>
                    </Link>
                  ))}
                </ul>
                <button
                  className={styles.signOut}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
          <div
            className={styles.mainpage}
            style={{
              gridArea: user.role === "ADMIN" ? "main" : "main / span 12",
            }}
          >
            <div className={styles.profile}>
              <div className={styles.ProfileHead}>
                User Profile
                <hr />
              </div>
              <div className={styles.ProfileContent}>
                <div className={styles.LeftContent}>
                  <img
                    src={
                      user.image
                        ? user.image
                        : "/assets/images/default_User.png"
                    }
                    alt=""
                  />
                  <div className={styles.userInfo}>
                    <p className={styles.p1}>{user.name}</p>
                    <p className={styles.p2}>{user.email}</p>
                    <p className={styles.p3}>{user.role}</p>
                  </div>
                </div>
                <div className={styles.RightContent}>
                  <button
                    className={styles.btn1}
                    onClick={() => openModal(true)}
                  >
                    {user.image ? "Change Image" : "Upload Image"}
                  </button>
                  <button className={styles.btn2}>Delete</button>
                </div>
              </div>
              <hr />
            </div>
            <div className={styles.info}>
              <form action="">
                <div className={styles.infoD2}>
                  <label htmlFor="UserName">UserName</label>
                  <input
                    type="text"
                    id="UserName"
                    className=""
                    placeholder="eg. Jai Shree Ram"
                  />
                </div>
                <div className={styles.infoD1}>
                  <div>
                    <label htmlFor="Email">Email Address</label>
                    <input
                      type="email"
                      id="LastName"
                      className={styles.email}
                    />
                  </div>
                  <div>
                    <label htmlFor="Phone">Phone Number</label>
                    <input type="number" id="Phone" className={styles.phone} />
                  </div>
                </div>
              </form>
              <hr />
            </div>
            <div className={styles.password}>
              <form>
                <div className={styles.infoD1}>
                  <div>
                    <label htmlFor="CurrentPassword">Current Password</label>
                    <input type="password" id="CurrentPassword" />
                  </div>
                  <div>
                    <label htmlFor="NewPassword">New Password</label>
                    <input type="password" id="NewPassword" />
                  </div>
                </div>
                <div className={styles.infoD2}>
                  <label htmlFor="confirm_password">Confirm New Password</label>
                  <input type="password" id="confirm_password" />
                </div>
                <div className={styles.submission}>
                  <button
                    className={styles.btn2}
                    type="button"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Cancel
                  </button>
                  <button className={styles.btn1}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Profile;
