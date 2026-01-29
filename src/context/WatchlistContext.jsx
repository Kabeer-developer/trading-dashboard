import { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addStock = (symbol) => {
    setWatchlist((prev) =>
      prev.includes(symbol) ? prev : [...prev, symbol]
    );
  };

  const removeStock = (symbol) => {
    setWatchlist((prev) => prev.filter((s) => s !== symbol));
  };

  const isInWatchlist = (symbol) => watchlist.includes(symbol);

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addStock, removeStock, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
