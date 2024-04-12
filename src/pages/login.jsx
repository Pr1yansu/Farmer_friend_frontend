import React, { useEffect } from "react";
import { Eye, EyeOff, Loader2, SendHorizonal } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/login-store";
import styles from "../styles/login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const {
    tab,
    email,
    password,
    loading,
    showPassword,
    username,
    mounted,
    setMounted,
    setTab,
    setEmail,
    setPassword,
    setLoading,
    setShowPassword,
    setUsername,
  } = useLoginStore();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, [tab, setUsername, setEmail, setPassword]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      let url = process.env.REACT_APP_SERVER_URL;
      if (email === "" || password === "") {
        toast.error("Email and password are required");
        return;
      }
      const { data } = await axios.post(
        url + "/auth/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.message) {
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "expirationTime",
          data.expirationTime * 60 * 60 * 1000
        );
        window.location.reload();
      }
      if (data.error) {
        if (data.error === "Bad credentials") {
          toast.error("Invalid email or password");
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging in");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let url = process.env.REACT_APP_SERVER_URL;
      if (tab === "register") {
        url = url + "/auth/users/register";
      }

      if (
        email === null ||
        password === null ||
        email === "" ||
        password === "" ||
        username === undefined ||
        username === undefined
      ) {
        toast.error("Email and password are required");
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(email)) {
        toast.error("Invalid email");
        return;
      }

      if (tab === "login") {
        await login(email, password);
      }

      const { data } = await axios.post(
        url,
        {
          email,
          password,
          name: username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.user) {
        toast.success(`Welcome ${data.user.name}`);
        await login(email, password);
        window.location.reload();
      }
      if (data.error) {
        toast.error(data.error);
      }
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      if (email === "") {
        toast.error("Please enter your email");
        document.getElementById("email").focus();
        return;
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/users/forgot-password`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.message) {
        toast.success(data.message);
        return;
      }

      if (data.error) {
        toast.error(data.error);
        return;
      }
    } catch (error) {
      return;
    }
  };

  if (!mounted) return null;

  return (
    <>
      {tab === "register" ? (
        <div className={styles["register-container"]}>
          <div className={styles.card}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles["form-group"]}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="enter your username here"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="enter your email here"
                  id="email"
                  name="email"
                  value={email}
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="password">Password</label>
                <div className={styles["password-container"]}>
                  <input
                    type={showPassword ? "text" : "password"}
                    password="password"
                    placeholder="enter your password here"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>
              <div className={styles.register_form_group}>
                <div className={styles["form-link"]}>
                  Already have an account?{" "}
                  <span onClick={() => setTab("login")}>Login</span>
                </div>
              </div>
              <button type="submit" disabled={loading}>
                Register
                {loading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <SendHorizonal size={24} />
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className={styles["login-container"]}>
          <div className={styles.card}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles["form-group"]}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  placeholder="enter your email here"
                  id="email"
                  value={email}
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="password">Password</label>
                <div className={styles["password-container"]}>
                  <input
                    type={showPassword ? "text" : "password"}
                    password="enter your password here"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  />
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
              </div>
              <div className={styles.login_form_group}>
                <span onClick={handleForgotPassword}>Forgot password?</span>
                <div className={styles["form-link"]}>
                  Don't have an account?
                  <span onClick={() => setTab("register")}>Register</span>
                </div>
              </div>
              <button type="submit">
                Login
                {loading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <SendHorizonal size={24} />
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
