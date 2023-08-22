import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { RecipeService } from './recipe.service';
import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import * as RecipesActions from '../recipes/store/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<fromApp.AppState>, private actions$ : Actions) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    return this.store.select('recipes').pipe(
        take(1),
        map(recipesState =>{
            return recipesState.recipes;
        }),
        switchMap(recipes =>{
            if (recipes.length==0){
                this.store.dispatch(new RecipesActions.FetchRecipes());
                return this.actions$.pipe(
                    ofType(RecipesActions.SET_RECIPES),
                    take(1)
                )
            }
            else{
                return of(recipes);
            }
        })
    )

  }
}
