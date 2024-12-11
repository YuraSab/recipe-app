import React, {useState} from 'react';
import styles from "./SearchBar.module.css";
import {UpdateURLFunction} from "../../pages/Recipes/Recipes";

type SearchBarProps = {
    handleSearch: (query: string) => void,
    updateURL: UpdateURLFunction
}
const SearchBar:React.FC<SearchBarProps> = ({ handleSearch, updateURL }) => {

    const [query, setQuery] = useState<string>("");

    const updateSearchQuery = () => {
        updateURL({ search: query, page: "1" });
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
            <button onClick={updateSearchQuery}>&#x260C;</button>
        </div>
    );
};

export default SearchBar;