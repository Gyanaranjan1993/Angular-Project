import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStroageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Shopping-Project-Demo';
  loadedFeature = 'recipe';

  constructor (private dataStorageService:DataStroageService,
               private authService:AuthService){}

  ngOnInit():void{
    this.authService.autoLogin();
  }  

  onNavigate(feature:string){

    this.loadedFeature = feature;


  }
}
