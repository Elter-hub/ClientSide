import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';
import {User} from '../../models/UserModel';
import {AuthService} from '../../services/auth.service';
import {log} from 'util';
import {DialogConfirmEmailComponent} from '../../../shared/dialog-confirm-email/dialog-confirm-email.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  user: User;
  show = false;
  form: FormGroup;
  hide = false;
  showNewPassword = false;

  constructor(private token: TokenStorageService,
              private authService: AuthService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.user = this.token.getUser()

    this.form = this.formBuilder.group({
      userOldPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
    })
  }

  onSubmit() {
    this.authService.userChangePassword(this.user.userEmail, this.form.value.userOldPassword)
      .subscribe(data => console.log(data))
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmEmailComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showOptions() {
    this.show = !this.show;
  }

  get userOldPassword() {
    return this.form.get('userOldPassword');
  }

  get userEmail() {
    return this.form.get('userEmail');
  }
}
