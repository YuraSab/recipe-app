import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import RecipeList from "../RecipeList/RecipeList";
import { aggregateIngredients } from '../../redux/slices/recipeSlice';
import styles from "./WishList.module.css";

const WishList = () => {

    const wishlist = useSelector((state: RootState) => state.recipes.selectedRecipes);
    const ingredients = useSelector((state: RootState) => state.recipes.ingredients);

    const dispatch = useDispatch();

    useEffect(() => {
        // Підраховуємо інгредієнти при кожному оновленні списку бажаних рецептів
        dispatch(aggregateIngredients());
    }, [wishlist, dispatch]);

    console.log("wishlistwishlistwishlist",wishlist);

    return (
        <div>
            <RecipeList filteredRecipes={wishlist} categoryFilters={[]} choose={false}/>

            <div className={styles.ingredientBlock}>
                <h2>Інгредієнти для приготування:</h2>
                <ul>
                    {Object.entries(ingredients).map(([ingredient, measure]) => (
                        <li key={ingredient}>
                            {ingredient}: {measure}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WishList;