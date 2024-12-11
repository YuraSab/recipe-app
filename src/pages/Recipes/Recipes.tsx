import React, {useEffect, useState} from 'react';
import {recipeService} from "../../services/recipeService";
import RecipeList from "../../components/RecipeList/RecipeList";
import Pagination from "../../components/Pagination/Pagination";
import FilterCard from "../../components/FilterCard/FilterCard";
import {ButtonAction} from "../../ui/Buttons/Buttons";
import styles from "./Recipes.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import {useLocation} from "react-router-dom";

const Recipes = () => {

    const location = useLocation();

    const [recipes, setRecipes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [filterOn, setFilterOn] = useState<boolean>(false);
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);

    const getRecipesForCurrentPage = () => {
        const startIndex = (currentPage - 1) * 20;
        const endIndex = startIndex + 20;
        return filteredRecipes.slice(startIndex, endIndex);
    };

    const handleSearch = async (query: string) => {
        if (!query || query === "") {
            const allTheRecipes = await recipeService.fetchAllTheMeals();
            setRecipes(allTheRecipes);
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
        console.log(categoryFilters);
        let filtered = recipes;
        if (categoryFilters.length > 0) {
            filtered = recipes.filter((recipe) => categoryFilters.includes(recipe.strCategory));
        }
        setFilteredRecipes(filtered);

        const count = Math.ceil(filtered.length / 20);
        setPageNumber(count);

        setCurrentPage(1);
    }, [recipes, categoryFilters]);


    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={styles.mainBlock}>
            <div className={styles.filterPanel}>
                <SearchBar handleSearch={handleSearch}/>
                <ButtonAction text={"Фільртувати"} action={() => setFilterOn((prev) => !prev)} />
            </div>
            { filterOn && <FilterCard setCategoryFilters={setCategoryFilters} setFilterOn={setFilterOn}/> }
            <RecipeList recipes={getRecipesForCurrentPage()} categoryFilters={categoryFilters}/>
            { pageNumber > 0 && filteredRecipes.length > 0 && <Pagination currentPage={currentPage} pageNumber={pageNumber} setCurrentPage={setCurrentPage}/> }
        </div>
    );
};

export default Recipes;