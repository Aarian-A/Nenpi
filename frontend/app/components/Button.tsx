"use client";

import React, { useState } from "react";
import styles from "../styles/Button.module.css";

interface ButtonProps {
  stateChanger: React.Dispatch<React.SetStateAction<boolean>>;
  stateDataChanger1: React.Dispatch<React.SetStateAction<any>>;
  stateDataChanger2: React.Dispatch<React.SetStateAction<any>>;
  search1: string;
  search2: string;
}

const Button: React.FC<ButtonProps> = ({
  stateChanger,
  search1,
  search2,
  stateDataChanger1,
  stateDataChanger2,
}) => {
  const [loading, setLoading] = useState(false); // Move the loading state to the top level

  const handleClick = async (): Promise<void> => {
    console.log("Search Input 1:", search1);
    console.log("Search Input 2:", search2);

    setLoading(true); // Set loading to true at the start of the async process
    try {
      // Fetch car data for the first search input
      const response1 = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: search1 }),
      });

      if (response1.ok) {
        const data1 = await response1.json();
        console.log("Car Data 1:", data1);
        stateDataChanger1(JSON.stringify(data1, null, 2));
      } else {
        const errorData1 = await response1.json();
        console.error("Error fetching car 1 data:", errorData1);
        stateDataChanger1(
          JSON.stringify(errorData1, null, 2) || "Error occurred while fetching car 1."
        );
      }

      // Fetch car data for the second search input
      const response2 = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: search2 }),
      });

      if (response2.ok) {
        const data2 = await response2.json();
        console.log("Car Data 2:", data2);
        stateDataChanger2(JSON.stringify(data2, null, 2));
      } else {
        const errorData2 = await response2.json();
        console.error("Error fetching car 2 data:", errorData2);
        stateDataChanger2(
          JSON.stringify(errorData2, null, 2) || "Error occurred while fetching car 2."
        );
      }
    } catch (error) {
      console.error("Error in fetching data:", error);
      stateDataChanger1("Failed to fetch car 1 data.");
      stateDataChanger2("Failed to fetch car 2 data.");
    } finally {
      setLoading(false); // Set loading to false after the process finishes
    }

    // Toggle the state to show comparison
    stateChanger((prev) => !prev);
  };

  return (
    <button className={styles.button} onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "See the Comparison"}
    </button>
  );
};

export default Button;
