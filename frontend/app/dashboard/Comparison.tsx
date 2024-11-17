import React, { useState } from "react";
import styles from "../styles/Comparison.module.css";
import ComparisonCard from "../components/ComparisonCard";
import Button from "../components/Button";
import Summary from "../components/Summary";

interface CompDashboardProps {
  chatResponse: string; // Define the type for the prop
}

function CompDashboard({ chatResponse }: CompDashboardProps) {
  const [showComparison, setShowComparison] = useState(false);
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [carData1, setCarData1] = useState("");
  const [carData2, setCarData2] = useState("");

  console.log("Chat Response in CompDashboard:", chatResponse); // Use the data

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Compare cars</h1>
      {showComparison ? (
        <Summary carData1={carData1.toString()} carData2={carData2.toString()}/>
      ) : (
        <>
          <p className={styles.subheading}>
            Choose two cars to compare side-by-side
          </p>
          <div className={styles.carCardWrapper}>
            <ComparisonCard carNumber={"first"} state={search1} stateChanger={setSearch1} />
            <ComparisonCard carNumber={"second"} state={search2} stateChanger={setSearch2}/>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button stateChanger={setShowComparison} stateDataChanger1={setCarData1} stateDataChanger2={setCarData2} search1={search1} search2={search2} />
          </div>
        </>
      )}
    </div>
  );
}

export default CompDashboard;