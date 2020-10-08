import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './demo/app/app.component';
import { LoginComponent } from './demo/modules/auth/components/login/login.component';
import { RegisterComponent } from './demo/modules/auth/components/register/register.component';
import { HomeComponent } from './demo/modules/auth/components/home/home.component';
import { ProfileComponent } from './demo/modules/auth/components/profile/profile.component';
import { BoardAdminComponent } from './demo/modules/auth/components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './demo/modules/auth/components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './demo/modules/auth/components/board-user/board-user.component';
import { ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EmailConfirmationComponent } from './demo/modules/auth/components/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './demo/modules/auth/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './demo/modules/auth/components/change-password/change-password.component';
import { LoadingSpinnerComponent } from './demo/modules/shared/loading-spinner/loading-spinner.component';
import {SocialLoginModule} from 'angularx-social-login';
import {AuthInterceptorService} from './auth-interceptor.service';
import {UserConfirmPasswordChangeComponent} from './demo/modules/auth/components/user-confirm-password-change/user-confirm-password-change.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    EmailConfirmationComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    LoadingSpinnerComponent,
    UserConfirmPasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SocialLoginModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
