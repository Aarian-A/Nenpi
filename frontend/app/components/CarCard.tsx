import React from "react";
import styles from "../styles/CarCard.module.css";
import Image from "next/image";

function Card() {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h1>Toyota Camry</h1>
      </div>
      <div className={styles.imgContainer}>
        <Image
          src="https://www.motortrend.com/uploads/2021/12/2022-Toyota-Camry-SE-11.jpg"
          alt="car"
          sizes="100vw"
          layout="responsive"
          width={200}
          height={200}
          style={{ borderRadius: "2rem" }}
        />
      </div>
    </div>
  );
}

export default Card;
