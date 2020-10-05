import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../confirmed.validator';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  hide =  false;
  tokenForRecoveringPassword: string;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(  ): void {
    this.passwordForm = this.formBuilder.group({
      userPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      userConfirmNewPassword: ['', ]
    }, {
      validator: ConfirmedValidator('userPassword', 'userConfirmNewPassword')
    })
  }

  get newPassword() {
    return this.passwordForm.get('userPassword')
  }

  get userConfirmNewPassword() {
    return this.passwordForm.get('userConfirmNewPassword')
  }


  onSubmit(value: any) {
    console.log(value.userPassword);
    this.activatedRoute.queryParams.subscribe(params => this.tokenForRecoveringPassword = params.token)
    console.log(this.tokenForRecoveringPassword);
    this.authService.changePassword(value.userPassword, this.tokenForRecoveringPassword).subscribe(x => console.log(x))
  }
}
