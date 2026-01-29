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
    setTimeframe("1D"); // ✅ reset timeframe on new stock
    setError("");
  };

  return (
    <div className="min-h-screen  bg-gray-950 transition-colors">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Trading Dashboard
          </h1>
        </div>

        {/* Search */}
        <SearchBar onSelect={handleSelectStock} />

        {/* Timeframe selector */}
        <div className="my-6 text-white">
          <TimeFrameSelector
            timeframe={timeframe}
            setTimeframe={setTimeframe}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-center text-red-500 dark:text-red-400 py-4 font-medium">
            {error}
          </p>
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            Loading...
          </p>
        )}

        {/* Stock header + chart */}
        {selectedStock && (
          <>
            <StockHeader symbol={selectedStock} />

            <StockChart
              key={`${selectedStock}-${timeframe}`}
              stock={selectedStock}
              timeframe={timeframe}
              setLoading={setLoading}
              setError={setError}
            />
          </>
        )}

        {/* Watchlist */}
        <Watchlist onSelect={handleSelectStock} />
      </div>
    </div>
  );
}
