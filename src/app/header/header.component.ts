import { Component, Output,EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DataStroageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({

    selector: 'app-header',
    templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit,OnDestroy {

    // @Output() featureSelect = new EventEmitter<string>();

    // onSelectFeature(feature:string){

    //     this.featureSelect.emit(feature);

    // }

    private userSub: Subscription;
    public isAuthenticated : boolean = false;

    constructor(private dataStorageService:DataStroageService,private authService:AuthService){}

    onSaveData(){

        this.dataStorageService.storeRecipes();

    }

    onFetchData(){
        this.dataStorageService.fetchRecipes();
    }

    onLogOut(){
        this.authService.logout();
    }

    ngOnInit(){

        this.userSub = this.authService.user.subscribe((user)=>{

            this.isAuthenticated = !user?false:true;
        })


    }

    ngOnDestroy(){

        this.userSub.unsubscribe();
    }

}