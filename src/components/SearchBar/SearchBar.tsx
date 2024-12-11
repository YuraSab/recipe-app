import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from "./SearchBar.module.css";
import {UpdateURLFunction} from "../../pages/Recipes/Recipes";
import {useLocation} from "react-router-dom";
import {useDebounce} from "../../hooks/UseDebounce";

type SearchBarProps = {
    handleSearch: (query: string) => void,
    updateURL: UpdateURLFunction
}
const SearchBar:React.FC<SearchBarProps> = ({ handleSearch, updateURL }) => {

    const [query, setQuery] = useState<string>("");
    const [previousQuery, setPreviousQuery] = useState<string>("");

    const location = useLocation();
    const debouncedQuery = useDebounce(query, 1500);

    useLayoutEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParams = params.get("search") || "";
        setPreviousQuery(searchParams);
        setQuery(searchParams);
    }, [location.search]);

    useEffect(() => {
        if (query !== previousQuery) {
            setPreviousQuery(query);
            updateURL({ search: query, page: "1" });
            handleSearch(query);
        }
    }, [debouncedQuery, previousQuery, updateURL, handleSearch]);


    return (
        <div className={styles.searchContainer}>
                <input
                    type={"text"}
                    placeholder={"Пошук рецепту"}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
        </div>
);
};

export default SearchBar;