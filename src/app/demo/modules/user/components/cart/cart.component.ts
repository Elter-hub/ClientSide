import { Component, OnInit } from '@angular/core';
import {User} from '../../../auth/models/User';
import {Cart} from '../../../content/model/cart';
import {Item} from '../../../content/model/item';
import {UserService} from '../../services/user.service';
import {AddItemToCartService} from '../../../content/services/add-item-to-cart.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentFormComponent} from '../../../payment/components/payment-form/payment-form.component';
import {Router} from '@angular/router';

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
  success = false;

  constructor(private userService: UserService,
              private addItemToCart: AddItemToCartService,
              private router: Router,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.items = this.user.cart.items;
      this.cart = this.user.cart;
      this.quantities = this.user.cart.quantities;
    });

    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].discount > 0){
        this.sum += this.items[i].newPrice * this.quantities[i];
      }else {
        this.sum += this.items[i].price * this.quantities[i];
      }
    }
    this.userService.changeUser(this.user);
  }

  removeFromCart(itemId: number) {
    this.user.cart.items = this.user.cart.items.filter(item => item.itemId != itemId)
    for (let i = 0; i < this.user.cart.items.length; i++){
      if (this.user.cart.items[i].itemId == itemId){
        if (this.user.cart.items[i].discount > 0){
          this.sum -= this.items[i].newPrice * this.quantities[i];
        }else {
          this.sum -= this.items[i].price * this.quantities[i];
        }
      }
    }
    this.quantities = this.user.cart.quantities;
    this.userService.changeUser(this.user);
  }

  decrease(index: number) {
    this.user.cart.quantities[index]--;
    if (this.user.cart.quantities[index] === 0){
      this.removeFromCart(this.user.cart.items[index].itemId)
    }
    this.quantities = this.user.cart.quantities;
    if (this.user.cart.items[index].discount > 0){
      this.sum -= this.user.cart.items[index].newPrice;
    }else {
      this.sum -= this.user.cart.items[index].price;
    }
    this.userService.changeUser(this.user);
  }

  increase(index: number) {
    this.user.cart.quantities[index]++;
    this.quantities = this.user.cart.quantities;
    if (this.user.cart.items[index].discount > 0) {
      this.sum += this.user.cart.items[index].newPrice;
    }else {
      this.sum += this.user.cart.items[index].price;
    }
    this.userService.changeUser(this.user);
  }

  showCardForm() {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
      const dialogRef = this.dialog.open(PaymentFormComponent, {
      data: { amount: this.sum,
              email: this.user.email,
              items: this.user.cart.items,
              quantities: this.user.cart.quantities
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.success = true;
      setTimeout(() => this.router.navigate(['content']).then(window.location.reload), 2000)
    });
  }
}
