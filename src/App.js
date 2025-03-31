import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home";
import PreferencePage from "./pages/preference";
import MapPage from "./pages/map";
import DatabasePage from "./pages/lookaround";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preference" element={<PreferencePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/lookaround" element={<DatabasePage />} />

      </Routes>
    </Router>
  );
}

export default App;
