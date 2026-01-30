import { useWatchlist } from "../context/WatchlistContext";

export default function StockHeader({ symbol }) {
  const { addStock, removeStock, isInWatchlist } = useWatchlist();

  const added = isInWatchlist(symbol);

  return (
    <div className="flex items-center justify-between mb-3 px-2 gap-2">
      <h2 className="text-lg sm:text-xl font-semibold text-white">
        {symbol}
      </h2>

      <button
        onClick={() =>
          added ? removeStock(symbol) : addStock(symbol)
        }
        className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm whitespace-nowrap ${
          added
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {added ? "✓ In Watchlist" : "+ Add"}
      </button>
    </div>
  );
}