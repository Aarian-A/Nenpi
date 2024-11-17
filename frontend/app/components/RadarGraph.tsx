import React from "react";
import styles from "../styles/Card.module.css";
import Image from "next/image";
import RadarChart from "./Radar";

function Card() {
  const chartData = {
    labels: [
      "Eating",
      "Drinking",
      "Sleeping",
      "Designing",
      "Coding",
      "Cycling",
      "Running",
    ],
    datasets: [
      {
        label: "My First Dataset",
        data: [50, 80, 90, 81, 80, 80, 80],
        backgroundColor: "rgba(235, 10, 30, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      // {
      //   label: "My Second Dataset",
      //   data: [28, 48, 40, 19, 96, 27, 100],
      //   backgroundColor: "rgba(54, 162, 235, 0.2)",
      //   borderColor: "rgba(54, 162, 235, 1)",
      //   borderWidth: 1,
      // },
    ],
  };

  return (
    <div className={styles.main}>
      <RadarChart data={chartData} />
    </div>
  );
}

export default Card;
