import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../components/ui/loader";
import { useUserStore } from "../store/user-store";

const History = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [redirecteTime, setRedirectTime] = useState(5);

  useEffect(() => {
    const url = process.env.REACT_APP_SERVER_URL;
    const token = localStorage.getItem("token");
    if (!token) {
      return navigate("/login");
    }
    const fecthHistory = async () => {
      try {
        setLoading(true);
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
        if (data != null) {
          const idIncludedHistory = data.map((item, index) => {
            const date = new Date(item.date);
            return {
              id: index + 1,
              name: item.name,
              date: date.toLocaleTimeString() + " " + date.toDateString(),
              desc: item.desc,
            };
          });
          setHistory(idIncludedHistory);
          toast.success("This is your History");
        }
      } catch (error) {
        toast.error("Error fetching history");
      } finally {
        setLoading(false);
      }
    };
    fecthHistory();
  }, [navigate]);

  const columns = [
    { field: "id", headerName: "ID", width: 120 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
      editable: true,
    },
    {
      field: "date",
      headerName: "Date",
      width: 250,
      editable: true,
    },
    {
      field: "desc",
      headerName: "Description",
      width: 350,
      editable: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRedirectTime((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [history]);

  if (history.length < 1) {
    if (redirecteTime === 0) {
      navigate("/");
    }
    return (
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            fontSize: "5rem",
            textTransform: "capitalize",
            textAlign: "center",
            width: "1440px",
            margin: "0 auto",
          }}
        >
          No history found you will be redirected to the home page in{" "}
          {redirecteTime}
          seconds
        </h2>
      </div>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <section>
            <div>
              <h4
                style={{
                  marginBottom: "1rem",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textTransform: "capitalize",
                }}
              >
                {user ? user.name : "User"}'s history
              </h4>
              <DataGrid
                rows={history}
                columns={columns}
                pageSizeOptions={[5]}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                checkboxSelection
                getRowClassName={(params) =>
                  params.row.id % 2 === 0
                    ? "super-app-theme--odd"
                    : "super-app-theme--even"
                }
                style={{ width: "100%", maxWidth: "1240px" }}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default History;
