import React from "react";
import Card from "../components/Card";
import styles from "../styles/dashboard.module.css";
import CarCard from "../components/CarCard";
import cardStyles from "../styles/Carcard.module.css";
import ScoreCard from "../components/ScoreCard";

function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.gridContainer}>
        <CarCard />
        <ScoreCard />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Dashboard;
