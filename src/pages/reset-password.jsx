import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/reset-password.module.css";
import toast from "react-hot-toast";
import PasswordToggle from "../components/ui/password-toggle";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password === "" || confirmPassword === "") {
      toast.error("Password and Confirm Password are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/users/reset-password?${token}`,
        {
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      if (data.message) {
        toast.success(data.message);
        navigate("/login");
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }
    } catch (error) {
      toast.error("Error resetting password");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, confirmPassword]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.heading}>Reset Password</h2>
        <form className={styles.form} onSubmit={handleResetPassword}>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.input}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PasswordToggle
                isVisible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Confirm Password
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                required
                className={`${styles.input} ${
                  !passwordsMatch && styles.inputError
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <PasswordToggle
                isVisible={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </div>
            {!passwordsMatch && (
              <p className={styles.errorMessage}>Passwords do not match</p>
            )}
          </div>
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
