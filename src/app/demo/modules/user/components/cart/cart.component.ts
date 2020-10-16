import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {User} from '../../../auth/models/UserModel';
import {Cart} from '../../../content/model/cart';
import {Item} from '../../../content/model/item';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';

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
  index = 0;

  constructor(private userService: UserService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      console.log(user.cart);
      this.user = user;
      this.items = user.cart.items;
      this.cart = user.cart;
      this.quantities = user.cart.quantities;
      this.items?.forEach(sum =>{
        this.sum += sum.price * this.quantities[this.index];
        this.index++;
      })
    });
    this.userService.changeUser(this.user); // fdsfawfe
  }

  removeFromCart(itemId: number) {
    this.cartService.removeFromCart(this.user.userEmail, itemId).subscribe(data => {
      this.user.cart = data;
      console.log(data);
      this.quantities = this.user.cart.quantities;
      this.items.forEach(sum => {
        console.log(sum.price);
        console.log(this.quantities[this.index]);
        this.sum -= sum.price * this.quantities[this.index];
        this.index--;
        this.userService.changeUser(this.user);
      })
    })
  }
}
