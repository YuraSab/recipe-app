import React from 'react';
import RecipeItem from "../RecipeItem/RecipeItem";
import {Recipe} from "../../types/Recipes";
import styles from "./RecipeList.module.css";

type RecipeListProps = {
    filteredRecipes: Recipe[],
    categoryFilters: string[],
    choose?: boolean
};
const RecipeList: React.FC<RecipeListProps> = ({filteredRecipes, categoryFilters, choose = true}) => {

    return (
        <div className={styles.cardList}>
            {
                filteredRecipes.map((recipe) => <RecipeItem recipe={recipe} key={recipe.idMeal} choose={choose}/>)
            }
        </div>
    );
};

export default RecipeList;