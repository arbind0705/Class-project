import React, { useState, useEffect } from "react";
import m1 from "../assets/m1.jpg";
import m2 from "../assets/m2.jpg";
import m3 from "../assets/m3.jpg";
import m4 from "../assets/m4.jpg";
import m5 from "../assets/m5.jpg";
import "../styles/lookaround.css";

const backgroundImages = [m1, m2, m3, m4, m5];

const Lookaround = () => {
  const [places, setPlaces] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  useEffect(() => {
    fetch("/dummy_data.json")
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = places.filter(
      (place) =>
        (place.continent && place.continent.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (place.country && place.country.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredData(filtered.sort((a, b) => b.rating - a.rating));
    setCurrentPage(0);
  };

  const toggleFavorite = (placeId) => {
    setFavorites((prevFavs) => {
      const newFavs = new Set(prevFavs);
      if (newFavs.has(placeId)) {
        newFavs.delete(placeId);
      } else {
        newFavs.add(placeId);
      }
      return newFavs;
    });
  };

  const itemsPerPage = 6;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <div className="lookaround-container" style={{ backgroundImage: `url(${backgroundImages[backgroundIndex]})` }}>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by continent or country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
              <th>Continent</th>
              <th>Budget</th>
              <th>Best Time to Go</th>
              <th>Avg. Tourists Annually</th>
              <th>Rating</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((place) => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.country}</td>
                <td>{place.continent}</td>
                <td>{place.budget}</td>
                <td>{place.best_time_to_go}</td> {/* Fixed key */}
                <td>{place.average_tourists_annually.toLocaleString()}</td> {/* Now showing tourists count */}
                <td>{place.rating}</td>
                <td>
                  <span
                    className={`fav-button ${favorites.has(place.id) ? "selected" : ""}`}
                    onClick={() => toggleFavorite(place.id)}
                  >
                    ★
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="pagination-btn"
            onClick={() => setCurrentPage((prev) => (endIndex < filteredData.length ? prev + 1 : prev))}
            disabled={endIndex >= filteredData.length}
          >
            Next
          </button>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="favorites-section">
        <button className="fav-list-btn">
          ★ Favorites ({favorites.size})
        </button>
        <div className="fav-list">
          {favorites.size === 0 ? (
            <p>No favorite places selected.</p>
          ) : (
            <ul>
              {Array.from(favorites).map((favId) => {
                const fav = places.find((place) => place.id === favId);
                return fav ? <li key={fav.id}>{fav.name} - {fav.country}</li> : null;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lookaround;
