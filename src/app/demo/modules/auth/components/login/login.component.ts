import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/UserModel';
import {UserService} from '../../../user/services/user.service';

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
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, /*Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)*/]],
      userPassword: ['', [Validators.required, /*Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')*/]],
    });

    if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken());
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data);
        console.log(data.accessToken === data.refreshToken);
        console.log(data.accessToken);
        console.log(data.refreshToken);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken)
        localStorage.getItem('auth-user') ? this.userService.changeUser(this.tokenStorage.getUser())
                                              : this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        setTimeout(() => {
          this.router.navigate(['user']).then(() => window.location.reload());
        }, 1000);
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
