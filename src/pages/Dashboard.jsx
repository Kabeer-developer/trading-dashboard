import { useState } from "react";
import SearchBar from "../components/SearchBar";
import StockChart from "../components/StockChart";
import TimeFrameSelector from "../components/TimeFrameSelector";
import StockHeader from "../components/StockHeader";
import Watchlist from "../components/Watchlist";

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [timeframe, setTimeframe] = useState("1D");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSelectStock = (symbol) => {
    setSelectedStock(symbol);
    setTimeframe("1D");
    setError("");
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-8">

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Trading Dashboard
          </h1>
        </div>

        <div className="mb-6">
          <SearchBar onSelect={handleSelectStock} />
        </div>

        <div className="mb-6">
          <TimeFrameSelector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </div>

        {error && (
          <p className="text-center text-red-500 py-4 font-medium">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-400 py-4">
            Loading...
          </p>
        )}

        {selectedStock && (
          <div className="mb-6">
            <StockHeader symbol={selectedStock} />

            <div className="mt-4">
              <StockChart
                key={`${selectedStock}-${timeframe}`}
                stock={selectedStock}
                timeframe={timeframe}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          </div>
        )}

        <Watchlist onSelect={handleSelectStock} />
      </div>
    </div>
  );
}