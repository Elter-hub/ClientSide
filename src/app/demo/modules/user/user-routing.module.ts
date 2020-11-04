import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './components/cart/cart.component';
import {WebSocketComponent} from './components/web-socket/web-socket.component';

const routes: Routes = [
  {path: 'cart', component: CartComponent},
  {path: 'chat', component: WebSocketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
