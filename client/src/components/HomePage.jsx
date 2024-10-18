// src/components/HomePage.jsx
import React from 'react';
import NavigateStockSearch from './NavigateStockSearch';
import MarketAndSectors from './MarketAndSectors';
import Nifty from "./Nifty";


const HomePage = () => {
  return (
    <div>
      <Nifty/>
      <MarketAndSectors />
      <NavigateStockSearch />
    </div>
  );
};

export default HomePage;
