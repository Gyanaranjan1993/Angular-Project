import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{

  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef:ElementRef;
  @ViewChild('f') slForm : NgForm;

  startedEditingSubscription : Subscription;
  editMode : boolean = false;
  editedItemIndex : number = 0;
  editedItem : Ingredient;

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {

    this.startedEditingSubscription= this.shoppingService.startedEditing.subscribe((index:number)=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingService.getIngredientByIndex(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      });

    });
  }

  ngOnDestroy(): void {
    this.startedEditingSubscription.unsubscribe();
  }


  addShoopingItem(){

    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    this.shoppingService.addIngredient(new Ingredient(ingName,ingAmount));
    

  }

  onAddItem(form:NgForm){
    const value = form.value;

    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,new Ingredient(value.name,value.amount));
      this.editMode = false;
    }else{
      this.shoppingService.addIngredient(new Ingredient(value.name,value.amount));
    }
    form.reset();

  }

  onClear():void{
    this.slForm.reset();
    this.editMode = false;

  }

  onDelete():void{

    this.shoppingService.deleteIngredient(this.editedItemIndex);
    this.slForm.reset();
    this.editMode=false;


  }

}
