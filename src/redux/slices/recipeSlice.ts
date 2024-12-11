import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../types/Recipes';

interface RecipeState {
    selectedRecipes: Recipe[];
    ingredients: { [key: string]: string };
}

const initialState: RecipeState = {
    selectedRecipes: [],
    ingredients: {},
};

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            // Додаємо рецепт до списку
            const isAdded = state.selectedRecipes.find(recipe => recipe.idMeal === action.payload.idMeal);
            if (!isAdded) {
                state.selectedRecipes.push(action.payload);
            }
        },
        removeRecipe: (state, action: PayloadAction<string>) => {
            // Видаляємо рецепт зі списку
            state.selectedRecipes = state.selectedRecipes.filter(
                (recipe) => recipe.idMeal !== action.payload
            );
        },
        aggregateIngredients: (state) => {
            // Присумовуємо інгрідієнти
            const ingredientsMap: { [key: string]: string } = {};

            state.selectedRecipes.forEach((recipe) => {
                for (let i = 1; i <= 20; i++) {
                    const ingredient = recipe[`strIngredient${i}` as keyof Recipe];
                    const measure = recipe[`strMeasure${i}` as keyof Recipe];

                    if (ingredient && ingredient.trim() !== "") {
                        if (ingredientsMap[ingredient]) {
                            ingredientsMap[ingredient] += `, ${measure}`;
                        } else {
                            ingredientsMap[ingredient] = measure || '';
                        }
                    }
                }
            });

            state.ingredients = ingredientsMap;
        },
    },
});

export const { addRecipe, removeRecipe, aggregateIngredients } = recipeSlice.actions;

export default recipeSlice.reducer;