"use client";

import styles from "../app/styles/page.module.css";
import React, { useState, useEffect } from "react";
import { GoPaperclip } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import Dashboard from "./dashboard/page";
import NavBar from "./components/Navbar";

const NenpiComponent = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");

  let items = ["Home", "Product", "Service"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, 1000); // Delay matches the fade-out duration
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div>
        <NavBar navItems={items} />
        <div className={`${styles.main}`}>
          <h1 className={`${styles.title} ${styles.fadeOut}`}>Nenpi</h1>
          <div
            className={`${styles.searchBar} ${
              showSearchBar ? styles.searchBarVisible : ""
            }`}
          >
            <GoPaperclip size={"1.75rem"} />
            <input
              type="text"
              className={styles.input}
              placeholder="Message Nenpi"
              onChange={handleChange}
            />
            <div className={styles.icon}>
              <IoIosSend size={"1.75rem"} />
            </div>
          </div>
        </div>
        <Dashboard />
      </div>
    </>
  );
};

export default NenpiComponent;
