import React from "react";
import Lottie from "lottie-react";
import TreeAnimation from "../../lotties/Tree-loading-animation.json";
import styles from "../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Lottie animationData={TreeAnimation} />
    </div>
  );
};

export default Loader;
