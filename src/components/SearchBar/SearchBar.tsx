import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
    handleSearch: (query: string) => void,
}
const SearchBar:React.FC<SearchBarProps> = ({ handleSearch }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const [query, setQuery] = useState<string>("");

    const updateSearchQuery = (value: string = "potato") => {
        const params = new URLSearchParams(location.search);
        if (query && query !== "") {
            params.set("search", query);
        } else {
            params.delete("search");
        }
        const searchParam = params.get("search");
        const linkSearchQuery = location.search.replace("?search=", "");
        if (linkSearchQuery !== searchParam) {
            params.set("search", query);
            navigate(`?search=${query}`);
        }
        handleSearch(query);
    }


    return (
        <div className={styles.searchContainer}>
            <input
                type={"text"}
                placeholder={"Пошук рецепту"}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <button onClick={() =>updateSearchQuery()}>
                &#x260C;
            </button>
        </div>
    );
};

export default SearchBar;