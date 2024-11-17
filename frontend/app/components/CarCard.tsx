import React from "react";
import styles from "../styles/CarCard.module.css";

function CarCard({ carData }) {
  if (!carData) {
    return <p>Loading car data...</p>; // Fallback if no data is passed
  }

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>{`${carData.make} ${carData.model}`}</h1>
        <ul>
          <li>{carData.make}</li>
          <li>{carData.model}</li>
          <li>City MPG: {carData.cityFuelEconomy}</li>
          <li>Highway MPG: {carData.highwayFuelEconomy}</li>
          <li>Combined MPG: {carData.combinedFuelEconomy}</li>
        </ul>
      </div>
    </div>
  );
}

export default CarCard;
