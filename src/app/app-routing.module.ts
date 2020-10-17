import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './demo/modules/auth/components/home/home.component';
import {BoardAdminComponent} from './demo/modules/auth/components/board-admin/board-admin.component';
import {LoginComponent} from './demo/modules/auth/components/login/login.component';
import {RegisterComponent} from './demo/modules/auth/components/register/register.component';
import {BoardModeratorComponent} from './demo/modules/auth/components/board-moderator/board-moderator.component';
import {EmailConfirmationComponent} from './demo/modules/auth/components/email-confirmation/email-confirmation.component';
import {ForgotPasswordComponent} from './demo/modules/auth/components/forgot-password/forgot-password.component';
import {ProfileComponent} from './demo/modules/user/components/profile/profile.component';
import {BoardUserComponent} from './demo/modules/user/components/board-user/board-user.component';
import {ChangePasswordComponent} from './demo/modules/user/components/change-password/change-password.component';
import {UserChangePasswordConfirmationComponent} from './demo/modules/user/components/user-change-password-confirmation/user-change-password-confirmation.component';

const routes: Routes = [
  { path: '', component: HomeComponent, children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'user', component: BoardUserComponent },
      { path: 'mod', component: BoardModeratorComponent },
      { path: 'admin', component: BoardAdminComponent },
      { path: 'confirm', component: EmailConfirmationComponent },
      { path: 'user-change-password', component: UserChangePasswordConfirmationComponent},
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent},
      {path: 'payment', loadChildren: () => import('./demo/modules/payment/payment.module').then(m => m.PaymentModule)},
      {path: 'content', loadChildren: () => import('./demo/modules/content/content.module').then(m => m.ContentModule)},
      {path: 'user', loadChildren: () => import('./demo/modules/user/user.module').then(m => m.UserModule)}
    ]},
  { path: 'home', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
