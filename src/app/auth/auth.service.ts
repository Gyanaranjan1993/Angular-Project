import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;


    private signUpUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.fireBaseApiKey;
    private signInUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.fireBaseApiKey;


    constructor(private httpClient: HttpClient, 
                private router: Router) { }


    login(email: string, password: string) {

        return this.httpClient.post<AuthResponseData>(this.signInUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError), tap((resData) => {
                this.handleAuthentication(resData.email, 
                                          resData.localId, 
                                          resData.idToken, 
                                          +resData.expiresIn)
            }));


    }

    signup(email: string, password: string):Observable<AuthResponseData> {

        return this.httpClient.post<AuthResponseData>(this.signUpUrl,

            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));

    }

    logout() : void{
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {

        this.tokenExpirationTimer = setTimeout(() => {
            this.logout()
        }, expirationDuration);
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData', JSON.stringify(user));

    }

    private handleError(errorResponse: HttpErrorResponse) {

        let errorMessage: String = 'An Error';
        console.log(errorResponse.error.error.message);

        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email exists already!';
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email could not be found!';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'Incorrect Password!';
                break;

            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'Too many incorrect login attempts, try again later!';
                break;
        }

        return throwError(errorMessage);
    }


}

export interface AuthResponseData {

    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}