# Travel Planning App 🌍✈️

A smart travel planning application that helps users discover destinations, optimize travel routes, and create personalized itineraries based on preferences, budget, and duration.

## Features

* 🏠 Interactive home page with dynamic backgrounds.
* 🌍 Browse destinations from different countries.
* 📍 Explore locations on an interactive map using Leaflet.
* 💰 Plan trips according to budget and duration.
* 🎯 Select countries, places, and activities.
* ⚡ Backend API support using Express.
* 🚀 Built with React and Vite.

---

# Tech Stack

### Frontend

* React
* React Router
* Vite
* React Leaflet
* CSS

### Backend

* Node.js
* Express
* CORS

---

# Project Structure

```text
Travel-planning-app/
│
├── src/
│   ├── assets/
│   ├── pages/
│   ├── styles/
│   ├── services/
│   ├── data/
│   ├── App.jsx
│   └── index.jsx
│
├── webserver.js
├── package.json
├── vite.config.js
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
cd Travel-planning-app
```

Install dependencies:

```bash
npm install
```

---

# Running the Project

## Option 1: Start frontend and backend together

```bash
npm start
```

This command starts:

* Express backend (`webserver.js`)
* Vite development server

---

## Option 2: Start separately

### Terminal 1 – Backend

```bash
node webserver.js
```

Backend runs on:

```text
http://localhost:5000
```

---

### Terminal 2 – Frontend

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173/Sem-4/
```

---

# Important Router Configuration

In `App.jsx`, use:

```jsx
<Router
  basename={import.meta.env.BASE_URL}
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }}
>
```

This ensures compatibility with GitHub Pages deployment.

---

# Available Routes

| Route         | Description            |
| ------------- | ---------------------- |
| `/`           | Home Page              |
| `/preference` | Travel Preference Page |
| `/lookaround` | Browse Destinations    |
| `/map`        | Interactive Map        |

---

# Home Page

* Dynamic image backgrounds.
* Smart travel planning information.
* Navigation to preference, destination, and map pages.

---

# Preference Page

Users can:

* Choose travel type.
* Enter budget.
* Select trip duration.
* Select countries.
* Choose places.
* Choose activities.
* Generate optimized travel recommendations.

---

# Lookaround Page

Provides:

* Destination browsing.
* Search functionality.
* Favorites feature.
* Ratings and descriptions.

---

# Map Page

Built using Leaflet and OpenStreetMap.

Features:

* Search places by country or city.
* Interactive markers.
* Detailed location information.
* Dynamic map navigation.

---

# Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

---

# Future Enhancements

* AI-based itinerary optimization.
* Hotel recommendations.
* Activity recommendation engine.
* Real-time travel information.
* Weather integration.
* Flight and transportation APIs.

---

# Author

Semester 4 Project

Travel Planning and Optimization System using route optimization and intelligent destination selection.
