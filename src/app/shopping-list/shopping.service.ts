import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {


  //ingredientsChanged = new EventEmitter<Ingredient[]>();
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();



  private ingredients : Ingredient[] = [
    new Ingredient("Apple",5),
    new Ingredient("Tomato",10)
  ];

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());

  }

  addIngredientFromRecipe(ingredients: Ingredient[]) {

    for(let ingredient of ingredients){

      if(this.ingredients.includes(ingredient)){
        console.log('item already present')
      }else{
        this.ingredients.push(ingredient);
      }

    }
  }
  
  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  getIngredientByIndex(index:number):Ingredient{


    return this.ingredients[index];

  }

  updateIngredient(index:number,newIngredient:Ingredient):void{

    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients);

  }

  deleteIngredient(index:number):void{

    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients);

  }

  constructor() { }


}
