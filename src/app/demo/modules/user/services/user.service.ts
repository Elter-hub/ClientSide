import { Injectable } from '@angular/core';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../auth/models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private tokenStorage: TokenStorageService) { }

  private user = new BehaviorSubject<User>(this.tokenStorage.getUser());

  currentUser = this.user.asObservable();

  changeUser(user: User): void {
    this.user.next(user);
    this.tokenStorage.saveUser(user);
  }
}
