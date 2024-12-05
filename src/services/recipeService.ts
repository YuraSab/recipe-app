import axios from "axios";

class RecipeService {
    API_URL = "https://www.themealdb.com/api/json/v1/1";

    async fetchMealByFirstLetter(letter: string = "a") {
        try {
            const response = await axios.get(`${this.API_URL}/search.php?f=${letter}`);
            return response.data.meals || [];
        } catch (error) {
            console.error(`Problem during fetching meals by the letter ${letter}: `, error);
            return [];
        }
    }

    async fetchAllTheMeals() {
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const mealPromises = alphabet.map((letter) => this.fetchMealByFirstLetter(letter));
        const mealsArray = await Promise.all(mealPromises);
        return mealsArray.flat();
    }

    async fetchAllMealCategories() {
        try {
            const response = await axios.get(`${this.API_URL}/categories.php`);
            return response.data.categories;
        } catch (error) {
            console.error("Problem during fetching meal categories");
            return [];
        }
    }

    async fetchMealsBySearch(query: string) {
        try {
            const response = await axios.get(`${this.API_URL}/search.php?s=${query}`);
            // return response.data.categories;
            console.log("search response!:", response);
            return response.data.meals;
        } catch (error) {
            console.error("Problem during searching meal word");
            return [];
        }
    }

    async fetchMealById(recipeId: string) {
        try {
            const response = await axios.get(`${this.API_URL}/lookup.php?i=${recipeId}`);
            return response.data.meals[0];
        } catch (error) {
            console.error("Problem during searching meal word");
            return [];
        }
    }
    // www.themealdb.com/api/json/v1/1/lookup.php?i=52772
}

export const recipeService = new RecipeService();