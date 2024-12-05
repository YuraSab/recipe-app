import React, {useLayoutEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Recipe} from "../../types/Recipes";
import {recipeService} from "../../services/recipeService";
import styles from "./ChosenRecipe.module.css";

const ChosenRecipe = () => {

    const [recipe, setRecipe] = useState<Recipe | undefined>();

    const {recipeId} = useParams< {recipeId: string} >();

    useLayoutEffect(() => {
        const fetchRecipeById = async () => {
            if (!recipeId) return;
            const recipeById = await recipeService.fetchMealById(recipeId);
            setRecipe(recipeById);
            console.log(recipeById);
        }
        fetchRecipeById();
    }, [recipeId]);

    if (!recipe) return <div>Loading...</div>

    const embedUrl = recipe.strYoutube
        ? recipe.strYoutube.replace("watch?v=", "embed/")
        : null;

    console.log("ytb",recipe.strYoutube)

    return (
        <div className={styles.card}>
            <h1>{recipe.strMeal}</h1>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            <p>Категорія: <b>{recipe.strCategory}</b></p>
            <p>Походження: <b>{recipe.strArea}</b></p>
            <div className={styles.videoBlock}>
                <iframe
                    // width="560"
                    // height="315"
                    src={embedUrl || undefined}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default ChosenRecipe;