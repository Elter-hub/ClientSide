import {Component, OnInit} from '@angular/core';
// import {TokenStorageService} from '../modules/auth/services/token-storage.service';
//
// declare var gapi: any;
//
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit*/{
  day = true;

  changeTheme() {
    this.day = !this.day;
  }

}
