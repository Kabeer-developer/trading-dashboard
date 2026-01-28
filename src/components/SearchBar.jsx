import { useState, useCallback } from "react";
import { searchStock } from "../services/stockApi";
import { debounce } from "../utils/Debounce";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const debounceSearch = useCallback(
    debounce(async (value) => {
      if (!value) return setResults([]);
      const data = await searchStock(value);
      console.log("API result:", data);
      setResults(data);
    }),
    []
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
    debounceSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search stock "
        className="w-full px-4 py-3 text-base text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder-gray-500 transition-all"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {results.map((s) => (
            <li
              key={s["1. symbol"]}
              onClick={() => {
                onSelect(s["1. symbol"]);
                setResults([]);
                setQuery("");
              }}
              className="px-4 py-3 hover:bg-black hover:text-white cursor-pointer transition-colors duration-150 border-b border-gray-100 last:border-b-0"
            >
              <span className="font-semibold">{s["1. symbol"]}</span>
              <span className="mx-2">-</span>
              <span className="text-gray-600 hover:text-gray-300">{s["2. name"]}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}