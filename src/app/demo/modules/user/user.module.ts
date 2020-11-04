import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {MatCardModule} from '@angular/material/card';
import { SendMessageFormComponent } from './components/send-message-form/send-message-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [SendMessageFormComponent],
  exports: [
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    ScrollingModule,
    FormsModule
  ]
})
export class UserModule { }
