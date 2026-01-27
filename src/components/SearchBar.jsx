import { useState,useCallback } from "react";
import { searchStock } from "../services/stockApi";
import { debounce } from "../utils/Debounce";

export default function SearchBar({onSelect}){
    const [query,setQuery] = useState("");
    const [results,setResults]=useState([]);

    const debounceSearch = useCallback(
        debounce(async (value)=> {
           
            if (!value) return setResults([]);
            const data = await searchStock(value);
            console.log("API result:", data);
            setResults(data);
        }),[]
    );

    const handleChange = (e)=> {
        setQuery(e.target.value);
        debounceSearch(e.target.value);
    };

    return(
        <div className="search">
            <input value={query} onChange={handleChange} placeholder="Search stock symbol"></input>
            {results.length > 0 && (<ul className="dropdown">{results.map((s)=> (<li key={s["1. symbol"]} onClick={()=> {
                onSelect(s["1. symbol"]);
                setResults([]);
                setQuery("");
            }}>{s["1. symbol"]}-{s["2. name"]}</li>))} </ul>)}
        </div>
    );
}