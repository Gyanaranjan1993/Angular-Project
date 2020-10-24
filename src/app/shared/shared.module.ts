import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceHolderDirective } from './plaeholder/placeholder.directive';
import { DropDownDirective } from './drop-down.directive';
import { OnHoverDirective } from './on-hover.directive';
import { CommonModule } from '@angular/common';

@NgModule({

    declarations: [AlertComponent,
        LoadingSpinnerComponent,
        PlaceHolderDirective,
        DropDownDirective,
        OnHoverDirective],
    imports: [CommonModule],
    exports: [AlertComponent, LoadingSpinnerComponent, PlaceHolderDirective, DropDownDirective, OnHoverDirective,
    CommonModule],
    entryComponents:[AlertComponent]
})
export class SharedModule { }