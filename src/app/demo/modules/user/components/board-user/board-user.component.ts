import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';
import {DialogConfirmEmailComponent} from '../../../shared/dialog-confirm-email/dialog-confirm-email.component';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../auth/models/UserModel';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {AuthService} from '../../../auth/services/auth.service';
import {UserActionService} from '../../../auth/services/user-action.service';

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

  constructor(private token: TokenStorageService,
              private authService: AuthService,
              private userService: UserActionService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = this.token.getUser();

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
    this.userService.userChangePassword(this.user.userEmail,
                                        this.form.value.userOldPassword,
                                        this.form.value.userNewPassword)
      .subscribe(data => {
          this.showSpinner = false;
          this.showWarn = false;
          this.showConfirmation = true;
          const dialogRef = this.dialog.open(DialogConfirmEmailComponent);
          dialogRef.afterClosed().subscribe(result => {
            console.log(result);
          });
        },
        error => {
          this.error = error.error.message;
          this.showWarn = true;
          this.showSpinner = false;
        });
  }

  showOptions() {
    this.show = !this.show;
  }

  changeImg() {
    this.showUrlForm = !this.showUrlForm;
  }

  changeImgUrl(form: HTMLFormElement, userEmail: string) {
    this.userService.changeImageUrl(form.url, userEmail).subscribe(data =>{
      this.user.imageUrl = form.url
      this.token.saveUser(this.user);
    });
  }

  confirmPasswordChanges() {
    this.userService.userConfirmPasswordChanges(this.user.userEmail, this.formConfirm.value.confirm)
      .subscribe(data => {
        this.showSuccess = true
        this.formConfirm.reset();
        this.form.reset();
        },
        error1 => {
          console.log(error1);
        }
    )
  }

  showCart() {
    this.user = this.token.getUser();
    console.log(this.user.cart);
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
