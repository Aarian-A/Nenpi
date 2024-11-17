// BarChart.js
import React from "react";
import BarConfig from "./Bar";
import styles from "../styles/Card.module.css";

const BarChart = ({ carData }) => {
  if (!carData || !carData[0]) {
    return <p>Loading data...</p>;
  }

  const car = carData[0]; // Use the first car's data
  const chartData = {
    labels: ["City CO2", "Highway CO2", "Combined CO2"],
    datasets: [
      {
        label: `${car.make} ${car.model} (${car.year}) - CO2 Emissions`,
        data: [
          car.cityCO2 ? (car.cityCO2).toFixed(2) : 0, // Example conversion
          car.hwyCO2 ? (car.hwyCO2).toFixed(2) : 0,
          car.combCO2 ? (car.combCO2).toFixed(2) : 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.main}>
      <BarConfig data={chartData} />
    </div>
  );
};

export default BarChart;