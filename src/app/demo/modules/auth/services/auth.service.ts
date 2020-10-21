import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
import jwt_decode from 'jwt-decode';

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

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) return null;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if(!token) token = this.tokenStorageService.getToken();
    if(!token) return true;

    const date = this.getTokenExpirationDate(token);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  refreshToken(){
    return this.http.post(AUTH_API + 'auth/refresh-token', {
      userEmail: this.tokenStorageService.getUser().userEmail,
      refreshToken: this.tokenStorageService.getRefreshToken()
    })
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
