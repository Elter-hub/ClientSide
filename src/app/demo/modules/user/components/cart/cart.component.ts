import {Component, OnInit} from '@angular/core';
import {User} from '../../../auth/models/User';
import {Cart} from '../../../content/model/cart';
import {Item} from '../../../content/model/item';
import {UserService} from '../../services/user.service';
import {BuyItemsService} from '../../../content/services/buyItems.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentFormComponent} from '../../../payment/components/payment-form/payment-form.component';
import {Router} from '@angular/router';
import {CartManipulationsService} from '../../../content/services/cart-manipulations.service';

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
              private addItemToCart: BuyItemsService,
              private cartService: CartManipulationsService,
              private router: Router,
              private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
      this.items = this.user.cart.products;
      this.cart = this.user.cart;
      this.sum = 0;

      this.user.cart.products.forEach(item => {
        if (item.discount > 0) {
          this.sum += item.count * item.newPrice;
        } else {
          this.sum += item.count * item.price;
        }
      });
    });
    this.userService.changeUser(this.user);
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromCart(this.user.email, item._id, item.count, item.price)
      .subscribe(() => {
          this.user.cart.products = this.user.cart.products.filter(item1 => item1._id != item._id)
          this.userService.changeUser(this.user);
        },
       error => console.log(error));
  }

  decrease(item: Item) {
    console.log(item._id);
    this.user.cart.products.filter(item1 => item1._id == item._id).map(item2 => {
      item2.count--;
      if (item2.count === 0) {
        this.removeFromCart(item);
      }
    });
    this.userService.changeUser(this.user);
  }

  increase(item: Item) {
    this.cartService.addToCart(this.user.email, item._id, item.count + 1, item.price).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
    this.user.cart.products.filter(item1 => item1._id == item._id).map(item => {
      item.count++;
    });
    this.userService.changeUser(this.user);
  }

  showCardForm() {
    this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
    const dialogRef = this.dialog.open(PaymentFormComponent, {
      data: {
        amount: this.sum,
        email: this.user.email,
        items: this.user.cart.products,
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.success = true;
      setTimeout(() => this.router.navigate(['content']).then(window.location.reload), 2000);
    });
  }
}
