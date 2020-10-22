import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import jwt_decode from 'jwt-decode';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {Tokens} from '../models/Tokens';

const AUTH_API = 'http://localhost:8082/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) { }

  login(form): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signin', {
      email: form.userEmail,
      password: form.userPassword
    }, httpOptions);
  }

  register(form): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signup', {
      userName: form.value.userName,
      email: form.value.userEmail,
      password: form.value.matcher.userPassword,
      age: form.value.userAge,
      userLastName: form.value.userLastName,
      userNickName: form.value.userNickName,
      sex: form.value.userSex
    }, httpOptions);
  }

   refreshToken(){
     return  this.http.post(AUTH_API + 'auth/refresh-token', {
       userEmail: this.tokenStorageService.getUser().userEmail,
       refreshToken: this.tokenStorageService.getRefreshToken(),
       accessToken: this.tokenStorageService.getToken()
     }).pipe( tap((tokens: Tokens) => {
       console.log(tokens);
       this.tokenStorageService.saveToken(tokens.accessToken);
       this.tokenStorageService.saveRefreshToken(tokens.refreshToken);
     }),  catchError(error => {
       console.log(error);
       return throwError(error);
     }));
  }

  confirmEmail(emailConfirmationToken: string) {
    console.log(emailConfirmationToken);
      return this.http.post(AUTH_API + 'auth/confirm',
        {
          emailConfirmationToken: emailConfirmationToken
        }, httpOptions)
  }

  forgotPassword(email: string) {
    console.log(AUTH_API + 'forgot-password');
    return this.http.post(AUTH_API + 'forgot-password', {
      emailForRecoveringPassword: email
    }, httpOptions)
  }

  changePassword(password: string, tokenForRecoveringPassword: string, emailForRecoveringPassword: string){
    return this.http.post(AUTH_API + 'reset-password' , {
      password: password,
      tokenForRecoveringPassword: tokenForRecoveringPassword,
      emailForRecoveringPassword: emailForRecoveringPassword
    }, httpOptions)
  }

}
