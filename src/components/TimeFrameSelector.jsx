const frames = ["1min","30min","1H","1D","5D","1M","6M","1Y"];

export default function TimeFrameSelector({timeframe,setTimeframe}){
    return(
        <div className="timeframes">
            {frames.map((f)=> (
                <button key={f} className={timeframe === f ? "active" : ""} onClick={()=> setTimeframe(f)}>
                    {f}
                </button>
            ))}
        </div>
    )
}