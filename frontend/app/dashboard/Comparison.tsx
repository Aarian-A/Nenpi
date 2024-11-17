import React, { useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Comparison.module.css";
import CarCard from "../components/CarCard";
import cardStyles from "../styles/card.module.css";
import ScoreCard from "../components/ScoreCard";
import ComparisonCard from "../components/ComparisonCard";
import Button from "../components/Button";
import Summary from "../components/Summary";

// import ComparisonCard from "../components/ComparisonCard";

function CompDashboard() {
  // const [cards, setCards] = useState<number[]>([]);

  // const addCard = () => {
  //   if (cards.length < 4) {
  //     setCards([...cards, cards.length + 1]);
  //   }
  // };

  // const searchCar = (event: { target: { value: string } }) => {
  //   console.log(event.target.value);
  // };

  const [showComparison, setShowComparison] = useState(false);

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

  return (
    // <div className={styles.main}>
    //   <input type="text" placeholder="Enter Car Name" onChange={searchCar} />
    //   <button onClick={addCard}>Add Comparison Card</button>
    //   <div className={styles.gridContainer}>
    //     {/* {cards.map((card, index) => (
    //     //   <ComparisonCard
    //     //     key={index}
    //     //     />
    //     ))} */}
    //   </div>
    // </div>

    <div className={styles.main}>
      <h1 className={styles.title}>Compare cars</h1>
      {showComparison ? (
        <Summary />
      ) : (
        <>
          <p className={styles.subheading}>
            Choose two cars to compare side-by-side
          </p>
          <div className={styles.carCardWrapper}>
            <ComparisonCard carNumber={"first"} />
            <ComparisonCard carNumber={"second"} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button stateChanger={setShowComparison} />
          </div>
        </>
      )}
    </div>
  );
}

export default CompDashboard;
