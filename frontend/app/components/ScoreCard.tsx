import React from "react";
import styles from "../styles/ScoreCard.module.css";

function ScoreCard() {
  return (
    <div className={styles.main}>
      <div>
        <h1 className={styles.title}>Eco-Score</h1>
      </div>
      <div className={styles.circle}>
        <h2 className={styles.point}>5</h2>
      </div>
    </div>
  );
}

export default ScoreCard;
