import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStroageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';




@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnDestroy,OnInit {


  constructor(private dataStorageService:DataStroageService,private recipeService:RecipeService) { }

  ngOnInit(){

    if(this.recipeService.getRecipes.length == 0){
      this.dataStorageService.fetchRecipes();
    }

    
  }
  ngOnDestroy(): void {
    //this.dataStorageService.storeRecipes();

  }



}
