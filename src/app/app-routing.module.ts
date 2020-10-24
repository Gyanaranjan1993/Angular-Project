import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  {path:'recipe',loadChildren:()=>import ('./recipes/recipes.module').then(m => m.RecipesModule)},
  {path:'shopping',loadChildren:()=>import('./shopping-list/shopping-module').then(m=>m.ShoppingModule)},
  {path:'auth',loadChildren:()=>import('./auth/auth.module').then(m=>(m.AuthModule))}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]

})
export class AppRoutingModule { }