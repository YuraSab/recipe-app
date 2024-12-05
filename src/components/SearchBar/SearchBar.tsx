import React, {useEffect, useState} from 'react';
import styles from "./SearchBar.module.css";

type SearchBarProps = {
    handleSearch: (query: string) => void,
}
const SearchBar:React.FC<SearchBarProps> = ({ handleSearch }) => {

    const [query, setQuery] = useState<string>("");

    return (
        <div className={styles.searchContainer}>
            <input
                type={"text"}
                placeholder={"Пошук рецепту"}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
            />
            <button onClick={() => handleSearch(query)}>
                &#x260C;
            </button>
        </div>
    );
};

export default SearchBar;