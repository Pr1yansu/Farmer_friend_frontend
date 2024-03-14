import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/crops.module.css";
import { useState } from "react";
import axios from "axios";
const Crops = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { cropId } = useParams();
  useEffect(() => {
    const url = process.env.REACT_APP_MODEL_URL;
    const fetchCrop = async () => {
      try {
        const cropData = await axios.get(`${url}/crop/${cropId}`);
        console.log(cropData.data);
        let trimmedString = cropData.data.replace(/^```json\n|```$/g, "");
        console.log(JSON.parse(trimmedString));
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
        <h1 className={styles.cropsPage}>Loading...</h1>
      ) : (
        <section className={styles.cropsPage}>
          <div className="container">
            <h1>{crop} Farming Process</h1>
            <div className="section">
              <h2>Land Preparation</h2>
              <p>
                <strong>Soil Type:</strong>{" "}
                {farmingProcessDetails.land_preparation.soil_type}
              </p>
              <p>
                <strong>pH Range:</strong>{" "}
                {farmingProcessDetails.land_preparation.pH_range}
              </p>
              <p>
                <strong>Bed Preparation:</strong>{" "}
                {farmingProcessDetails.land_preparation.bed_preparation}
              </p>
            </div>
            <div className="section">
              <h2>Planting</h2>
              <p>
                <strong>Sowing Depth:</strong>{" "}
                {farmingProcessDetails.planting.sowing_depth}
              </p>
              <p>
                <strong>Spacing:</strong>{" "}
                {farmingProcessDetails.planting.spacing}
              </p>
              <p>
                <strong>Planting material:</strong>{" "}
                {farmingProcessDetails.planting.planting_material}
              </p>
            </div>
            <div className="section">
              <h2>Fertilization</h2>
              <p>
                <strong>Basal Application:</strong>{" "}
                {farmingProcessDetails.fertilization.basal_application}
              </p>
              <p>
                <strong>Side dressing:</strong>{" "}
                {farmingProcessDetails.fertilization.side_dressing}
              </p>
            </div>
            <div className="section">
              <h2>Irrigation</h2>
              <p>
                <strong>Water Requirements:</strong>{" "}
                {farmingProcessDetails.irrigation.water_requirements}
              </p>
              <p>
                <strong>Irrigation Schedule:</strong>{" "}
                {farmingProcessDetails.irrigation.irrigation_schedule}
              </p>
            </div>
            <div className="section">
              <h2>Weed Control</h2>
              <p>
                <strong>Methods:</strong>{" "}
                {farmingProcessDetails.weed_control.methods}
              </p>
            </div>
            <div className="section">
              <h2>Pest and Disease Management</h2>
              <p>
                <strong>Common Pests:</strong>{" "}
                {farmingProcessDetails.pest_and_disease_management.common_pests}
              </p>
              <p>
                <strong>Common Diseases:</strong>{" "}
                {
                  farmingProcessDetails.pest_and_disease_management
                    .common_diseases
                }
              </p>
              <p>
                <strong>Management Approach:</strong>{" "}
                {
                  farmingProcessDetails.pest_and_disease_management
                    .management_approach
                }
              </p>
            </div>
            <div className="section">
              <h2>Harvesting</h2>
              <p>
                <strong>Maturity Period:</strong>{" "}
                {farmingProcessDetails.harvesting.maturity_period}
              </p>
              <p>
                <strong>Harvest Indicators:</strong>{" "}
                {farmingProcessDetails.harvesting.harvest_indicators}
              </p>
            </div>
            <div className="section">
              <h2>Additional Tips</h2>
              <p>
                <strong>Pollination:</strong>{" "}
                {farmingProcessDetails.additional_tips.pollination}
              </p>
              <p>
                <strong>pruning:</strong>{" "}
                {farmingProcessDetails.additional_tips.pruning}
              </p>
              <p>
                <strong>Storage:</strong>{" "}
                {farmingProcessDetails.additional_tips.storage}
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Crops;
