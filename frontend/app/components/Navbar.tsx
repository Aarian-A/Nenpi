"use client";

import { useState } from "react";
import "../styles/navbar.css";

// interface NavBarProps {
//   navItems: string[];
//   className?: string;
// }

interface NavBarProps {
  navItems: string[];
}

function Navbar({ navItems }: NavBarProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <nav className="fixedNavBar navbar-white horizontal-nav navbar navbar-light bg-white shadow">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div onClick={() => window.location.href = "#"} style={{ cursor: "pointer" }}>
              <a className="nav-link" href="#" style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 0}}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#C34A4C"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
              >
              <p style={{ margin: 0 }}>Nenpi</p>
              <h1 style={{ margin: 0 }}>燃費</h1>
            </a>
        </div>
        <div className="horizontal-nav">
          {navItems.map((item, index) => (
            <div
              key={item}
              className={`nav-item ${selectedIndex === index ? "active" : ""}`}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={() => setSelectedIndex(index)}
              onMouseLeave={() => setSelectedIndex(-1)}
            >
              <a className="nav-link" href="#">
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
