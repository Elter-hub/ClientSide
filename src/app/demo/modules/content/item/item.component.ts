import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../model/item';
import {TokenStorageService} from '../../auth/services/token-storage.service';
import {User} from '../../auth/models/UserModel';
import {AddItemToCartService} from '../services/add-item-to-cart.service';
import {Cart} from '../model/cart';
import {UserService} from '../../user/services/user.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  user: User;
  @Input() item: Item;
  constructor(private userService: UserService,
              private addItemToCart: AddItemToCartService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.user  = user)
  }

  addToCart() {
    this.addItemToCart.addToCart(this.user.userEmail, this.item.itemId).subscribe(
      data => {
        console.log(data);
        this.user.cart = data;
        console.log(this.user.cart);

        this.userService.changeUser(this.user);
    },
      error => console.log(error))
  }
}
