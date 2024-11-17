import React from "react";
import styles from "../styles/card.module.css";

// Define the types for the props
interface CardProps {
  variant: "special" | "main"; // Can be either 'special' or 'main'
  title: string;
  statistic: number;
}

const Card: React.FC<CardProps> = ({ variant, title, statistic }) => {
  // Define styles based on the variant prop
  const cardStyle = variant === "special" ? styles.special : styles.main;

  // Determine the circle color based on the statistic
  const getCircleColor = () => {
    if (statistic < 10) return "linear-gradient(to top, #B32113, #8F1600)";
    if (statistic < 20) return "linear-gradient(to bottom, #ffdd3c, #ffea61)";
    if (statistic < 30) return "linear-gradient(to top, green, lightgreen)";
  };

  const circleStyle = {
    background: getCircleColor(),
  };

  return (
    <div className={cardStyle}>
      <h2>{title}</h2>

      <p className={styles.mileHeading}>City Fuel Economy</p>
      <progress value={0.2} className={styles.progress} />
      <div className={styles.ranges}>
        <p className={styles.rangeText}>Low Mile</p>
        <p className={styles.rangeText}>Balanced Mile</p>
        <p className={styles.rangeText}>Great Mile</p>
      </div>

      <p className={styles.mileHeading}>HWY Fuel Economy</p>
      <progress value={0.5} className={styles.progress} />
      <div className={styles.ranges}>
        <p className={styles.rangeText}>Low Mile</p>
        <p className={styles.rangeText}>Balanced Mile</p>
        <p className={styles.rangeText}>Great Mile</p>
      </div>

      <p className={styles.mileHeading}>HWY Fuel Economy</p>
      <progress value={0.7} className={styles.progress} />
      <div className={styles.ranges}>
        <p className={styles.rangeText}>Low Mile</p>
        <p className={styles.rangeText}>Balanced Mile</p>
        <p className={styles.rangeText}>Great Mile</p>
      </div>
    </div>
  );
};

export default Card;
