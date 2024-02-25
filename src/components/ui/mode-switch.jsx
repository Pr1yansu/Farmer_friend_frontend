import React from "react";
import styles from "../styles/mode-switch.module.css";
import { Check } from "lucide-react";

const ModeSwitchComponent = ({ mode, setMode, options, setSelectMode }) => {
  return (
    <div className={styles.modeSwitchContainer}>
      <div className={styles.modeSwitch}>
        {options.map((option, index) => (
          <button
            key={index}
            className={`btn captalize btn-rounded-sm ${
              mode === option ? "active" : ""
            }`}
            onClick={() => setMode(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="btn-white btn-rounded"
        onClick={() => setSelectMode(mode)}
      >
        <Check size={20} />
      </button>
    </div>
  );
};

export default ModeSwitchComponent;
