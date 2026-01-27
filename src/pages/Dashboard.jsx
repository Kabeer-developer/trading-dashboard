import { useState } from "react";
import SearchBar from "../components/SearchBar";
import StockChart from "../components/StockChart";
import TimeFrameSelector from "../components/TimeFrameSelector";
import Watchlist from "../components/Watchlist";

export default function Dashboard(){
    const [selectedStock,setSelectedStock] = useState(null);
    const [timeframe,setTimeframe] = useState("1D");
    const [loading,setLoading] = useState(false);
    const [error,setError]=useState("");

    return (
        <div className="dashboard">
            <h1>Tradind Dashboard</h1>
            <SearchBar onSelect={setSelectedStock}/>
            <TimeFrameSelector timeframe={timeframe} setTimeframe={setTimeframe}/>
            {error && <p className="error">{error}</p>}

            {selectedStock && (
                <StockChart stock={selectedStock} timeframe={timeframe}
                setLoading={setLoading} setError={setError}/>
            )}
            <Watchlist onSelect={setSelectedStock}/>
        </div>
    )
}