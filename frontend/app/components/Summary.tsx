import React from "react";
import styles from "../styles/Summary.module.css";
import Image from "next/image";
import MileCard from "./MileCard";
import BarConfig from "./Bar";
import LineConfig from "./Line";

export default function Summary() {
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
  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales Data",
        data: [10, 20, 30, 40, 50],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fill: true, // Optional: fill the area under the line
        tension: 0.4, // Optional: curvature of the line
      },
    ],
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <h1 className={styles.title}>Toyota Camry</h1>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt="car"
          sizes="100vw"
          layout="responsive"
          width={50}
          height={50}
          className={styles.img}
        />
        <MileCard variant={"main"} title={""} statistic={0} />
        <BarConfig data={chartData} />
        <LineConfig data={lineData} />
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>Toyota Camry</h1>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt="car"
          sizes="100vw"
          layout="responsive"
          width={50}
          height={50}
          className={styles.img}
        />
        <MileCard variant={"main"} title={""} statistic={0} />
        <BarConfig data={chartData} />
        <LineConfig data={lineData} />
      </div>
    </div>
  );
}
