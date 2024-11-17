import React from "react";
import Bar from "./BarChart";
import BarConfig from "./Bar";
import styles from "../styles/Card.module.css";
import LineConfig from "./Line";

const LineChart = () => {
  const chartData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales Data",
        data: [10, 20, 30, 40, 50],
        borderColor: "#eb0a1e",
        backgroundColor: "rgba(235, 10, 30, 0.5)",
        borderWidth: 2,
        fill: true, // Optional: fill the area under the line
        tension: 0.4, // Optional: curvature of the line
      },
    ],
  };
  return (
    <div className={styles.main}>
      <LineConfig data={chartData} />
    </div>
  );
};

export default LineChart;
