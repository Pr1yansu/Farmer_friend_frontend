import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import styles from "../styles/history.module.css";

const History = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const url = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
    const fecthHistory = async () => {
      try {
        const { data } = await axios.post(
          `${url}/api/history/view`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
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

  // ! Paginantion
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = history.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(history.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % history.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <main className={styles.container}>
            <h1>History</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.date.slice(0, 10)}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            className={styles.pages}
            pageClassName={styles.pageLi}
            pageLinkClassName	={styles.pageA}
          />
          </main>
        </>
      )}
    </>
  );
};

export default History;
