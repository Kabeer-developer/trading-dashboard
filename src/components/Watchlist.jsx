import useWatchlist from "../hooks/useWatchlist";

export default function Watchlist({ onSelect }) {
  const { watchlist, removeStock } = useWatchlist();

  if (watchlist.length === 0) {
    return <p>No stocks in watchlist</p>;
  }

  return (
    <div className="watchlist">
      <h3>⭐ Watchlist</h3>

      {watchlist.map((symbol) => (
        <div key={symbol} className="watchlist-item">
          <span
            onClick={() => onSelect(symbol)}
            style={{ cursor: "pointer" }}
          >
            {symbol}
          </span>

          <button
            onClick={() => removeStock(symbol)}
            aria-label={`Remove ${symbol}`}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
