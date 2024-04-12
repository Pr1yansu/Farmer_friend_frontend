import React from "react";
import Lottie from "lottie-react";
import ExitAnimation from "../lotties/Exit.json";

const ErrorPage = () => {
  setTimeout(() => {
    window.location.href = "/";
  }, 3000);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "5rem",
          color: "red",
          marginBottom: "1rem",
        }}
      >
        404 Not Found
      </h1>
      <p
        style={{
          fontSize: "2rem",
        }}
      >
        The page you are looking for does not exist.
      </p>
      <p
        style={{
          fontSize: "1rem",
        }}
      >
        Redirecting to <a href="/">Home</a> after 3 second...
      </p>
      <Lottie
        animationData={ExitAnimation}
        style={{
          width: "50%",
          height: "50%",
        }}
      />
    </div>
  );
};

export default ErrorPage;
