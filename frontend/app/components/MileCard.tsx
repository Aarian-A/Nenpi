import React from "react";
import styles from "../styles/Card.module.css";

// Define the types for the props
interface MileCardProps {
  variant: "special" | "main"; // Can be either 'special' or 'main'
  title: string;
  cityFuelEconomy: number; // City fuel economy
  hwyFuelEconomy: number; // Highway fuel economy
  combinedFuelEconomy: number; // Combined fuel economy
}

const MileCard: React.FC<MileCardProps> = ({
  variant,
  title,
  cityFuelEconomy,
  hwyFuelEconomy,
  combinedFuelEconomy,
}) => {
  const cardStyle = variant === "special" ? styles.special : styles.main;

  return (
    <div className={cardStyle}>
      <h2>{title}</h2>

      <p className={styles.mileHeading}>
        City Fuel Economy: <span className={styles.fuelValue}>{cityFuelEconomy} MPG</span>
      </p>
      <progress
        value={cityFuelEconomy / 50}
        max={1}
        className={styles.progress}
      />
      <div className={styles.ranges}>
        <p className={styles.rangeText}>Low Mile</p>
        <p className={styles.rangeText}>Balanced Mile</p>
        <p className={styles.rangeText}>Great Mile</p>
      </div>

      <p className={styles.mileHeading}>
        HWY Fuel Economy: <span className={styles.fuelValue}>{hwyFuelEconomy} MPG</span>
      </p>
      <progress value={hwyFuelEconomy / 50} max={1} className={styles.progress} />
      <div className={styles.ranges}>
        <p className={styles.rangeText}>Low Mile</p>
        <p className={styles.rangeText}>Balanced Mile</p>
        <p className={styles.rangeText}>Great Mile</p>
      </div>

      <p className={styles.mileHeading}>
        Combined Fuel Economy: <span className={styles.fuelValue}>{combinedFuelEconomy} MPG</span>
      </p>
      <progress
        value={combinedFuelEconomy / 50}
        max={1}
        className={styles.progress}
      />
      <div className={styles.ranges}>
        <p className={styles.rangeText}>Low Mile</p>
        <p className={styles.rangeText}>Balanced Mile</p>
        <p className={styles.rangeText}>Great Mile</p>
      </div>
    </div>
  );
};

export default MileCard;