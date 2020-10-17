import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserActionService} from '../../../auth/services/user-action.service';

@Component({
  selector: 'app-user-change-password-confirmation',
  templateUrl: './user-change-password-confirmation.component.html',
  styleUrls: ['./user-change-password-confirmation.component.css']
})
export class UserChangePasswordConfirmationComponent implements OnInit {
  emailConfirmationToken: string;
  email: string;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserActionService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.emailConfirmationToken = params.token;
      this.email = params.email;
    })

    this.userService.userConfirmPasswordChanges(this.email, this.emailConfirmationToken)
      .subscribe(data => console.log(data));

    setTimeout(() => this.router.navigate(['login']), 3000)
  }
}
