import { Injectable } from '@angular/core';
import {HttpClient,  HttpHeaders,  } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import jwt_decode  from 'jwt-decode';
import {catchError, tap} from 'rxjs/operators';
import {Tokens} from '../models/Tokens';

const AUTH_API = 'http://localhost:5000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router: Router,
              private tokenStorageService: TokenStorageService) { }

  login(form): Observable<any> {
    return this.http.post(AUTH_API + 'auth/login', {
      email: form.userEmail,
      password: form.userPassword
    }, httpOptions);
  }

  register(form): Observable<any> {
    return this.http.post(AUTH_API + 'auth/signup', {
      username: form.value.username,
      email: form.value.userEmail,
      password: form.value.matcher.userPassword,
    }, httpOptions);
  }

  refreshToken(){
    return this.http.post(AUTH_API + 'auth/refreshTokens', {
      email: this.tokenStorageService.getUser().userEmail,
      refreshToken: this.tokenStorageService.getRefreshToken(),
      accessToken: this.tokenStorageService.getToken()
    }).pipe(tap((tokens: Tokens) => {
      console.log(tokens);
      this.tokenStorageService.saveToken(tokens.accessToken);
      this.tokenStorageService.saveRefreshToken(tokens.refreshToken);
    }), catchError(error => {
      console.log(error);
      this.tokenStorageService.signOut();
      return throwError(error);
    }))
  }

  confirmEmail(emailConfirmationToken: string) {
    console.log(emailConfirmationToken);
      return this.http.post(AUTH_API + 'auth/confirm',
        {
          emailConfirmationToken: emailConfirmationToken
        }, httpOptions)
  }

  forgotPassword(email: string) {
    return this.http.post(AUTH_API + 'auth/forgotPassword', {
      email: email
    }, httpOptions)
  }

  changePassword(password: string, tokenForRecoveringPassword: string, emailForRecoveringPassword: string){
    return this.http.post(AUTH_API + 'auth/resetPassword' , {
      newPassword: password,
      token: tokenForRecoveringPassword,
      email: emailForRecoveringPassword
    }, httpOptions)
  }

}
