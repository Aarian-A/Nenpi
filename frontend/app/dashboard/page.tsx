import React from "react";
import Card from "../components/Card";
import styles from "../styles/dashboard.module.css";
import CarCard from "../components/CarCard";
import ScoreCard from "../components/ScoreCard";
import RadarGraph from "../components/RadarGraph";
import MileCard from "../components/MileCard";
import BarChart from "../components/BarChart";

function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.gridContainer}>
        <CarCard />
        <ScoreCard />
        <RadarGraph />
        <MileCard variant={"main"} title={"MPG"} statistic={123} />
        <BarChart />
      </div>
    </div>
  );
}

export default Dashboard;
