import { useWatchlist } from "../context/WatchlistContext";

export default function Watchlist({ onSelect }) {
  const { watchlist, removeStock } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8">
        No stocks in watchlist
      </p>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 sm:mt-8 px-2 sm:px-0">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
        ⭐ Watchlist
      </h3>

      <div className="space-y-2">
        {watchlist.map((symbol) => (
          <div
            key={symbol}
            className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700"
          >
            <span
              onClick={() => onSelect(symbol)}
              className="cursor-pointer font-medium text-white hover:underline text-sm sm:text-base"
            >
              {symbol}
            </span>

            <button
              onClick={() => removeStock(symbol)}
              aria-label={`Remove ${symbol}`}
              className="text-red-500 hover:text-red-400 text-lg sm:text-xl"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}