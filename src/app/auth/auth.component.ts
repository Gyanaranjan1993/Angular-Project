import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/plaeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'

})
export class AuthComponent implements OnDestroy{

    isLoginMode: boolean = false;
    isLoading: boolean = false;
    error: string = null;
    @ViewChild(PlaceHolderDirective) alertHost:PlaceHolderDirective;
    private closeSub : Subscription;

    constructor(private authService: AuthService, 
                private router: Router,
                private componentFactoryResolver:ComponentFactoryResolver) { }
    
    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
        
    }


    onSwitchMode() {

        this.isLoginMode = true;

    }



    onSubmit(form: NgForm) {

        const email = form.value.email;
        const pass = form.value.password;
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if (!form.valid) {
            return;
        }

        if (this.isLoginMode) {

            authObs = this.authService.login(email, pass);

        } else {
            authObs = this.authService.signup(email, pass);

        }

        authObs.subscribe((resData) => {
            console.log(resData)
            if (resData.email) {
                this.error = 'User Added Successfully!';
            }
            this.isLoading = false;
            this.router.navigate(['/recipe']);
        }, errorRes => {

            console.log(errorRes);
            this.error = errorRes;
            this.showErrorAlert(errorRes);
            this.isLoading = false;

        });


        form.reset();
    }

    onHandleClosePopUp() {

        this.error = null;

    }

    private showErrorAlert(message:string){

        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(()=>{

            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

}
