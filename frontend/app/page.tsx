"use client";

import styles from "../app/styles/page.module.css";
import React, { useState, useEffect } from "react";
import { GoPaperclip } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import Dashboard from "./dashboard/page";
import NavBar from "./components/Navbar";

const NenpiComponent = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState(""); // User input
  const [chatResponse, setChatResponse] = useState(""); // Chat response from the backend
  const [loading, setLoading] = useState(false); // Loading state

  // Navigation bar items
  let items = ["Home", "Product", "Service"];

  // Show the search bar after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, 1000); // Delay matches the fade-out duration
    return () => clearTimeout(timer);
  }, []);

  // Handle input change
  const handleChange = (event) => {
    setSearch(event.target.value); // Update search state with user input
  };

  // Handle send action
  const handleSend = async () => {
    setLoading(true);
    try {
        const response = await fetch("http://localhost:8000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userMessage: search }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Parsed response data:", data); // Log parsed data

            // Convert the entire response object to a string and display it
            setChatResponse(JSON.stringify(data, null, 2));
        } else {
            const errorData = await response.json();
            console.error("Error response data:", errorData); // Log error data
            setChatResponse(JSON.stringify(errorData, null, 2) || "Error occurred while chatting.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
        setChatResponse("Failed to connect to the chatbot server.");
    } finally {
        setLoading(false);
    }
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
              value={search} // Controlled input
            />
            <div className={styles.icon} onClick={handleSend}>
              <IoIosSend size={"1.75rem"} />
            </div>
          </div>
          {/* Display loading or response */}
          {loading && <p>Loading...</p>}
          {chatResponse && <pre className={styles.response}>{chatResponse}</pre>}
        </div>
        <Dashboard />
      </div>
    </>
  );
};

export default NenpiComponent;
