import React from 'react';
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header/Header";
import Recipes from "./pages/Recipes/Recipes";
import Recipe from "./pages/ChosenRecipe/ChosenRecipe";
import WishList from "./components/WishList/WishList";
import "./App.css";

const App = () => {

  return (
        <div>
            <Header/>
            <Routes>
                <Route path={"/recipes"} element={<Recipes/>}/>
                <Route path={"/"} element={<Recipes/>}/>
                <Route path={`/recipes/:recipeId`} element={<Recipe/>}/>
                <Route path={`/recipes/chosen`} element={<WishList/>}/>
            </Routes>
        </div>
    );
};

export default App;