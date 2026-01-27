import axios from "axios";

const API_KEY =import.meta.env.VITE_ALPHA_VANTAGE_KEY

const api = axios.create({
    baseURL : "https://www.alphavantage.co/query",
});

export const searchStock = async(keywords) => {
    const res = await api.get("", {
        params: {
            function: "SYMBOL_SEARCH",
            keywords,
            apikey: API_KEY,
        }
    });
    return res.data.bestMatches || [];
};

export const getDailyData = async(symbol)=> {
    const res = await api.get("", {
        params: {
            function: "TIME_SERIES_DAILY",
            symbol,
            apikey: API_KEY
        }
    });
    return res.data["Time Series (Daily)"];
};

export const getIntradayData = async(interval,symbol)=> {
    const res = await api.get("", {
        params: {
            function : "TIME_SERIES_INTRADAY",
            symbol,
            interval,
            apikey: API_KEY,
        }
    });
    return res.data[`Time Series (${interval})`];
};


