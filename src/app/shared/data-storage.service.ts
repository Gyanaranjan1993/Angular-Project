import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class DataStroageService {

    private firebaseUrl: string = 'https://ng-course-recipe-6c24b.firebaseio.com/';
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) {



    }

    storeRecipes() {

        const recipes = this.recipeService.getRecipes();
        this.httpClient.put(`${this.firebaseUrl}recipes.json`, recipes)
            .subscribe((response) => {
                console.log(response)
            });


    }

    fetchRecipes() {

        return this.httpClient.get<Recipe[]>(`${this.firebaseUrl}recipes.json`)
            .pipe(map((recipes) => {
                return recipes.map((recipe) => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            }))
            .subscribe((recipes) => {
                this.recipeService.setRecipes(recipes)
            });

    }
}