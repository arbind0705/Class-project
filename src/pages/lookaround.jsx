import React, { useState } from "react";
import "../styles/lookaround.css";

const LookaroundPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [favorites, setFavorites] = useState([]);

  // Sample data - replace with actual data from your backend
  const destinations = [
    {
      id: 1,
      name: "Paris, France",
      description: "The City of Light, known for its iconic Eiffel Tower and world-class museums.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      country: "France",
      best_time_to_go: "April to October",
      isFavorite: false
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      description: "A perfect blend of ultra-modern technology and traditional culture.",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
      country: "Japan",
      best_time_to_go: "March to May",
      isFavorite: false
    },
    {
      id: 3,
      name: "New York, USA",
      description: "The city that never sleeps, offering endless entertainment and cultural experiences.",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      country: "USA",
      best_time_to_go: "April to June",
      isFavorite: false
    },
    {
      id: 4,
      name: "Sydney, Australia",
      description: "Beautiful harbor city with stunning beaches and iconic Opera House.",
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
      country: "Australia",
      best_time_to_go: "October to April",
      isFavorite: false
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "favorites" && favorites.includes(dest.id));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="lookaround-container">
      <div className="header">
        <h1>Browse Destinations</h1>
        <p>Discover amazing places around the world and start planning your next adventure</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button>Search</button>
      </div>

      <div className="filters">
        <button
          className={`filter-button ${activeFilter === "all" ? "active" : ""}`}
          onClick={() => setActiveFilter("all")}
        >
          All Destinations
        </button>
        <button
          className={`filter-button ${activeFilter === "favorites" ? "active" : ""}`}
          onClick={() => setActiveFilter("favorites")}
        >
          Favorites
        </button>
      </div>

      <div className="destinations-grid">
        {filteredDestinations.map((dest) => (
          <div key={dest.id} className="destination-card">
            <img
              src={dest.image}
              alt={dest.name}
              className="destination-image"
            />
            <div className="destination-info">
              <h3>{dest.name}</h3>
              <p>{dest.description}</p>
              <div className="destination-meta">
                <span>Best time to go: {dest.best_time_to_go}</span>
                <button
                  className={`favorite-button ${favorites.includes(dest.id) ? "active" : ""}`}
                  onClick={() => toggleFavorite(dest.id)}
                >
                  ❤
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LookaroundPage;
