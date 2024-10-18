import React from "react";
import { useNavigate } from "react-router-dom";
import "../cssForComponents/NavigateStockSearch.css";

const NavigateStockSearch = () => {
  const navigate = useNavigate();

  // Function to navigate to the stock search page
  const handleNavigate = () => {
    navigate("/stock-search");
  };

  return (
    <div className="navigate-stock-search">
      {/* Navigation Section */}
      <div className="navigate-container">
        <h2 className="navigate-title">Explore the Stock Market</h2>
        <p className="navigate-subtitle">Unlock your investment potential</p>
        <button className="navigate-button" onClick={handleNavigate}>
          Go To Market
        </button>
      </div>

      {/* Ads Section */}
      <div className="ads-section">
        <div className="ads-container">
          <div className="ad ad-1">
            
            <p className="ad-title">Cryptocurrency</p>
            <p className="ad-description">
              Cryptocurrencies are digital assets that use cryptography for secure financial transactions and are decentralized, operating on blockchain technology.
            </p>
          </div>
          <div className="ad ad-2">
            
            <p className="ad-title">Stocks</p>
            <p className="ad-description">
              Stocks represent ownership in a company, allowing you to participate in its growth and earn dividends, making them a powerful investment vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="info-section">
        <h3 className="section-title">Why Invest in the Stock Market?</h3>
        <p className="info-text">
          The stock market offers an opportunity to grow your wealth over time. By investing in stocks, you can potentially benefit from capital gains and dividends. Whether you’re a beginner or an experienced investor, our platform provides you with the tools and resources to make informed decisions.
        </p>
        <p className="info-text">
          Stay updated with the latest stock market news, trends, and insights. We offer educational resources, expert analyses, and a vibrant community of investors to support you on your investment journey.
        </p>
      </div>
    </div>
  );
};

export default NavigateStockSearch;
