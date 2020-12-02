import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  emailConfirmationToken: string;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.emailConfirmationToken = params.token)
    setTimeout(() => this.waitForDatabase().then(() => this.router.navigate(['login'])), 3000);
  }

  private async waitForDatabase() {
    await this.authService.confirmEmail(this.emailConfirmationToken).subscribe(x => console.log(x));
  }
}
