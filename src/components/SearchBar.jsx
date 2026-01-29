import { useState, useCallback } from "react";
import { searchStock } from "../services/stockApi";
import { debounce } from "../utils/debounce";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debouncedSearch = useCallback(
    debounce(async (value) => {
      if (!value.trim()) return;

      const data = await searchStock(value);
      console.log("API result:", data);

      // ✅ IMPORTANT: ignore empty responses
      if (Array.isArray(data) && data.length > 0) {
        setResults(data);
      }
    }, 600),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // clear only when input is empty
    if (!value.trim()) {
      setResults([]);
      return;
    }

    // optional: reduce API noise
    if (value.length < 2) return;

    debouncedSearch(value);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search stock"
        className="w-full px-4 py-3 border rounded-lg text-white"
      />

      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow">
          {results.map((s) => (
            <li
              key={s["1. symbol"]}
              onClick={() => {
                onSelect(s["1. symbol"]);
                setResults([]);
                setQuery("");
              }}
              className="px-4 py-2 cursor-pointer hover:bg-black hover:text-white"
            >
              <strong>{s["1. symbol"]}</strong> — {s["2. name"]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
