import React, { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import styles from "../styles/input-swicher.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const CropInputFields = ({ selectMode, setSelectMode }) => {
  const navigate = useNavigate();
  const [nitrogen, setNitrogen] = useState(0);
  const [phosphorus, setPhosphorus] = useState(0);
  const [potassium, setPotassium] = useState(0);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [ph, setPh] = useState(0);
  const [rainfall, setRainfall] = useState(0);
  const [inputMode, setInputMode] = useState("nitrogen");

  useEffect(() => {
    setHumidity(0);
    setNitrogen(0);
    setPhosphorus(0);
    setPotassium(0);
    setTemperature(0);
    setPh(0);
    setRainfall(0);
    setInputMode("nitrogen");
  }, [selectMode]);

  const handleInputMode = async (e) => {
    e.preventDefault();
    if (nitrogen) {
      setInputMode("phosphorus");
    }
    if (phosphorus) {
      setInputMode("potassium");
    }
    if (potassium) {
      setInputMode("temperature");
    }
    if (temperature) {
      if (temperature < 0) {
        toast.error("Temperature cannot be negative");
        return;
      }
      if (temperature > 100) {
        toast.error("Temperature cannot be more than 100");
        return;
      }
      setInputMode("humidity");
    }
    if (humidity) {
      setInputMode("ph");
    }
    if (ph) {
      if (ph < 0) {
        toast.error("PH value cannot be negative");
        return;
      }
      if (ph > 14) {
        toast.error("PH value cannot be more than 14");
        return;
      }
      setInputMode("rainfall");
    }
    if (rainfall) {
      if (
        nitrogen &&
        phosphorus &&
        potassium &&
        temperature &&
        humidity &&
        ph &&
        rainfall
      ) {
        try {
          toast.loading("Loading");
          const { data } = await axios.post(
            `${process.env.REACT_APP_MODEL_URL}/predict_crop`,
            {
              N: nitrogen,
              P: phosphorus,
              K: potassium,
              temperature,
              humidity,
              ph,
              rainfall,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!data) {
            toast.dismiss();
            console.log("no data found");
          }
          if (data.predicted_crop) {
            toast.dismiss();
            navigate(`/crops/${data.predicted_crop}`);
          } else {
            toast.error("Error predicting crop");
            setHumidity(0);
            setNitrogen(0);
            setPhosphorus(0);
            setPotassium(0);
            setTemperature(0);
            setPh(0);
            setRainfall(0);
            setInputMode("nitrogen");
          }
          toast.dismiss();
        } catch (error) {
          toast.dismiss();
          toast.error("Error predicting crop");
          console.log(error);
        }
      }
    }
  };

  if (selectMode)
    return (
      <form className={styles.inputBox} onSubmit={handleInputMode}>
        {inputMode === "nitrogen" && (
          <input
            type="number"
            placeholder="Nitrogen"
            className={styles.inputField}
            onChange={(e) => setNitrogen(e.target.value)}
          />
        )}
        {inputMode === "phosphorus" && (
          <input
            type="number"
            placeholder="Phosphorus"
            className={styles.inputField}
            onChange={(e) => setPhosphorus(e.target.value)}
          />
        )}
        {inputMode === "potassium" && (
          <input
            type="number"
            placeholder="Potassium"
            className={styles.inputField}
            onChange={(e) => setPotassium(e.target.value)}
          />
        )}
        {inputMode === "temperature" && (
          <input
            type="number"
            placeholder="Temperature"
            className={styles.inputField}
            onChange={(e) => setTemperature(e.target.value)}
          />
        )}
        {inputMode === "humidity" && (
          <input
            type="number"
            placeholder="Humidity"
            className={styles.inputField}
            onChange={(e) => setHumidity(e.target.value)}
          />
        )}
        {inputMode === "ph" && (
          <input
            type="number"
            placeholder="PH"
            className={styles.inputField}
            onChange={(e) => setPh(e.target.value)}
          />
        )}
        {inputMode === "rainfall" && (
          <input
            type="number"
            placeholder="Rainfall"
            className={styles.inputField}
            onChange={(e) => setRainfall(e.target.value)}
          />
        )}
        <button type="submit" className="btn-default">
          <Check size={28} className={styles.inputFieldCheck} />
        </button>
        <button type="button" className="btn-default">
          <X
            size={28}
            className={styles.inputFieldClose}
            onClick={() => setSelectMode(false)}
          />
        </button>
      </form>
    );
};

export const FertilizerInputFields = ({ selectMode, setSelectMode }) => {
  const navigate = useNavigate();
  const [nitrogen, setNitrogen] = useState(0);
  const [phosphorus, setPhosphorus] = useState(0);
  const [potassium, setPotassium] = useState(0);
  const [inputMode, setInputMode] = useState("nitrogen");
  useEffect(() => {
    setNitrogen(0);
    setPhosphorus(0);
    setPotassium(0);
    setInputMode("nitrogen");
  }, [selectMode]);

  const handleInputMode = async (e) => {
    e.preventDefault();
    if (nitrogen) {
      setInputMode("phosphorus");
    }
    if (phosphorus) {
      setInputMode("potassium");
    }
    if (potassium) {
      if (nitrogen && phosphorus && potassium) {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_MODEL_URL}/predict_fert`,
            {
              N: nitrogen,
              P: phosphorus,
              K: potassium,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!data) {
            console.log("no data found");
          }
          if (data.predicted_crop) {
            navigate(`/fertilizer/${data.predicted_crop}`);
          } else {
            toast.error("Error predicting crop");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  if (selectMode)
    return (
      <form className={styles.inputBox} onSubmit={handleInputMode}>
        {inputMode === "nitrogen" && (
          <input
            type="number"
            placeholder="Nitrogen"
            className={styles.inputField}
            onChange={(e) => setNitrogen(e.target.value)}
          />
        )}
        {inputMode === "phosphorus" && (
          <input
            type="number"
            placeholder="Phosphorus"
            className={styles.inputField}
            onChange={(e) => setPhosphorus(e.target.value)}
          />
        )}
        {inputMode === "potassium" && (
          <input
            type="number"
            placeholder="Potassium"
            className={styles.inputField}
            onChange={(e) => setPotassium(e.target.value)}
          />
        )}
        <button type="submit" className="btn-default">
          <Check size={28} className={styles.inputFieldCheck} />
        </button>
        <button type="button" className="btn-default">
          <X
            size={28}
            className={styles.inputFieldClose}
            onClick={() => setSelectMode(false)}
          />
        </button>
      </form>
    );
};
