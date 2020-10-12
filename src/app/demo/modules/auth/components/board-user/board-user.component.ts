import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmedValidator} from '../../../../app/helpers/confirmed.validator';
import {User} from '../../models/UserModel';
import {AuthService} from '../../services/auth.service';
import {log} from 'util';
import {DialogConfirmEmailComponent} from '../../../shared/dialog-confirm-email/dialog-confirm-email.component';
import {MatDialog} from '@angular/material/dialog';

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

  constructor(private token: TokenStorageService,
              private authService: AuthService,
              private userService: UserService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.user = this.token.getUser();

    this.form = this.formBuilder.group({
      userOldPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')]],
    });

    this.changeImageUrlForm = this.formBuilder.group({
      url: ['', [Validators.required, Validators.pattern('^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-\\.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$')]]
    })
  }

  onSubmit() {
    this.showSpinner = true;
    this.authService.userChangePassword(this.user.userEmail, this.form.value.userOldPassword)
      .subscribe(data => {
          this.showSpinner = false;
          this.showWarn = false;
          const dialogRef = this.dialog.open(DialogConfirmEmailComponent, {
            // height: '400px',
            // width: '600px',
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        },
        error => {
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

  get userOldPassword() {
    return this.form.get('userOldPassword');
  }

  get userEmail() {
    return this.form.get('userEmail');
  }

  public get url() {
    return this.changeImageUrlForm.get('url');
  }


}
