import { Injectable,EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes:Recipe[] = [];


  getRecipes():Recipe[]{

    return this.recipes.slice();

  }

  getRecipeById(id:number) : Recipe{
    return this.recipes[id];
  }

  addToShoppingList(recipe: Recipe) {
    this.shoppingService.addIngredientFromRecipe(recipe.ingredients);
  }
  

  addRecipe(recipe:Recipe){

    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());

  }

  updateRecipe(index:number,newRecipe:Recipe){

    this.recipes[index]= newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }


  deleteRecipe(index:number){

    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());

  }  


  setRecipes(recipes:Recipe[]){

    this.recipes = recipes;
    console.log(this.recipes);
    this.recipeChanged.next(this.recipes.slice());

  }
  constructor(private shoppingService:ShoppingService) { }

  
}
