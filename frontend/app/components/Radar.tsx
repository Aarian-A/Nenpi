import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Radar } from "react-chartjs-2";

// Register necessary modules
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

interface RadarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string;
      borderColor?: string;
    }[];
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const config = {
    type: "radar",
    data,
    options: {
      plugins: {
        title: {
          display: true,
          text: "Chart.js Radar Skip Points Chart",
        },
      },
    },
  };

  return <Radar data={config.data} options={config.options} />;
};

export default RadarChart;
