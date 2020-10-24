import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[];
  private igChangeSub : Subscription;
  constructor(private shoppingService: ShoppingService) { }


  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.igChangeSub = this.shoppingService.ingredientsChanged.subscribe((ings: Ingredient[]) => { this.ingredients = ings });
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }


  addIngredient(ingredient: Ingredient) {
    this.shoppingService.addIngredient(ingredient);

  }

  onEditItem(i:number){
    this.shoppingService.startedEditing.next(i);
  }


}
