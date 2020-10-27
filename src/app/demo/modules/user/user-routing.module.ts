import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './components/cart/cart.component';
import {UserMessagesComponent} from './components/user-messages/user-messages.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'messages', component: UserMessagesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
