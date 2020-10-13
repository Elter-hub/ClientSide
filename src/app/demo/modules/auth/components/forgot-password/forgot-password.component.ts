import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {log} from 'util';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';
import {DialogConfirmEmailComponent} from '../../../shared/dialog-confirm-email/dialog-confirm-email.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  hide = false;
  emailDoesntExist = false;
  showSpinner = false;
  tokenExist = false;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
        userEmail: ['', [Validators.required]], //TODO fix regex
      }
    );
  }

  onSubmit(value: any) {
    this.showSpinner = true;
    this.authService.forgotPassword(value.userEmail).subscribe(data => {
      this.showSpinner = false;
      this.openDialog();
      },
      error => {
        if (error.error.message.startsWith('Email')){
          this.emailDoesntExist = true;
        }else {
          this.tokenExist = true;
        }
        this.showSpinner = false;
      });
    setTimeout(() => {
      this.tokenExist = false;
      this.emailDoesntExist = false;
    }, 3000)
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogConfirmEmailComponent, {
      // height: '400px',
      // width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: Dialog is closed and redirect to home page`);
    });
  }

  get userEmail() {
    return this.emailForm.get('userEmail');
  }

}
