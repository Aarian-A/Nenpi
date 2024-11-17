import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Toyota Rav4</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* Top Banner */}
        <div className={styles.banner}>
          <div className={styles.textContainer}>
            <h1 className={styles.carTitle}>Toyota Rav4</h1>
            <p className={styles.tagline}>Let's go places</p>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/toyota-rav4.png" // Replace with the correct image path
              alt="Toyota Rav4"
              width={400}
              height={200}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <span className={styles.sidebarText}>Fuel Eco</span>
        </div>

        {/* Grid Section */}
        <div className={styles.grid}>
          <div className={styles.gridItem}></div>
          <div className={styles.gridItem}></div>
          <div className={styles.gridItem}></div>
          <div className={styles.gridItem}></div>
        </div>
      </main>
    </div>
  );
}
