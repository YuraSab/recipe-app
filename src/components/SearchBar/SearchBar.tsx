import React, {useEffect, useLayoutEffect, useState} from 'react';
import styles from "./SearchBar.module.css";
import {UpdateURLFunction} from "../../pages/Recipes/Recipes";
import {useLocation} from "react-router-dom";

type SearchBarProps = {
    handleSearch: (query: string) => void,
    updateURL: UpdateURLFunction
}
const SearchBar:React.FC<SearchBarProps> = ({ handleSearch, updateURL }) => {

    const location = useLocation();

    const [query, setQuery] = useState<string>("");
    const [previousQuery, setPreviousQuery] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            console.log("query", query);
            if (query !== previousQuery) {
                setPreviousQuery(query);
                updateURL({ search: query, page: "1" });
                handleSearch(query);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [query, updateURL, handleSearch]);


    useLayoutEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParams = params.get("search") || "";
        setPreviousQuery(searchParams);
        setQuery(searchParams);
    }, []);

    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuery(event.target.value);
    // }

    return (
        <div className={styles.searchContainer}>
                <input
                    type={"text"}
                    placeholder={"Пошук рецепту"}
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    // onChange={handleInputChange}
                />
        </div>
);
};

export default SearchBar;