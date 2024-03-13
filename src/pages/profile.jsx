import React, { useState } from "react";
import useUserStore from "../store/user-store";
import styles from "../styles/profile.module.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  if (!user) return navigate("/");

  const handleUploadImage = async () => {
    try {
    } catch (error) {
      console.log("Error uploading image:", error);
      return;
    }
  };

  if (user) navigate("/");

  return (
    <>
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
                  <a href="" id={index}>
                    <li>{items}</li>
                  </a>
                ))}
              </ul>
              <button className={styles.signOut}>Sign Out</button>
            </div>
          </div>
        )}
        <div
          className={styles.mainpage}
          style={{
            gridArea: user.role === "ADMIN" ? "main" : "main / span 12",
          }}
        >
          {/* General info and photo starts here */}
          <div className={styles.profile}>
            <div className={styles.ProfileHead}>
              User Profile
              <hr />
            </div>
            <div className={styles.ProfileContent}>
              <div className={styles.LeftContent}>
                <img
                  src={
                    user.image ? user.image : "/assets/images/default_User.png"
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
                <button className={styles.btn1}>Upload New Photo</button>
                <button className={styles.btn2}>Delete</button>
              </div>
            </div>
            <hr />
          </div>
          {/* General info and photo starts here */}
          {/* New info starts here */}
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
                  <input type="email" id="LastName" className={styles.email} />
                </div>
                <div>
                  <label htmlFor="Phone">Phone Number</label>
                  <input type="number" id="Phone" className={styles.phone} />
                </div>
              </div>
            </form>
            <hr />
          </div>
          {/* New info ends here */}
          {/* Password section starts here */}
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
                <button className={styles.btn2}>Cancel</button>
                <button className={styles.btn1}>Save Changes</button>
              </div>
            </form>
          </div>
          {/* Password section ends here */}
        </div>
      </section>
    </>
  );
};

export default Profile;
