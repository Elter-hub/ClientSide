import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import {UserService} from '../../../user/services/user.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirYourEmailComponent} from '../confir-your-email/confir-your-email.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loginForm: FormGroup;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private router: Router,
              public dialog: MatDialog,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.minLength(3)]],
      userPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      userInfo => {
        console.log(userInfo);
        if (userInfo.user.isVerified) {
          this.tokenStorage.saveToken(userInfo.accessToken);
          this.tokenStorage.saveRefreshToken(userInfo.refreshToken)
          localStorage.getItem('auth-user') ? this.userService.changeUser(userInfo.user)
            : this.tokenStorage.saveUser(userInfo.user);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          setTimeout(() => {
            this.router.navigate(['user']).then(() => window.location.reload());
          }, 1000);
        }else {
          this.dialog.open(ConfirYourEmailComponent)

        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  get userEmail() {
    return this.loginForm.get('userEmail');
  }
}
