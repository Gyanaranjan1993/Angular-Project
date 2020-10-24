import { Component, OnInit,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import {  } from 'protractor';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes : Recipe[];
  recipeChangedSubscription : Subscription;

  constructor(private recipeService:RecipeService,
              private router : Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

    this.recipes = this.recipeService.getRecipes();
    this.recipeChangedSubscription = this.recipeService.recipeChanged.subscribe((recipes: Recipe[])=>{
        this.recipes = recipes;
    })
  }

  ngOnDestroy():void{
    this.recipeChangedSubscription.unsubscribe();
  }


  navigateNewRecipeLink(){

    this.router.navigate(['new'],{relativeTo:this.activatedRoute});
  }

  

}
