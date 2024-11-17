import React from "react";
import Bar from "../components/BarChart";
import BarConfig from "./Bar";
import styles from "../styles/Card.module.css";

const BarChart = () => {
  const chartData = {
    labels: ["City CO2", "Hwy CO2", "Comb CO2"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      // {
      //   label: "Dataset 2",
      //   data: [28, 48, 40, 19, 86, 27, 90],
      //   backgroundColor: "rgba(54, 162, 235, 0.5)",
      //   borderColor: "rgba(54, 162, 235, 1)",
      //   borderWidth: 1,
      // },
    ],
  };
  return (
    <div className={styles.main}>
      <BarConfig data={chartData} />
    </div>
  );
};

export default BarChart;
