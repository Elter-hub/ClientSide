import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-confirm-email',
  templateUrl: './dialog-confirm-email.component.html',
  styleUrls: ['./dialog-confirm-email.component.css']
})
export class DialogConfirmEmailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  redirect() {
    this.router.navigate(['']);
  }
}
