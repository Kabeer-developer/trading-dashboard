const TIMEFRAMES = ["1D", "5D", "1M", "6M", "1Y"];

export default function TimeframeSelector({ timeframe, setTimeframe }) {
  return (
    <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
      {TIMEFRAMES.map((frame) => (
        <button
          key={frame}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base ${
            timeframe === frame
              ? "bg-white text-black"
              : "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
          }`}
          onClick={() => setTimeframe(frame)}
        >
          {frame}
        </button>
      ))}
    </div>
  );
}