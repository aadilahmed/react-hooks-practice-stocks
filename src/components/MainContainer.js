import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([]);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tech");
  const [isChecked, setChecked] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  function handleAddToPortfolio(newStock) {
    setPortfolioStocks([...portfolioStocks, newStock]);
  }

  function handleDeleteFromPortfolio(deletedStock) {
    const updatedPortfolio = portfolioStocks.filter(
      (stock) => stock.id !== deletedStock.id
    );
    setPortfolioStocks(updatedPortfolio);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSortChange(sortBy) {
    setChecked(sortBy);
  }

  const stocksToDisplay = stocks.filter((stock) => {
    return stock.type === selectedCategory;
  });

  if (isChecked === "Alphabetically") {
    stocksToDisplay.sort((a, b) =>
      a.ticker > b.ticker ? 1 : b.ticker > a.ticker ? -1 : 0
    );
  } else if (isChecked === "Price") {
    stocksToDisplay.sort((a, b) =>
      a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
  }

  return (
    <div>
      <SearchBar
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
        isChecked={isChecked}
        onSortChange={handleSortChange}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer
            stocks={stocksToDisplay}
            onAddStock={handleAddToPortfolio}
          />
        </div>
        <div className="col-4">
          <PortfolioContainer
            stocks={portfolioStocks}
            onDeleteStock={handleDeleteFromPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
