import { useState, useEffect } from "react";

export default function useWatchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addStock = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeStock = (symbol) => {
    setWatchlist(watchlist.filter((s) => s !== symbol));
  };

  const isInWatchlist = (symbol) => watchlist.includes(symbol);

  return { watchlist, addStock, removeStock, isInWatchlist };
}
