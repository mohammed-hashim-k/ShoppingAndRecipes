
import { Recipe } from './recipe.model';
import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
export class RecipeService{
    recipeSelected = new EventEmitter<Recipe>(); // event emitter for recipe selected
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is simply a test',
            'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
            [new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)]
        ),
        new Recipe('Another Test Recipe'
            , 'This is simply a test'
            , 'https://www.cookingclassy.com/wp-content/uploads/2019/09/meatballs-21.jpg',
            [new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)]
        )

    ];
    getRecipes() {
        // return a copy of the array
        return this.recipes.slice();
    }
}