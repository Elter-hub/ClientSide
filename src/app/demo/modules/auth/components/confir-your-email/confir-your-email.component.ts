import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../../models/User';

@Component({
  selector: 'app-confir-your-email',
  templateUrl: './confir-your-email.component.html',
  styleUrls: ['./confir-your-email.component.css']
})
export class ConfirYourEmailComponent implements OnInit {
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.message = this.data
  }

}
