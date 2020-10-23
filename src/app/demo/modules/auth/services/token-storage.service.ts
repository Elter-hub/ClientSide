import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router: Router) { }

  signOut() {
    // window.localStorage.clear();
    window.localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['login']).then(window.location.reload)
  }

  public saveToken(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveRefreshToken(refreshToken: string) {
    window.localStorage.removeItem('refreshToken');
    window.localStorage.setItem('refreshToken', refreshToken);
  }
  public getRefreshToken(): string {
    return localStorage.getItem('refreshToken');
}

  public saveUser(user) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
}
