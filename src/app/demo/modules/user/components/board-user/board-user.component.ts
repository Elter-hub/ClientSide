import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';
import {DialogConfirmEmailComponent} from '../../../shared/dialog-confirm-email/dialog-confirm-email.component';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../auth/models/User';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {AuthService} from '../../../auth/services/auth.service';
import {UserActionService} from '../../../auth/services/user-action.service';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit {
  user: User;
  show = false;
  form: FormGroup;
  hide = false;
  showWarn = false;
  showSpinner = false;
  changeImageUrlForm: FormGroup;
  showUrlForm = false;
  showConfirmation = false;
  formConfirm: FormGroup;
  error: string;
  showSuccess = false;

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private userActionService: UserActionService,
              private userService: UserService,
              private _snackBar: MatSnackBar,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.form = this.formBuilder.group({
      userOldPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      userNewPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
      userConfirmNewPassword: ['',]
    }, {
      validator: ConfirmedValidator('userNewPassword', 'userConfirmNewPassword')
    });

    this.changeImageUrlForm = this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')]]
    })

    this.formConfirm = this.formBuilder.group({
      confirm: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.showSpinner = true;
    this.userActionService.userChangePassword(this.user.email,
                                        this.form.value.userOldPassword,
                                        this.form.value.userNewPassword)
      .subscribe(() => {
          this.showSpinner = false;
          this.showWarn = false;
        this.openSnackBar('Password changed!', null)
        },
        error => {
          this.error = error.error.message;
          this.showWarn = true;
          this.showSpinner = false;
          this.openSnackBar('Failure!', null)
        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  showOptions() {
    this.show = !this.show;
  }

  changeImg() {
    this.showUrlForm = !this.showUrlForm;
  }

  changeImgUrl(form: HTMLFormElement, userEmail: string) {
    console.log(userEmail);
    this.userActionService.changeImageUrl(form.url, userEmail).subscribe(() =>{
      this.user.imageUrl = form.url
      this.tokenStorageService.saveUser(this.user);
    }, error1 => console.log(error1));
  }

  confirmPasswordChanges() {
    this.userActionService.userConfirmPasswordChanges(this.user.email, this.formConfirm.value.confirm)
      .subscribe(() => {
        this.showSuccess = true
        this.formConfirm.reset();
        this.form.reset();
        },
        error1 => {
          console.log(error1);
        }
    )
  }

  get userOldPassword() {
    return this.form.get('userOldPassword');
  }

  get userNewPassword() {
    return this.form.get('userNewPassword');
  }

  get userConfirmNewPassword() {
    return this.form.get('userConfirmNewPassword');
  }

  get userEmail() {
    return this.form.get('userEmail');
  }

  public get url() {
    return this.changeImageUrlForm.get('url');
  }

  public get confirmChanges() {
    return this.formConfirm.get('confirm')
  }
}
