import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "../styles/history.module.css";
import Loader from "../components/ui/loader";
const History = () => {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState();
  useEffect(() => {
    const url = process.env.REACT_APP_SERVER_URL;
    const fecthHistory = async () => {
      try {
        const { data } = await axios.post(
          `${url}/api/history/view`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(data);
        if (data != null) {
          setHistory(data);
          toast.success("This is your History");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fecthHistory();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className={styles.container}>
          <h1>History</h1>
          <div className={styles.headings}>
            <h2 style={{ width: "80px" }}>Name</h2>
            <h2 style={{ width: "270px" }}>Date</h2>
            <h2 style={{ width: "450px" }}>Description</h2>
          </div>
          <div className={styles.datas}>
            {history.map((item, index) => (
              <div key={index} className={styles.rows}>
                <p>{item.name}</p>
                <p>{item.date}</p>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </main>
      )}
    </>
  );
};

export default History;
