import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { getDailyData, getIntradayData } from "../services/stockApi";

export default function StockChart({
  stock,
  timeframe,
  setLoading,
  setError,
}) {
  const chartRef = useRef();

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 400,
    });

    const candleSeries = chart.addSeries("Candlestick");

    const toUnixTime = (timeStr) =>
      Math.floor(new Date(timeStr).getTime() / 1000);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        let rawData;

        if (timeframe.includes("min") || timeframe === "1H") {
          const interval = timeframe === "1H" ? "60min" : timeframe;
          rawData = await getIntradayData(stock, interval);
        } else {
          rawData = await getDailyData(stock);
        }

        if (!rawData) throw new Error("No data");

        const data = Object.entries(rawData)
          .map(([time, d]) => ({
            time: toUnixTime(time),
            open: Number(d["1. open"]),
            high: Number(d["2. high"]),
            low: Number(d["3. low"]),
            close: Number(d["4. close"]),
          }))
          .reverse();

        candleSeries.setData(data);
      } catch (err) {
        console.error(err);
        setError("API limit reached or network error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => chart.remove();
  }, [stock, timeframe]);

  return <div ref={chartRef} />;
}
