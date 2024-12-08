import React, {useLayoutEffect, useState} from 'react';
import styles from "./FilterCard.module.css";
import {recipeService} from "../../services/recipeService";
import {CategoryOfMeal} from "../../types/Recipes";
import {ButtonAction} from "../../ui/Buttons/Buttons";

type FilterCardProps = {
    setCategoryFilters: any,
    setFilterOn: (arg: boolean) => void,
}
const FilterCard: React.FC<FilterCardProps> = ({ setCategoryFilters, setFilterOn }) => {

    const [categories, setCategories] = useState<CategoryOfMeal[]>([]);
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);


    const selectCategoryHandler = (selectedCategory: string) => {
        const isAddedCategory = checkedCategories.find((category) => category === selectedCategory);
        if (isAddedCategory) {
            setCheckedCategories((prev) => {
                return prev.filter((category) => category !== selectedCategory);
            })
        } else {
            setCheckedCategories((prev) => [...prev, selectedCategory]);
        }
    }

    useLayoutEffect(() => {
        const fetchCategories = async () => {
            const mealCategories = await recipeService.fetchAllMealCategories();
            setCategories(mealCategories);
        }
        fetchCategories();
    }, []);


    return (
        <div className={styles.filterLayout}>
            <div className={styles.closeTab} onClick={() => setFilterOn(false)}>&#10006;</div>
            <div className={styles.categoryList}>
                {
                    categories.map((category) => <div className={styles.categoryItem}>
                        <h2>{category.strCategory}</h2>
                        <input
                            type={"checkbox"}
                            value={category.strCategory}
                            onChange={() => selectCategoryHandler(category.strCategory)}
                        />
                    </div>)
                }
            </div>
            <div className={styles.buttonSection}>
                <ButtonAction text={"Застосувати"} action={() => setCategoryFilters(checkedCategories)}/>
            </div>
        </div>
    );
};

export default FilterCard;