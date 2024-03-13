import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/crops.module.css";
const Crops = () => {
  const { cropId } = useParams();
  useEffect(() => {}, [cropId]);
  return <div className={styles.cropsPage}>{cropId}</div>;
};

export default Crops;
