import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

const AUTH_API = 'http://localhost:8082/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,
              private activatedRoute: ActivatedRoute) { }

  login(form): Observable<any> {
    console.log(form);
    console.log(form.userEmail);
    console.log(form.userPassword);
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
    console.log(AUTH_API + 'reset-password');
    console.log('password ' + password);
    console.log('token ' + tokenForRecoveringPassword);
    return this.http.post(AUTH_API + 'reset-password' , {
      password: password,
      tokenForRecoveringPassword: tokenForRecoveringPassword,
      emailForRecoveringPassword: emailForRecoveringPassword
    }, httpOptions)
  }
}
