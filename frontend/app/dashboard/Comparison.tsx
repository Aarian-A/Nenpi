import React, { useState } from "react";
import Card from "../components/Card";
import styles from "../styles/Comparison.module.css";
import CarCard from "../components/CarCard";
import cardStyles from "../styles/card.module.css";
import ScoreCard from "../components/ScoreCard";
// import ComparisonCard from "../components/ComparisonCard";

function CompDashboard() {
  const [cards, setCards] = useState<number[]>([]);

  const addCard = () => {
    if (cards.length < 4) {
      setCards([...cards, cards.length + 1]);
    }
  };

  const searchCar = (event: { target: { value: string } }) => {
    console.log(event.target.value);
  };

  return (
    <div className={styles.main}>
      <input type="text" placeholder="Enter Car Name" onChange={searchCar} />
      <button onClick={addCard}>Add Comparison Card</button>
      <div className={styles.gridContainer}>
        {/* {cards.map((card, index) => (
        //   <ComparisonCard 
        //     key={index}
        //     />
        ))} */}
      </div>
    </div>
  );
}

export default CompDashboard;
