import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Message, Messages} from '../../user/models/Message';

const API_URL = 'http://localhost:5000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserActionService {

  constructor(private http: HttpClient) { }

  changeImageUrl(imageUrl: string, userEmail: string){
    console.log(imageUrl);
    console.log(userEmail);
    return this.http.patch(API_URL + "user/changeImage", {
      newImageUrl: imageUrl,
      email: userEmail
    })
  }

  //Cause it should also validate old password
  userChangePassword(userEmail: string, oldPassword: string, newPassword: string) {
    return this.http.patch(API_URL + 'user/changePassword' , {
      email: userEmail,
      oldPassword: oldPassword,
      newPassword: newPassword
    }, httpOptions)
  }

  userConfirmPasswordChanges(email: string, emailConfirmationToken: string){
    return this.http.post(API_URL + 'auth/', {
      email: email,
      token: emailConfirmationToken
    }, httpOptions)
  }

  getUserMessages(userEmail: string): Observable<Messages> {
    return this.http.get<Messages>(API_URL + 'user/messages', {
      headers: new HttpHeaders({'Email': userEmail})
    });
  }

  sendMessage(userEmail: string, subject: string, message: string): Observable<Messages>{
    return this.http.post<Messages>(API_URL + 'user/send-message', {
      userEmail: userEmail,
      subject: subject,
      message: message
    })
  }

  respondMessage(userEmail: string, subject: string, message: string, messageId: number): Observable<Messages>{
    return this.http.post<Messages>(API_URL + 'user/respond-message', {
      userEmail: userEmail,
      subject: subject,
      message: message,
      messageId: messageId
    })
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

}
