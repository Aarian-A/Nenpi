

import React from "react";
import styles from "../styles/Dashboard.module.css";
import CarCard from "../components/CarCard";
import ScoreCard from "../components/ScoreCard";
import RadarGraph from "../components/RadarGraph";
import MileCard from "../components/MileCard";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";

function Dashboard({ chatResponse }) {
  let carData = null;

  if (chatResponse) {
    try {
      const responseJson = JSON.parse(chatResponse);
      if (responseJson.results && responseJson.results.length > 0) {
        carData = responseJson.results[0]; // Use the first car
      }
    } catch (error) {
      console.error("Error parsing chatResponse:", error);
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.gridContainer}>
        {carData ? (
          <>
            <CarCard carData={carData} /> {/* Pass car data */}
            <ScoreCard />
            <RadarGraph />
           <MileCard
              variant="main"
              title="Fuel Economy"
              cityFuelEconomy={carData.cityFuelEconomy || 0}
              hwyFuelEconomy={carData.highwayFuelEconomy || 0}
              combinedFuelEconomy={carData.combinedFuelEconomy || 0}
            />
           <BarChart carData={[carData]} />
           <LineChart carData={carData} />
          </>
        ) : (
          <p>Loading car data...</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

