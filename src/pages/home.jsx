import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css"; // Make sure this is in the same folder

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Welcome to Travel Planning App</h1>
      <p className="subtitle">
        Plan your perfect vacation with the best route and experiences.
      </p>
      <div className="button-group">
        <button className="nav-button" onClick={() => navigate("/preference")}>
          Set Preferences
        </button>
        <button className="nav-button" onClick={() => navigate("/map")}>
          View Map
        </button>
        <button className="nav-button" onClick={() => navigate("/lookaround")}>
          Browse Destinations
        </button>
      </div>
    </div>
  );
};

export default HomePage;
