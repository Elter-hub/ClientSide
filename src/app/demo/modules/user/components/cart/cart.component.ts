import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {User} from '../../../auth/models/UserModel';
import {Cart} from '../../../content/model/cart';
import {Item} from '../../../content/model/item';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';
import {AddItemToCartService} from '../../../content/services/add-item-to-cart.service';
import {log} from 'util';
import {MatDialog} from '@angular/material/dialog';
import {DialogConfirmEmailComponent} from '../../../shared/dialog-confirm-email/dialog-confirm-email.component';
import {PaymentFormComponent} from '../../../payment/components/payment-form/payment-form.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: User;
  cart: Cart;
  items: Item[];
  quantities: number[];
  sum = 0;

  constructor(private userService: UserService,
              private addItemToCart: AddItemToCartService,
              private cartService: CartService,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log("🥰");
    this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.items = this.user.cart.items;
      this.cart = this.user.cart;
      this.quantities = this.user.cart.quantities;
    });

    for (let i = 0; i < this.items.length; i++) {
      this.sum += this.items[i].price * this.quantities[i];
    }
    this.userService.changeUser(this.user); // fdsfawfe
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(this.user.userEmail, itemId).subscribe(data => {
      this.user.cart = data;
      console.log(data);
      this.userService.changeUser(this.user);
      });
    for (let i = 0; i < this.user.cart.items.length; i++){
      if (this.user.cart.items[i].itemId == itemId){
        this.sum -= this.items[i].price * this.quantities[i];
      }
    }
    this.quantities = this.user.cart.quantities;
  }

  decrease(index: number) {
    this.user.cart.quantities[index]--;
    if (this.user.cart.quantities[index] === 0){
      this.removeFromCart(this.user.cart.items[index].itemId)
    }
    this.quantities = this.user.cart.quantities;
    this.sum -= this.user.cart.items[index].price;
    this.userService.changeUser(this.user);
  }

  increase(index: number) {
    this.user.cart.quantities[index]++;
    this.addItemToCart.addToCart(this.user.userEmail, this.user.cart.items[index].itemId).subscribe(x => console.log(x))
    this.quantities = this.user.cart.quantities;
    this.sum += this.user.cart.items[index].price;
    this.userService.changeUser(this.user);
  }

  showCardForm() {
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      data: { amount: this.sum }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
