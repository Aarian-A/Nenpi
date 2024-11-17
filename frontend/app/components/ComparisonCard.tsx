import React from "react";
import styles from "../styles/CardComparion.module.css";
import Image from "next/image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SplitButton from "react-bootstrap/SplitButton";
import { ButtonGroup } from "react-bootstrap";

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

function ComparisonCard() {
  return (
    <div className={styles.main}>
      <div className={styles.red}></div>
      <div className={styles.white}>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt="car"
          sizes="100vw"
          layout="responsive"
          width={100}
          height={100}
          style={{ borderRadius: "1rem 1rem 0rem 0rem" }}
        />

        <h1 className={styles.title}>Add first car</h1>
        <div className={styles.choiceWrapper}></div>
        <select>
          <option value="fruit">Fruit</option>

          <option value="vegetable">Vegetable</option>

          <option value="meat">Meat</option>
        </select>
      </div>
    </div>
  );
}

export default ComparisonCard;
