const TIMEFRAMES = ["1D", "5D", "1M", "6M", "1Y"];

export default function TimeframeSelector({ timeframe, setTimeframe }) {
  return (
    <div className="flex gap-2 justify-center">
      {TIMEFRAMES.map((frame) => (
        <button
          key={frame}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            timeframe === frame
              ? "bg-black text-white"
              : "bg-white text-black border border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => setTimeframe(frame)}
        >
          {frame}
        </button>
      ))}
    </div>
  );
}