import { useState,useEffect } from "react";

export default function useWatchList(){
    const [watchlist,setWatchlist] = useState(()=> {
        return JSON.parse(localStorage.getItem("watchlist")) || [];
    });

    useEffect(()=> {
        localStorage.setItem("watchlist",JSON.stringify(watchlist));
    },[watchlist]);

    const addStock = (symbol)=> {
        if(!watchlist.includes(symbol)) {
            setWatchlist([...watchlist,symbol]);
        }
    }

    const removeStock = (symbol) => {
        setWatchlist(watchlist.filter((s)=> s !== symbol));
    }

    return {watchlist,addStock,removeStock};
}