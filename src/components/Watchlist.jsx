import useWatchlist from "../hooks/useWatchlist";

export default function Watchlist({ onSelect }) {
  const { watchlist, removeStock } = useWatchlist();

  if (watchlist.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-8">
        No stocks in watchlist
      </p>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-semibold mb-4 text-black dark:text-white">
        ⭐ Watchlist
      </h3>

      <div className="space-y-2">
        {watchlist.map((symbol) => (
          <div
            key={symbol}
            className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span
              onClick={() => onSelect(symbol)}
              className="cursor-pointer font-medium text-black dark:text-white hover:underline"
            >
              {symbol}
            </span>

            <button
              onClick={() => removeStock(symbol)}
              aria-label={`Remove ${symbol}`}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}