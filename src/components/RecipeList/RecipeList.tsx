import React from 'react';
import RecipeItem from "../RecipeItem/RecipeItem";
import {Recipe} from "../../types/Recipes";
import styles from "./RecipeList.module.css";

type RecipeListProps = {
    recipes: Recipe[],
    categoryFilters: string[],
};
const RecipeList: React.FC<RecipeListProps> = ({recipes, categoryFilters}) => {

    const filteredRecipes = categoryFilters.length > 0
        ? recipes.filter((recipe) => categoryFilters.includes(recipe.strCategory))
        : recipes;

    if (filteredRecipes.length === 0)
        return <div>No recipes found for selected categories.</div>;

    return (
        <div className={styles.cardList}>
            {
                recipes.map((recipe) => <RecipeItem recipe={recipe} key={recipe.idMeal}/>)
            }
        </div>
    );
};

export default RecipeList;