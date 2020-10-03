import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  user: any;

  constructor(private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.user = this.token.getUser()
  }

  show() {
    console.log(this.user);
  }
}
