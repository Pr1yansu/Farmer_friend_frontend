import React from "react";
import styles from "../styles/history-table.css";

const HistoryTable = ({history}) => {
  return (
    <>
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.date.slice(0, 10)}</td>
              <td>{item.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  );
};

export default HistoryTable;
