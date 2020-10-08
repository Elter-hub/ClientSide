import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {log} from 'util';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  emailForm2: FormGroup;
  hide = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
        userEmail: ['', [Validators.required, /*Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)*/]],
      }
    );

  }

  onSubmit(value: any) {
    this.authService.forgotPassword(value.userEmail).subscribe(l => console.log(l));
    value.reset;
  }

  get userEmail() {
    return this.emailForm.get('userEmail');
  }
}
