import React, { useState } from "react";
import styles from "../styles/CardComparion.module.css";
import Image from "next/image";

interface CompCardProps {}

// const ComparisonCard: React.FC<CompCardProps> = ({}){

// }

// const Card: React.FC<CardProps> = ({ variant, title, statistic }) => {
//   // Define styles based on the variant prop
//   const cardStyle = variant === "special" ? styles.special : styles.main;

//   return (
//     <div className={cardStyle}>
//       <h2>{title}</h2>
//       <p>{statistic}</p>
//     </div>
//   );
// };

// export default ComparisonCard;

interface ComparisonCardProps {
  state: string
  carNumber: string; // Define the expected prop type
  stateChanger: React.Dispatch<React.SetStateAction<string>>; 
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ carNumber, state, stateChanger }) => {
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    stateChanger(event.target.value);
  };

  return (
    <div className={styles.main}>
      <div className={styles.red}></div>
      <div className={styles.white}>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt="car"
          sizes="80vw"
          layout="responsive"
          width={80}
          height={100}
          className={styles.img}
        />

        <h1 className={styles.title}>Add {carNumber} car</h1>
        <input
                type="text"
                className={styles.input}
                placeholder="Type your car"
                onChange={handleChange}
                value={state}
              />
      </div>
    </div>
  );
};

export default ComparisonCard;
