import React, {useEffect, useLayoutEffect, useState} from 'react';
import {recipeService} from "../../services/recipeService";
import RecipeList from "../../components/RecipeList/RecipeList";
import Pagination from "../../components/Pagination/Pagination";
import FilterCard from "../../components/FilterCard/FilterCard";
import {ButtonAction} from "../../ui/Buttons/Buttons";
import styles from "./Recipes.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import {useLocation, useNavigate} from "react-router-dom";

export type UpdateURLFunction = (newParams: Record<string, string | null>) => void;

const Recipes = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState<any[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [filterOn, setFilterOn] = useState<boolean>(false);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);
    const [pageLinkValue, setPageLinkValue] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);


    const updateURL = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(location.search);
        for (const key in newParams) {
            if (newParams[key]) {
                params.set(key, newParams[key]!);
            } else {
                params.delete(key);
            }
        }
        navigate(`?${params.toString()}`);
    }

    const getRecipesForCurrentPage = () => {
        const startIndex = (pageLinkValue - 1) * 20;
        const endIndex = startIndex + 20;
        return recipes.slice(startIndex, endIndex);
    };

    const handleSearch = async (query: string) => {
        if (!query || query === "") {
            await fetchMeals();
        } else {
            try {
                setIsLoading(true);
                const searchRecipes = await recipeService.fetchMealsBySearch(query);
                setRecipes(searchRecipes || []);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsLoading(false);
            }
        }
    }

    const fetchMeals = async () => {
        try {
            const allMeals = await recipeService.fetchAllTheMeals();
            setRecipes(allMeals);
        } catch (error) {
            console.error("Failed to fetch recipes");
        } finally {
            setIsLoading(false);
        }
    }

    useLayoutEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParams = params.get("search") || "";
        const pageParams = parseInt(params.get("page") || "1");
        setPageLinkValue(pageParams);
        console.log("URLSearchParams:", "1)", searchParams, "2)",pageParams);
    }, [location.search]);

    useEffect(() => {
        const fetchFiltersFromURL = () => {
            const params = new URLSearchParams(location.search);
            const filters = params.get("filters") ? params.get("filters")!.split(",") : [];
            if (filters.length > 0) {
                setCheckedCategories(filters);
                setCategoryFilters(filters);
            }
        }
        fetchFiltersFromURL();
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParams = params.get("search");
        if (searchParams) {
            handleSearch(searchParams);
        } else {
            fetchMeals();
        }
    }, []);

    useEffect(() => {
        const filtered = recipes.filter((recipe) => categoryFilters.includes(recipe.strCategory));
        const count = Math.ceil(filtered.length / 20);
        setPageLinkValue(1);
        setPageNumber(count);
    }, [recipes, categoryFilters]);


    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={styles.mainBlock}>
            <div className={styles.filterPanel}>
                <SearchBar handleSearch={handleSearch} updateURL={updateURL}/>
                <ButtonAction text={"Фільртувати"} action={() => setFilterOn((prev) => !prev)} />
            </div>
            { filterOn && <FilterCard setCategoryFilters={setCategoryFilters} setFilterOn={setFilterOn} checkedCategories={checkedCategories} setCheckedCategories={setCheckedCategories}  updateURL={updateURL}/> }
            <RecipeList recipes={getRecipesForCurrentPage()} categoryFilters={categoryFilters}/>
            { pageNumber > 1 && <Pagination currentPage={pageLinkValue} pageNumber={pageNumber} setCurrentPage={setPageLinkValue} updateURL={updateURL}/> }
        </div>
    );
};

export default Recipes;