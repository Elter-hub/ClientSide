import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserActionService} from '../../../auth/services/user-action.service';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.css']
})
export class SendMessageFormComponent implements OnInit {
  sendMessageForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private userActionService: UserActionService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.sendMessageForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.userActionService.sendMessage(this.data.email, this.subject.value, this.message.value).subscribe(data => {
      console.log(data);
    })
  }

  get subject() {
    return this.sendMessageForm.get('subject');
  }

  get message() {
    return this.sendMessageForm.get('message');
  }
}
