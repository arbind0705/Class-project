const express = require('express');
const axios = require('axios');
const { exec } = require('child_process'); // To call C++ code if needed
const cors = require('cors'); // Import cors

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS before defining routes
app.use(express.json());

// API key and host to avoid repetition in the headers
const apiHeaders = {
  'x-rapidapi-key': 'd8666244d8msh21a57fa6ccc2136p11f34djsn499a61dd9aae',
  'x-rapidapi-host': 'skyscanner80.p.rapidapi.com'
};

// Define an API route to fetch tourist places (example from Skyscanner API)
app.get('/api/tourist-places', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://skyscanner80.p.rapidapi.com/api/v1/hotels/auto-complete',
      params: {
        query: 'new',
        market: 'US',
        locale: 'en-US'
      },
      headers: apiHeaders // Use the headers here
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Define another API route for hotel search (example from Skyscanner)
app.get('/api/hotel-search', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://skyscanner80.p.rapidapi.com/api/v1/hotels/search',
      params: {
        entityId: '27539520',
        rooms: '1',
        adults: '1',
        resultsPerPage: '15',
        page: '1',
        priceType: 'PRICE_PER_NIGHT',
        sorting: '-relevance',
        currency: 'USD',
        market: 'US',
        locale: 'en-US'
      },
      headers: apiHeaders // Use the headers here
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Define an API route for flight cost (example from Skyscanner)
app.get('/api/flight-cost', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://skyscanner80.p.rapidapi.com/api/v1/flights/search-everywhere',
      params: {
        fromId: 'eyJzIjoiVFlPQSIsImUiOiIyNzU0MjA4OSIsImgiOiIyNzU0MjA4OSIsInAiOiJDSVRZIn0=',
        adults: '1',
        cabinClass: 'economy',
        currency: 'USD',
        market: 'US',
        locale: 'en-US'
      },
      headers: apiHeaders // Use the headers here
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Sample API route to fetch tour costs (example from Booking.com API)
app.get('/api/tour-cost', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://booking-com-api5.p.rapidapi.com/attraction/product-detail',
      params: {
        slug: 'prgsnhbbbkga-borobudur-temple-climb-to-the-top-prambanan-temple-1-day-tour',
        limit: '1',
        page: '1',
        currency_code: 'USD',
        languagecode: 'en'
      },
      headers: {
        'x-rapidapi-key': 'd8666244d8msh21a57fa6ccc2136p11f34djsn499a61dd9aae',
        'x-rapidapi-host': 'booking-com-api5.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
