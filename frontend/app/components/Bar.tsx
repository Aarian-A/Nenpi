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

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
}

const BarConfig: React.FC<BarChartProps> = ({ data }) => {
  const config = {
    type: "bar", // Change type to 'bar'
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const, // Fixing the type by using 'as const'
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
      },
    },
  };

  return <Bar data={config.data} options={config.options} />;
};

export default BarConfig;
