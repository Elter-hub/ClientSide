import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';

@Component({
  selector: 'app-user-confirm-password-change',
  templateUrl: './user-confirm-password-change.component.html',
  styleUrls: ['./user-confirm-password-change.component.css']
})
export class UserConfirmPasswordChangeComponent implements OnInit {
  passwordChangeForm: FormGroup;
  hide= false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordChangeForm = this.formBuilder.group({
      userPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      userConfirmPassword: ['',]
    }, {
      validator: ConfirmedValidator('userPassword', 'userConfirmPassword')
    })
  }

  get userPassword() {
    return this.passwordChangeForm.get('userPassword');
  }
  get userConfirmPassword() {
    return this.passwordChangeForm.get('userConfirmPassword');
  }

}
