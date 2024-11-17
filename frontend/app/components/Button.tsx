import React from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  stateChanger: React.Dispatch<React.SetStateAction<boolean>>; // Updated type
}

const Button: React.FC<ButtonProps> = ({ stateChanger }) => {
  const handleClick = (): void => {
    console.log("increment like count");
    stateChanger((prev) => !prev); // Call the stateChanger function
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      See the comparison
    </button>
  );
};

export default Button;
