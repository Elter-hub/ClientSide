import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const API_URL = 'http://localhost:8082/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  changeImageUrl(imageUrl: string, userEmail: string){
    return this.http.put(API_URL + "user/change-image", {
      imageUrl: imageUrl,
      userEmail: userEmail
    }, httpOptions)
  }

  //Cause it should also validate old password
  userChangePassword(userEmail: string, oldPassword: string, newPassword: string) {
    return this.http.post('http://localhost:8082/user/change-password' , {
      userEmail: userEmail,
      oldPassword: oldPassword,
      newPassword: newPassword
    }, httpOptions)
  }

  userConfirmPasswordChanges(email: string, emailConfirmationToken: string){
    return this.http.post('http://localhost:8082/user/confirm-password', {
      emailForRecoveringPassword: email,
      tokenForRecoveringPassword: emailConfirmationToken
    }, httpOptions)
  }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }
  //
  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }
  //
  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
