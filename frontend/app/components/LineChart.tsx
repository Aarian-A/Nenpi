import React from "react";
import LineConfig from "./Line";
import styles from "../styles/Card.module.css";

const LineChart = ({ carData }) => {
  const carYear = carData?.year || 0; // Get car year
  const carMPG = carData?.combinedFuelEconomy || 0; // Get car combined MPG

  const chartData = {
    labels: ["2021", "2022", "2023", "2024", "2025"], // Line chart labels
    datasets: [
      {
        label: "MPG Data",
        data: [22, 22, 19, 23.26, 21], // Historical MPG data
        borderColor: "#eb0a1e",
        backgroundColor: "rgba(235, 10, 30, 0.5)",
        borderWidth: 2,
        fill: true, // Optional: fill the area under the line
        tension: 0.4, // Optional: curvature of the line
      },
      {
        label: "Car MPG Point",
        data: carYear && carMPG ? [{ x: carYear.toString(), y: carMPG }] : [], // Add car point
        backgroundColor: "#36A2EB", // Color of the point
        borderColor: "#36A2EB",
        pointRadius: 5, // Size of the point
        type: "scatter", // Scatter plot for single point
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Fuel Economy (MPG Over Years)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
        type: "category", // Use categorical labels for years
      },
      y: {
        title: {
          display: true,
          text: "MPG",
        },
        beginAtZero: true,
        min: 0,
        max: 30, // Adjust based on your data range
      },
    },
  };

  return (
    <div className={styles.main}>
      <LineConfig data={chartData} options={options} />
    </div>
  );
};

export default LineChart;