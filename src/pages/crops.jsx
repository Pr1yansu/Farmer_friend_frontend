import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/crops.module.css";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../components/ui/loader";

const Crops = () => {
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cropId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.REACT_APP_MODEL_URL;
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const fetchCrop = async () => {
      if (!localStorage.getItem("token")) {
        return navigate("/login");
      }
      try {
        const cropData = await axios.get(`${url}/crop/${cropId}`);
        if (cropData.status !== null) {
          const history = await axios.post(
            `${serverUrl}/api/history/create`,
            {
              name: cropId,
              date: new Date(),
              desc: `Viewed ${cropId} farming process`,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (history.status === 200) {
            toast.success("History created");
          }
        }
        let trimmedString = cropData.data.cropDetails.replace(/^```json\n|```$/g, "");
        console.log(JSON.parse(trimmedString));
        setImages(cropData.data.images);
        setData(JSON.parse(trimmedString));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCrop();
  }, [cropId]);

  const { crop, farming_process: farmingProcessDetails } = data;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className={styles.cropsPage}>
          <div className="container">
            <h1 className={styles.nanum_pen}>
              <span>{crop}</span> FARMING PROCESS
            </h1>
            <div className="section">
              <div className="imageflex">
                {
                  images.map((image, index) => (
                    <img key={index} src={image} alt={"crop_image"} />
                  ))
                }
              </div>
              <KeyValueRenderer data={data.farming_process} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const KeyValueRenderer = ({ data }) => {
  return (
    <div className={styles.infoBox}>
      {Object.keys(data).map((key, index) => {
        if (typeof data[key] === "object") {
          return (
            <div key={index} className={styles.info}>
              <h2>{key.replace(/_/g, " ").toUpperCase()}:</h2>
              <KeyValueRenderer data={data[key]} />
            </div>
          );
        } else {
          return (
            <div key={index}>
              <h3>{key.replace(/_/g, " ")}:</h3>
              <p className={styles.Bodytext}>{data[key].replace(/_/g, " ")}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Crops;
