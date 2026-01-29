import { useWatchlist } from "../context/WatchlistContext";


export default function StockHeader({ symbol }) {
  const { addStock, removeStock, isInWatchlist } = useWatchlist();

  const added = isInWatchlist(symbol);

  return (
    <div className="flex items-center justify-between mb-3 px-2">
      <h2 className="text-xl font-semibold text-white">
        {symbol}
      </h2>

      <button
        onClick={() =>
          added ? removeStock(symbol) : addStock(symbol)
        }
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm
          ${
            added
              ? "bg-green-600 text-white"
              : "bg-black text-white hover:bg-gray-800"
          }`}
      >
        {added ? "✓ In Watchlist" : "+ Add to Watchlist"}
      </button>
    </div>
  );
}
