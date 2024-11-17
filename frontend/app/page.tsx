"use client";

import styles from "../app/styles/page.module.css";
import React, { useState, useEffect } from "react";
import { GoPaperclip } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import Dashboard from "./dashboard/page";
import NavBar from "./components/Navbar";
import CompDashboard from "./dashboard/Comparison";
import WaveBackground from "./components/WaveBackground";

const NenpiComponent = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [chatResponse, setChatResponse] = useState(""); // Chat response from the backend
  const [loading, setLoading] = useState(false); // Loading state

  let items = ["Home", "Product", "Service"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSearchBar(true);
    }, 500); // Delay matches the fade-out duration
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
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
        setChatResponse(
          JSON.stringify(errorData, null, 2) || "Error occurred while chatting."
        );
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
          <div>
            <h1 className={`${styles.title}`}>Nenpi 燃費</h1>
          </div>
          <div className={styles.inputContainer}>
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
                value={search}
              />
              <div className={styles.icon} onClick={handleSend}>
                <IoIosSend size={"1.75rem"} />
              </div>

              {/* {loading && <p>Loading...</p>}
              {chatResponse && (
                <pre className={styles.response}>{chatResponse}</pre>
              )} */}
            </div>
          </div>
        </div>
        {/* Pass chatResponse as a prop to Dashboard */}
        <Dashboard chatResponse={chatResponse} />
        <CompDashboard chatResponse={chatResponse}/>
        <WaveBackground />
      </div>
    </>
  );
};

export default NenpiComponent;
