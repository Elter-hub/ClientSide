import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './demo/app/app.component';
import { LoginComponent } from './demo/modules/auth/components/login/login.component';
import { RegisterComponent } from './demo/modules/auth/components/register/register.component';
import { HomeComponent } from './demo/modules/auth/components/home/home.component';
import { BoardAdminComponent } from './demo/modules/auth/components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './demo/modules/auth/components/board-moderator/board-moderator.component';
import { ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { EmailConfirmationComponent } from './demo/modules/auth/components/email-confirmation/email-confirmation.component';
import { ForgotPasswordComponent } from './demo/modules/auth/components/forgot-password/forgot-password.component';
import { LoadingSpinnerComponent } from './demo/modules/shared/loading-spinner/loading-spinner.component';
import {SocialLoginModule} from 'angularx-social-login';
import {AuthInterceptorService} from './auth-interceptor.service';
import { DialogConfirmEmailComponent } from './demo/modules/shared/dialog-confirm-email/dialog-confirm-email.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {UserChangePasswordConfirmationComponent} from './demo/modules/user/components/user-change-password-confirmation/user-change-password-confirmation.component';
import {ChangePasswordComponent} from './demo/modules/user/components/change-password/change-password.component';
import {BoardUserComponent} from './demo/modules/user/components/board-user/board-user.component';
import {ProfileComponent} from './demo/modules/user/components/profile/profile.component';
import { CartComponent } from './demo/modules/user/components/cart/cart.component';
import {PaymentFormComponent} from './demo/modules/payment/components/payment-form/payment-form.component';
import { FooterComponent } from './demo/modules/auth/components/footer/footer.component';
import {AgmCoreModule} from '@agm/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

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
    DialogConfirmEmailComponent,
    UserChangePasswordConfirmationComponent,
    CartComponent,
    FooterComponent,
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
    SocialLoginModule,
    MatDialogModule,
    MatGridListModule,
    MatDividerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYW-dAsr-LEyZesO3qzdknFwVTvtaFL3Q'
    }),
    MatSnackBarModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
                {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  entryComponents: [DialogConfirmEmailComponent, PaymentFormComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
