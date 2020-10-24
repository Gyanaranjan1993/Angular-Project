import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})


export class RecipeDetailComponent implements OnInit {

  recipe : Recipe = undefined;
  id : number;

  
  constructor(private recipeService:RecipeService,
              private router : Router,
              private activatedRoute :ActivatedRoute) { }

  ngOnInit(): void {

    
    this.activatedRoute.params.subscribe(

      (params :Params) => {this.id = +params['id'],
      this.recipe = this.recipeService.getRecipeById(this.id)}

    );
    


  }

  onAddToShoppingList(recipe: Recipe){

    this.recipeService.addToShoppingList(recipe);
  }

  navigateNewRecipeLink(){

    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }

  deleteRecipe(){

    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipe']);

  }
}
