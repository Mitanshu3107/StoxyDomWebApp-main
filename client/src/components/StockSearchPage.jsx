import React, { Component } from 'react';
import CardSection from './CardSection';
import ChartSection from './ChartSection';
import ForecastSection from './ForecastSection'; // Import the ForecastSection component
import HeaderStocks from './HeaderStocks';

export default class StockSearchPage extends Component {
  constructor() {
    super();
    this.state = {
      symbol: "AAPL", // Default to Apple Inc.
      data: {},
      forecastData: [], // To hold the forecast data
    };
  }

  fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/finance/${this.state.symbol}`);
      const jsonData = await response.json();
      console.log("Fetched data:", jsonData); // Log the fetched data

      if (jsonData.chart && jsonData.chart.result.length > 0) {
        this.setState({ data: jsonData });
      } else {
        console.warn("No data returned for the symbol:", this.state.symbol);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchForecastData = async () => {
    try {
      let response = await fetch(`http://localhost:5001/api/forecast/${this.props.symbol}`);
      const jsonForecastData = await response.json();
      console.log("Fetched forecast data:", jsonForecastData); // Log the fetched forecast data
      this.setState({ forecastData: jsonForecastData });
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  handleSubmit = (selectedSymbol) => {
    this.setState({ symbol: selectedSymbol }, () => {
      this.fetchData();
      this.fetchForecastData(); // Fetch forecast data whenever symbol changes
    });
  };

  componentDidMount() {
    this.fetchData();
    this.fetchForecastData(); // Fetch forecast data on initial load
    this.interval = setInterval(() => {
      this.fetchData();
      this.fetchForecastData(); // Fetch forecast data every 2 seconds
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { data, symbol, forecastData } = this.state;
    console.log('myd', this.state);
    const stockData = data.chart ? data.chart.result[0].meta : {};

    return (
      <div style={styles.backgroundContainer}>
        <div style={styles.backgroundImage} />
        <HeaderStocks handleSubmit={this.handleSubmit} />
        <div style={styles.container}>
          <ChartSection symbol={symbol} />
          <CardSection
            stockName={stockData.longName || "N/A"}
            currentPrice={stockData.regularMarketPrice || "N/A"}
            previousClose={stockData.previousClose || "N/A"}
            exchangeTimezoneName={stockData.exchangeTimezoneName || "N/A"}
            volume={stockData.regularMarketVolume ? stockData.regularMarketVolume.toLocaleString() : "N/A"}
          />
        </div>
        <ForecastSection symbol={symbol} forecastData={forecastData} /> {/* Render ForecastSection below Chart and Card */}
      </div>
    );
  }
}

const styles = {
  backgroundContainer: {
    position: 'relative', // Ensure the container is positioned correctly
    minHeight: '100vh', // Minimum height of the container
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden', // Prevent overflow for the blur effect
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url('https://wallpaperaccess.com/full/2095724.png')`, // Background image URL
    backgroundSize: 'cover', // Cover the entire div
    backgroundPosition: 'center', // Center the image
    filter: 'blur(2px)', // Blur effect
    zIndex: -1, // Send it to the back
  },

  container: {
    display: 'flex',    
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // margin: '20px 0', // Add margin for spacing
    flexWrap: 'wrap', // Ensure it wraps on smaller screens
    borderRadius: '10px', // Optional: Rounded corners
    // padding: '20px', // Optional: Padding inside the container
    position: 'relative', // Keep the content on top
    zIndex: 1, // Ensure content is above the background
  },
};
