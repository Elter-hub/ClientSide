import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../model/item';
import {UserService} from '../../../user/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangeItemService} from '../../services/changeItem.service';
import {User} from '../../../auth/models/User';
import {CartManipulationsService} from '../../services/cart-manipulations.service';

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
  visible = true;
  newPriceForm: FormGroup;
  @Input() item: Item;
   showForm = false;
   newQuantityForm: FormGroup;
  fill = false;
  inCart = false;
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private cartService: CartManipulationsService,
              private changeItemService: ChangeItemService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe(user => {
      this.user  = user
    })
    this.user.roles.includes("ROLE_ADMIN") ? this.admin = true : this.admin = false;

    this.newPriceForm = this.formBuilder.group({
      newPrice: ['', Validators.required]
    })

    this.newQuantityForm = this.formBuilder.group({
      newQuantity: ['', Validators.required]
    })
  }

  addToCart(item: Item) {
    this.inCart = true;
    if (!item.count){
      item.count = 0;
    }
    this.cartService.addToCart(this.user.email, item._id, item.count+1, item.price ).subscribe(data => {
      console.log(data);
    }, error => console.log(error))
    if (this.user.cart.products.find(item2 => item2._id === item._id)){
      this.user.cart.products.find(item1 => item._id === item1._id).count++
    }else {
      item.count = 1;
      this.user.cart.products.push(item);
    }
    this.userService.changeUser(this.user);

    setTimeout(() => {
      this.inCart = false
    }, 500)
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
    this.visible =false;
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
