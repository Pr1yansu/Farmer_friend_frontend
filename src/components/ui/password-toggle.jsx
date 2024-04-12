import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const PasswordToggle = ({ isVisible, onToggle }) => {
  return (
    <span
      onClick={onToggle}
      style={{
        cursor: "pointer",
        position: "absolute",
        right: "10px",
        top: "50%",
        transform: "translateY(-45%)",
      }}
    >
      {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
    </span>
  );
};

export default PasswordToggle;
