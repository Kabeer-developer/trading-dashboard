import { useState } from "react";
import SearchBar from "../components/SearchBar";
import StockChart from "../components/StockChart";
import TimeFrameSelector from "../components/TimeFrameSelector";
import Watchlist from "../components/Watchlist";

export default function Dashboard() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [timeframe, setTimeframe] = useState("1D");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div >
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Trading Dashboard
            </h1>
            
          </div>

          <SearchBar onSelect={setSelectedStock} />

          <div className="my-6">
            <TimeFrameSelector timeframe={timeframe} setTimeframe={setTimeframe} />
          </div>

          {error && (
            <p className="text-center text-red-500 dark:text-red-400 py-4 font-medium">
              {error}
            </p>
          )}

          {loading && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-4">
              Loading...
            </p>
          )}

          {selectedStock && (
            <div className="my-8">
              <StockChart
                stock={selectedStock}
                timeframe={timeframe}
                setLoading={setLoading}
                setError={setError}
              />
            </div>
          )}

          <Watchlist onSelect={setSelectedStock} />
        </div>
      </div>
    </div>
  );
}