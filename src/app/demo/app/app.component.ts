import {Component, OnInit} from '@angular/core';

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
  //TODO userGet message
  // user send message to Support
  // promotion when buying 3 items
  //
}
