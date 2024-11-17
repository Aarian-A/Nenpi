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
      <div className={styles.circle} style={circleStyle}>
        <p className={styles.stat}>{statistic}</p>
      </div>
    </div>
  );
};

export default Card;
