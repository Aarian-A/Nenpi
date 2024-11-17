// BarConfig.js
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register necessary modules for the bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarConfig = ({ data }) => {
  const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Fuel Economy (g/km CO2 Emissions)",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Fuel Economy Type",
      },
    },
    y: {
      title: {
        display: true,
        text: "CO2 Emissions (g/km)",
      },
      beginAtZero: true,
      min: 0, // Ensure it starts at zero
      max: 100, // Adjust this to a value higher than the dataset's max to create taller bars
    },
  },
};

  return <Bar data={data} options={options} />;
};

export default BarConfig;