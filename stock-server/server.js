const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 5001;

// Use CORS middleware
app.use(cors());

app.get('/api/finance/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log("Requested symbol:", symbol);
    try {
        const response = await axios.get(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Mock Forecast Data Endpoint
app.get('/api/forecast/:symbol', async (req, res) => {
    const symbol = req.params.symbol;
    console.log("Requested forecast for symbol:", symbol);
    
    // Generate mock forecast data for the next 7 days
    const today = new Date();
    const forecastData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(today.getDate() + i); // Increment date
        return {
            date: date.toISOString().split('T')[0], // Format YYYY-MM-DD
            price: (Math.random() * 100 + 50).toFixed(2), // Random price between 50-150
        };
    });
    
    res.json(forecastData);
});


app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
