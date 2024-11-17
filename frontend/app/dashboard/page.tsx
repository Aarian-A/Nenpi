import React from "react";
import Card from "../components/Card";
import styles from "../styles/dashboard.module.css";

function page() {
  return (
    <div className={styles.main}>
      Page
      <Card />
    </div>
  );
}

export default page;
