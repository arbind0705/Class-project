import React, { useState, useEffect } from "react";
import "../styles/preference.css";
import vid2 from "../assets/vid 2.mp4";

const PreferencePage = () => {
  const [selectedType, setSelectedType] = useState("Domestic");
  const [budget, setBudget] = useState("");
  const [days, setDays] = useState(3);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [isEditingDays, setIsEditingDays] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [placeList, setPlaceList] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  // Simulate backend call for Country & Place List
  const fetchData = async (type) => {
    setStatusMessage("Fetching...");
    setTimeout(() => {
      setStatusMessage("Offline");
    }, 1000); // Simulating a delay
  };

  return (
    <div className="preference-page">
      <video className="background-video" autoPlay loop muted>
        <source src={vid2} type="video/mp4" />
      </video>

      <div className="content-box">
        <h1 className="title">Select Your Travel Preferences</h1>

        {/* Travel Type Buttons */}
        <div className="button-group">
          <button className="preference-button" onClick={() => setSelectedType("Domestic")}>
            Domestic
          </button>
          <button className="preference-button" onClick={() => setSelectedType("International")}>
            International
          </button>
          <button className="preference-button" onClick={() => setSelectedType("Inter-Country")}>
            Inter-Country
          </button>
        </div>

        {/* Budget & Days Section */}
        <div className="budget-days">
          {/* Budget Input */}
          <div className="input-container">
            <span className="icon">💰</span>
            {isEditingBudget ? (
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                onBlur={() => setIsEditingBudget(false)}
                autoFocus
                className="full-width-input"
              />
            ) : (
              <button className="preference-button" onClick={() => setIsEditingBudget(true)}>
                {budget ? `₹ ${budget}` : "Enter Budget"}
              </button>
            )}
          </div>

          {/* Days Input */}
          <div className="input-container">
            <span className="icon">🌞🌙</span>
            {isEditingDays ? (
              <input
                type="number"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                onBlur={() => setIsEditingDays(false)}
                autoFocus
                className="full-width-input"
              />
            ) : (
              <button className="preference-button" onClick={() => setIsEditingDays(true)}>
                {days} Days
              </button>
            )}
          </div>
        </div>

        {/* Country & Place Selection */}
        <div className="dropdown-row">
          <button className="preference-button" onClick={() => fetchData("country")}>
            Select Country
          </button>
          <button className="preference-button" onClick={() => fetchData("place")}>
            Select Place
          </button>
        </div>

        <p className="status-message">{statusMessage}</p>

        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default PreferencePage;
