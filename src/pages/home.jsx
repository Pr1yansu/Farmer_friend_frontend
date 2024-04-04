import React, { useState } from "react";
import ModeSwitchComponent from "../components/ui/mode-switch.jsx";
import { motion } from "framer-motion";
import styles from "../styles/home.module.css";
import {
  CropInputFields,
  FertilizerInputFields,
} from "../components/ui/input-field.jsx";
import Loader from "../components/ui/loader.jsx";

const options = ["crops", "fertilizer"];

const Home = () => {
  const [mode, setMode] = useState("crops");
  const [selectMode, setSelectMode] = useState();

  return (
    <section className={styles.homeSection}>
      {mode === "crops" && (
        <motion.video
          src="/assets/videos/Crops-Home.mp4"
          autoPlay
          loop
          muted
          className={styles.backgroundVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
        >
          Your browser does not support the video tag.
        </motion.video>
      )}
      {mode === "fertilizer" && (
        <motion.video
          src="/assets/videos/Fertilizer-Home.mp4"
          autoPlay
          loop
          muted
          className={styles.backgroundVideo}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          exit={{ opacity: 0 }}
        >
          Your browser does not support the video tag.
        </motion.video>
      )}
      <div className={styles.videoOverlay} />
      <div className={styles.homeContent}>
        <div className={styles.headText}>
          <img
            src="/assets/images/Home-Placeholder.png"
            alt="placeholder"
            className={styles.headTextImagePlaceholder}
          />
          <h1>
            Grow <span>Smart</span> Farming
          </h1>
        </div>
        <h2>
          We provide the best solutions for farmers to grow their crops
          efficiently.
        </h2>
        {selectMode === "crops" && (
          <CropInputFields
            selectMode={selectMode}
            setSelectMode={setSelectMode}
          />
        )}
        {selectMode === "fertilizer" && (
          <FertilizerInputFields
            selectMode={selectMode}
            setSelectMode={setSelectMode}
          />
        )}
        {!selectMode && (
          <ModeSwitchComponent
            mode={mode}
            setMode={setMode}
            options={options}
            setSelectMode={setSelectMode}
          />
        )}
        <div className={styles.homeContentLower}>
          {mode === "crops" ? (
            <h3>
              <span>Predict</span>
              the best crop to plant
            </h3>
          ) : (
            <h3>
              <span>Find</span>
              the best fertilizer for your crops
            </h3>
          )}
          {mode === "crops" ? (
            <img src="/assets/images/Crop.svg" alt="" />
          ) : (
            <img src="/assets/images/Fertilizer.svg" alt="" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
