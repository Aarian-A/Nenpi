import React from "react";
import styles from "../styles/Summary.module.css";
import Image from "next/image";
import MileCard from "./MileCard";
import BarConfig from "./Bar";
import LineConfig from "./Line";

interface SummaryProps {
  carData1: any;
  carData2: any;
}

export default function Summary({ carData1, carData2 }: SummaryProps) {
  // Parse car data if it's a JSON string
  const parsedCarData1 = typeof carData1 === "string" ? JSON.parse(carData1) : carData1;
  const parsedCarData2 = typeof carData2 === "string" ? JSON.parse(carData2) : carData2;

  // Extract first car data
  const car1 = parsedCarData1?.results?.[0];
  const car2 = parsedCarData2?.results?.[0];

  // Check for valid data
  if (!car1 || !car2) {
    return <div>Car data is unavailable for comparison.</div>;
  }

  // Bar chart data for car1 and car2
  const chartData1 = {
    labels: ["City CO2", "Hwy CO2", "Comb CO2"],
    datasets: [
      {
        label: car1.model,
        data: [car1.cityCO2, car1.hwyCO2, car1.combCO2],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartData2 = {
    labels: ["City CO2", "Hwy CO2", "Comb CO2"],
    datasets: [
      {
        label: car2.model,
        data: [car2.cityCO2, car2.hwyCO2, car2.combCO2],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for car1 and car2
  const chartData = {
    labels: ["2021", "2022", "2023", "2024", "2025"], // Line chart labels
    datasets: [
      {
        label: "MPG Data",
        data: [22, 22, 21.5, 23, 21], // Historical MPG data
        borderColor: "#eb0a1e",
        backgroundColor: "rgba(235, 10, 30, 0.5)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Car MPG Point",
        data: car1.year && car1.combinedFuelEconomy
          ? [{ x: car1.year.toString(), y: car1.combinedFuelEconomy }]
          : [],
        backgroundColor: "#36A2EB", // Color of the point
        borderColor: "#36A2EB",
        pointRadius: 5, // Size of the point
        type: "scatter", // Scatter plot for single point
        showLine: false, // Ensure the point is not connected by lines
      },
    ],
  };

  const chartData3 = {
    labels: ["2021", "2022", "2023", "2024", "2025"], // Line chart labels
    datasets: [
      {
        label: "MPG Data",
        data: [22, 22, 21.5, 23, 21], // Historical MPG data
        borderColor: "#eb0a1e",
        backgroundColor: "rgba(235, 10, 30, 0.5)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Car MPG Point",
        data: car2.year && car2.combinedFuelEconomy
          ? [{ x: car2.year.toString(), y: car2.combinedFuelEconomy }]
          : [],
        backgroundColor: "#36A2EB", // Color of the point
        borderColor: "#36A2EB",
        pointRadius: 5, // Size of the point
        type: "scatter", // Scatter plot for single point
        showLine: false, // Ensure the point is not connected by lines
      },
    ],
  };

  // Chart options
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

  const barOptions = {
  responsive: true,
  maintainAspectRatio: false, // Allows the chart to adapt to the container size
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
      beginAtZero: true, // Start Y-axis at 0
      max: 200, // Set the maximum value of the Y-axis
    },
  },
};

  return (
    <div className={styles.main}>
      {/* Left car comparison */}
      <div className={styles.left}>
        <h1 className={styles.title}>{car1.make} {car1.model}</h1>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt={`${car1.make} ${car1.model}`}
          sizes="100vw"
          layout="responsive"
          width={50}
          height={50}
          className={styles.img}
        />
        <MileCard
          variant="main"
          title="Fuel Economy"
          cityFuelEconomy={car1.cityFuelEconomy || 0}
          hwyFuelEconomy={car1.highwayFuelEconomy || 0}
          combinedFuelEconomy={car1.combinedFuelEconomy || 0}
        />
        <BarConfig data={chartData1} />
        <LineConfig data={chartData} options={options} />
      </div>

      {/* Right car comparison */}
      <div className={styles.right}>
        <h1 className={styles.title}>{car2.make} {car2.model}</h1>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt={`${car2.make} ${car2.model}`}
          sizes="100vw"
          layout="responsive"
          width={50}
          height={50}
          className={styles.img}
        />
        <MileCard
          variant="main"
          title="Fuel Economy"
          cityFuelEconomy={car2.cityFuelEconomy || 0}
          hwyFuelEconomy={car2.highwayFuelEconomy || 0}
          combinedFuelEconomy={car2.combinedFuelEconomy || 0}
        />
        <BarConfig data={chartData2} />
        <LineConfig data={chartData3} options={options} />
      </div>
    </div>
  );
}