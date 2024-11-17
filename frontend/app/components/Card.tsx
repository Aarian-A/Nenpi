import React from "react";
import styles from "../styles/card.module.css";

// Define the types for the props
interface CardProps {
  variant: "special" | "main"; // Can be either 'special' or 'main'
  title: string;
  statistic: string;
}

const Card: React.FC<CardProps> = ({ variant, title, statistic }) => {
  // Define styles based on the variant prop
  const cardStyle = variant === "special" ? styles.special : styles.main;

  return (
    <div className={cardStyle}>
      <h2>{title}</h2>
      <p>{statistic}</p>
    </div>
  );
};

export default Card;
