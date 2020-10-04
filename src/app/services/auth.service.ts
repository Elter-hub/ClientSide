import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

const AUTH_API = 'http://localhost:8082/api/auth/';

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
    return this.http.post(AUTH_API + 'signin', {
      userName: form.userName,
      password: form.userPassword
    }, httpOptions);
  }

  register(form): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
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
      return this.http.post(AUTH_API + 'confirm',
        {
          requestParam: emailConfirmationToken
        }, httpOptions)
  }
}
