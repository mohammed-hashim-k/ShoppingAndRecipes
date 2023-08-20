import { Component } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients: Observable<{ingredients:Ingredient[]}>;
  private igChangeSub : Subscription;


  constructor(private slService :ShoppingListService, private store : Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {

    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.igChangeSub=this.slService.ingredientsChanged
    // .subscribe(
    //   (ingredients:Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
   }

   onEditItem(index : number){
    this.slService.startedEditing.next(index);
   }

    ngOnDestroy():void{
      //this.igChangeSub.unsubscribe();
    }

  
}
