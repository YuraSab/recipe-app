import React from 'react';
import Recipes from "./pages/Recipes/Recipes";
import {Link, Route, Routes} from "react-router-dom";
import Recipe from "./pages/ChosenRecipe/ChosenRecipe";
import "./App.css";
import ChosenRecipes from "./pages/ChosenRecipes/ChosenRecipes";
import WishList from "./components/WishList/WishList";

const App = () => {

  return (
        <div>
            <header>
                <nav>
                    <Link to={"/recipes"}>Рецепти</Link>
                    <Link to={"/recipes/chosen"}>Обрані рецепти</Link>
                </nav>
            </header>
            {/*<Recipes/>*/}
            <Routes>
                <Route path={"/recipes"} element={<Recipes/>}/>
                <Route path={"/"} element={<Recipes/>}/>
                {/*<Route path={"*"} element={<Recipes/>}/>*/}
                <Route path={`/recipes/:recipeId`} element={<Recipe/>}/>
                {/*<Route path={`/recipes/chosen`} element={<ChosenRecipes/>}/>*/}
                <Route path={`/recipes/chosen`} element={<WishList/>}/>
            </Routes>
        </div>
    );
};

export default App;