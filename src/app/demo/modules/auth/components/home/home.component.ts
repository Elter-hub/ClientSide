import { Component, OnInit } from '@angular/core';
import {UserActionService} from '../../services/user-action.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay, take, tap} from 'rxjs/operators';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';
import {UserService} from '../../../user/services/user.service';
import {log} from 'util';
import {User} from '../../models/User';
import {PaymentFormComponent} from '../../../payment/components/payment-form/payment-form.component';
import {MatDialog} from '@angular/material/dialog';
import {SendMessageFormComponent} from '../../../user/components/send-message-form/send-message-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  userName: string;
  content: string;
  user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private tokenStorageService: TokenStorageService,
              private userActionService: UserActionService,
              private userService: UserService,
              private dialog: MatDialog,
              private router: Router,
              private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.userName = user.userName;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['']).then(r => window.location.reload());
  }

  openDialog() {
    const dialog = this.dialog.open(SendMessageFormComponent, {
      data: {email: this.user.userEmail}
    });
  }
}
