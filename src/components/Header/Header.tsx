import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
            <nav>
                <Link to={"/recipes"}>Рецепти</Link>
                <Link to={"/recipes/chosen"}>Обрані рецепти</Link>
            </nav>
        </header>
    );
};

export default Header;