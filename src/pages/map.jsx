import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/map.css"; // Import CSS

// Custom Icons for Different Places
const icons = {
  tourist: new L.Icon({ iconUrl: "/tourist.png", iconSize: [30, 30] }),
  hotel: new L.Icon({ iconUrl: "/hotel.png", iconSize: [30, 30] }),
  airport: new L.Icon({ iconUrl: "/airport.png", iconSize: [30, 30] }),
};

// Sample Places Data (Replace with API Data Later)
const placesData = [
  { name: "London Eye", type: "tourist", coords: [51.5033, -0.1195] },
  { name: "Big Ben", type: "tourist", coords: [51.5007, -0.1246] },
  { name: "Hilton Hotel", type: "hotel", coords: [51.5074, -0.1278] },
  { name: "Heathrow Airport", type: "airport", coords: [51.4700, -0.4543] },
];

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter places based on search input
  const filteredPlaces = placesData.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="map-container">
      {/* Sidebar for Search */}
      <div className="sidebar">
        <h2>Find Places</h2>
        <input
          type="text"
          placeholder="Search places..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul>
          {filteredPlaces.map((place, index) => (
            <li key={index}>{place.name}</li>
          ))}
        </ul>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <MapContainer center={[51.505, -0.09]} zoom={13} className="map">
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {filteredPlaces.map((place, index) => (
            <Marker key={index} position={place.coords} icon={icons[place.type]}>
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Right-Side Info Panel */}
      <div className="info-section">
        <h2>Route Information</h2>
        <p>Best travel route will be displayed here.</p>
      </div>
    </div>
  );
};

export default MapPage;
