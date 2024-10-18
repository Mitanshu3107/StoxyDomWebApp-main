/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router
import Header from "./components/Header";
import StockTicker from "./components/StockTicker";
import axios from "axios"; 
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import StockSearchPage from "./components/StockSearchPage"; // Import your stock search page component
import HomePage from "./components/HomePage";

const stocks = [
  "AAPL",
  "GOOGL",
  "META",
  "TSLA",
  "AMZN",
  "NFLX",
  "ADBE",
  "CRM",
  "WMT",
  "JNJ",
  "KO",
  "MA",
  "BAC",
  "INTC",
  "NKE",
  "SBUX",
  "F",
  "DIS",
  "IBM",
]; // Stock symbols

const API_BASE_URL = "https://api.allorigins.win/get?url=";
const INTERVAL = "1d";
const MAX_RETRIES = 5;

const App = () => {
  const [stockData, setStockData] = useState({});
  const [fetchError, setFetchError] = useState(false);
  const [stockSymbol, setStockSymbol] = useState("MSFT");

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const requests = stocks.map(async (stockSymbol) => {
          let retryCount = 0;
          let responseData = null;
          while (retryCount < MAX_RETRIES) {
            try {
              const apiUrl = `${API_BASE_URL}${encodeURIComponent(
                `https://query1.finance.yahoo.com/v8/finance/chart/${stockSymbol}?interval=${INTERVAL}`
              )}`;
              const response = await axios.get(apiUrl);
              responseData = response.data.contents;
              break; // Break out of the retry loop if request is successful
            } catch (error) {
              console.error(`Error fetching data for ${stockSymbol}:`, error);
              retryCount++;
            }
          }
          if (!responseData) {
            throw new Error(`Failed to fetch data for ${stockSymbol}`);
          }
          return { [stockSymbol]: responseData };
        });

        const stockDataArray = await Promise.all(requests);
        const mergedStockData = Object.assign({}, ...stockDataArray);
        setStockData(mergedStockData);
        setFetchError(false); // Reset fetch error state if request succeeds
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setFetchError(true);
        // Handle error
      }
    };

    const intervalId = setInterval(fetchStockData, 60000); // Fetch data every minute

    fetchStockData(); // Initial fetch

    return () => clearInterval(intervalId); // Cleanup interval
  }, []);

  return (
    <Router> {/* Wrap the app in Router */}
      <div>
        {fetchError ? (
          <p>Error fetching stock data. Please try again later.</p>
        ) : (
          <>
            {Object.keys(stockData).length > 0 && (
              <>
              <StockTicker stocks={stocks} stockData={stockData} />
                <Header />
                <Routes>
      <Route path="/" element={<HomePage/>} /> {/* Use HomePage for the root path */}
      <Route path="/stock-search" element={<StockSearchPage />} /> {/* Stock search page route */}
    </Routes>

                <FooterComponent/>
              </>
            )}
          </>
        )}
      </div>


      
    </Router>
  );
};

export default App;
