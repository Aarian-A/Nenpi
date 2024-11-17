import React from "react";
import Card from "../components/Card";
import styles from "../styles/dashboard.module.css";
import CarCard from "../components/CarCard";
import cardStyles from "../styles/card.module.css";
import ScoreCard from "../components/ScoreCard";

function Dashboard() {
  return (
    <div className={styles.main}>
      <div className={styles.gridContainer}>
        <CarCard />
        <ScoreCard />
        <Card variant={"main"} title={"City MPG"} statistic={35} />
        <Card variant={"main"} title={"HWY MPG"} statistic={18} />
        <Card variant={"main"} title={"MPG"} statistic={5} />
        <Card variant={"main"} title={"MPG"} statistic={1} />
      </div>
    </div>
  );
}

export default Dashboard;
