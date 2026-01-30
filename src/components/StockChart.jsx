import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import { getDailyData } from "../services/stockApi";

export default function StockChart({
  stock,
  timeframe,
  setLoading,
  setError,
}) {
  const chartRef = useRef(null);
  const retryRef = useRef(false);

  useEffect(() => {
    if (!chartRef.current || !stock) return;

    retryRef.current = false; 

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: "#111" },
        textColor: "#fff",
      },
      grid: {
        vertLines: { color: "#222" },
        horzLines: { color: "#222" },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    const toUnixTime = (dateStr) =>
      Math.floor(new Date(dateStr).getTime() / 1000);

    const sliceByTimeframe = (data, timeframe) => {
      const map = {
        "5D": 5,
        "1M": 30,
        "6M": 180,
        "1Y": 365,
      };
      return map[timeframe] ? data.slice(-map[timeframe]) : data;
    };

    const isValidOHLC = (data) => {
      if (!data || typeof data !== "object") return false;
      const firstKey = Object.keys(data)[0];
      if (!firstKey) return false;
      const candle = data[firstKey];
      return (
        candle &&
        candle["1. open"] &&
        candle["2. high"] &&
        candle["3. low"] &&
        candle["4. close"]
      );
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const rawData = await getDailyData(stock);

        if (!isValidOHLC(rawData)) {
          if (!retryRef.current) {
            retryRef.current = true;
            setTimeout(fetchData, 800); 
            return;
          } else {
            setError("Data temporarily unavailable. Try again.");
            return;
          }
        }

        let formattedData = Object.entries(rawData)
          .map(([date, d]) => ({
            time: toUnixTime(date),
            open: Number(d["1. open"]),
            high: Number(d["2. high"]),
            low: Number(d["3. low"]),
            close: Number(d["4. close"]),
          }))
          .reverse();

        formattedData = sliceByTimeframe(formattedData, timeframe);
        candleSeries.setData(formattedData);
      } catch (err) {
        console.error("Chart error:", err);
        setError("Failed to load chart data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => chart.remove();
  }, [stock, timeframe]);

  return (
    <div
      ref={chartRef}
      className="w-full   rounded-lg   shadow-lg"
    />
  );
}
