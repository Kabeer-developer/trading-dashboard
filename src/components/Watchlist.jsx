import useWatchList from "../hooks/useWatchlist";

export default function Watchlist({onSelect}){
    const {watchlist,removeStock} = useWatchList();

    return(
        <div className="watchlist">
            <h3>watchlist</h3>
            {watchlist.map((s)=> (
                <div key={s}>
                    <span onClick={()=> onSelect(s)}>{s}</span>
                    <button onClick={()=> removeStock(s)}>X</button>
                    </div>
            ))}
        </div>
    );
}