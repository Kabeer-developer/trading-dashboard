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

  useEffect(() => {
    if (!chartRef.current || !stock) return;

    // 1️⃣ Create chart
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

    // 2️⃣ Add candlestick series (v4)
    const candleSeries = chart.addSeries(CandlestickSeries);

    // 3️⃣ Convert Alpha Vantage date → UNIX seconds
    const toUnixTime = (dateStr) =>
      Math.floor(new Date(dateStr).getTime() / 1000);

    // 4️⃣ Slice data for timeframe
    const sliceByTimeframe = (data, timeframe) => {
      const map = {
        "5D": 5,
        "1M": 30,
        "6M": 180,
        "1Y": 365,
      };

      return map[timeframe] ? data.slice(-map[timeframe]) : data;
    };

    // 5️⃣ Fetch + render data
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const rawData = await getDailyData(stock);

        if (!rawData || Object.keys(rawData).length === 0) {
          throw new Error("No data returned from API");
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

    // 6️⃣ Cleanup
    return () => {
      chart.remove();
    };
  }, [stock, timeframe]);

  return <div ref={chartRef} />;
}
