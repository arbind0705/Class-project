import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../styles/map.css"; // Import CSS

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

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
    <div className="map-page">
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
      <div className="map-container">
        <MapContainer 
          center={[51.505, -0.09]} 
          zoom={13} 
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredPlaces.map((place, index) => (
            <Marker 
              key={index} 
              position={place.coords}
              icon={DefaultIcon}
            >
              <Popup>{place.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Route Box */}
      <div className="route-box">
        <h3>Route Information</h3>
        <p>Best travel route will be displayed here.</p>
      </div>
    </div>
  );
};

export default MapPage;
