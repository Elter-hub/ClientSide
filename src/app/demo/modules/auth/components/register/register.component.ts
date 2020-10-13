import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = false;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registrationForm: FormGroup;
  selected = '';
  showSpinner = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
      userLastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+"),Validators.minLength(3)]],
      userNickName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]], // \. \\.?? TODO
      matcher: this.formBuilder.group({
        userPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
        userConfirmPassword: ['', ]
      }, {
        validator: ConfirmedValidator('userPassword', 'userConfirmPassword')
      }),
      userAge: ['', [Validators.min(18), Validators.required]],
      userSex: [this.selected, Validators.required]
    })
  }

  onSubmit(): void {
    this.showSpinner = true;
    this.authService.register(this.registrationForm).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSpinner = false;
        setTimeout(() => this.router.navigate(['']), 3000)
      },
      err => {
        this.showSpinner = false;
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(err)
      }
    );
  }

  // Getters for form
  // Getters for form
  // Getters for form
  get userName() {
    return this.registrationForm.get('userName');
  }
  get userLastName() {
    return this.registrationForm.get('userLastName');
  }
  get userNickName() {
    return this.registrationForm.get('userNickName');
  }
  get userEmail() {
    return this.registrationForm.get('userEmail');
  }

  get userPassword() {
    return this.registrationForm.get('matcher').get('userPassword');
  }
  get userConfirmPassword() {
    return this.registrationForm.get('matcher').get('userConfirmPassword');
  }
  get userAge() {
    return this.registrationForm.get('userAge');
  }
  get userSex() {
    return this.registrationForm.get('userSex');
  }
}
