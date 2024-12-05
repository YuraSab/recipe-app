import React from 'react';
import {Recipe} from "../../types/Recipes";
import styles from "./RecipeItem.module.css";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { addRecipe } from '../../redux/slices/recipeSlice';
import {ButtonAction} from "../../ui/Buttons/Buttons";

type RecipeItemProps = {
    recipe: Recipe,
    choose?: boolean
};
const RecipeItem: React.FC<RecipeItemProps> = ({recipe, choose = true}) => {

    const dispatch = useDispatch();

    const handleAddToWishlist = () => {
        dispatch(addRecipe(recipe));
    };

    return (
        <div className={styles.card}>
            <Link to={`/recipes/${recipe.idMeal}`}>
                <h2>{recipe.strMeal}</h2>
            </Link>
            <img src={recipe.strMealThumb} alt=""/>
            <p>Категорія: <b>{recipe.strCategory}</b></p>
            <p>Походження: <b>{recipe.strArea}</b></p>
            { choose && <ButtonAction text={"Додати до списку"} action={handleAddToWishlist}/> }

        </div>
    );
};

export default RecipeItem;