import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../model/item';
import {TokenStorageService} from '../../../auth/services/token-storage.service';
import {User} from '../../../auth/models/UserModel';
import {AddItemToCartService} from '../../services/add-item-to-cart.service';
import {Cart} from '../../model/cart';
import {UserService} from '../../../user/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangeItemService} from '../../services/change-item.service';
import {log} from 'util';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  admin: boolean;
  user: User;
  promotion = false;
  soldOut = false;
  newPriceForm: FormGroup;
  @Input() item: Item;
   showForm = false;
   newQuantityForm: FormGroup;
  fill = false;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private changeItemService: ChangeItemService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => this.user  = user)
    this.user.roles.includes("ROLE_ADMIN") ? this.admin = true : this.admin = false;

    this.newPriceForm = this.formBuilder.group({
      newPrice: ['', Validators.required]
    })

    this.newQuantityForm = this.formBuilder.group({
      newQuantity: ['', Validators.required]
    })
  }

  addToCart(item: Item) {
    console.log(item);
    if (this.user.cart.items.includes(item)){
      this.user.cart.quantities[this.user.cart.items.indexOf(item)]++
      this.userService.changeUser(this.user);
    }else {
      this.user.cart.items.push(item);
      this.user.cart.quantities.push(1);
      this.userService.changeUser(this.user);
    }
  }

  promote(item: Item) {
    this.promotion = true;
    this.showForm = true;
  }

  get newPrice() {
    return this.newPriceForm.get('newPrice');
  }


  changePrice(item: Item, newPrice: number) {
    this.changeItemService.promote(item, newPrice).subscribe(data => {
      this.item.discount = data.discount
      this.item.newPrice = data.newPrice
      this.showForm = false;
    })
  }

  cancelPromotion(item: Item) {
    this.changeItemService.cancelPromotion(item).subscribe(data =>{
      this.item.price = data.price
      this.item.discount = null;
      this.promotion = false;
    })
  }

  delete(item: Item) {
    this.changeItemService.deleteItem(item).subscribe(data =>
      this.item = data)
  }

  addQuantity(item: Item) {
    this.fill = true;
  }

  get newQuantity() {
    return this.newQuantityForm.get('newQuantity');
  }

  changeQuantity(item: Item, quantity: number) {
    this.changeItemService.changeQuantity(item, quantity).subscribe(data => {
      this.item.quantity = data.quantity
      this.fill = false;
    })
  }
}
