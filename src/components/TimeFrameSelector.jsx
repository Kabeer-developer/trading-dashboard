const TIMEFRAMES = ["1D", "5D", "1M", "6M", "1Y"];


export default function TimeframeSelector({ timeframe, setTimeframe }) {
  return (
    <div className="timeframes">
      {TIMEFRAMES.map((frame) => (
        <button
          key={frame}
          className={timeframe === frame ? "active" : ""}
          onClick={() => setTimeframe(frame)}
        >
          {frame}
        </button>
      ))}
    </div>
  );
}
