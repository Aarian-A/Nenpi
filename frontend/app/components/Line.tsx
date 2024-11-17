import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary modules for the line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      fill?: boolean;
      tension?: number;
    }[];
  };
}

const LineConfig: React.FC<LineChartProps> = ({ data }) => {
  const config = {
    type: "line", // Change type to 'line'
    data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const, // Fixing the type by using 'as const'
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    },
  };

  return <Line data={config.data} options={config.options} />;
};

export default LineConfig;
