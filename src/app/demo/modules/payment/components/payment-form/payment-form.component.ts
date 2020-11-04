import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder,  FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../../../user/services/user.service';
import {User} from '../../../auth/models/UserModel';
import {Item} from '../../../content/model/item';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  cardForm: FormGroup;
  user: User;
  constructor(private http: HttpClient,
              private formBuilder: FormBuilder,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.cardForm = this.formBuilder.group({
      cardNumber: ['', [Validators.required]],
      cardExpMonth: ['', [Validators.required]],
      cardExpYear: ['', [Validators.required]],
      cardCvc: ['', [Validators.required]],
    });
  }

  chargeCreditCard() {
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber.value,
      exp_month: this.cardExpMonth.value,
      exp_year: this.cardExpYear.value,
      cvc: this.cardCvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token, this.data.email, this.data.items, this.data.quantities);
      } else {
        console.log(response.error);
      }
    });
  }

  chargeCard(token: string, email: string, items: Item[], quantities: number[]) {
    const headers = new HttpHeaders({'token': token, 'amount': this.data.amount.toString(),
                                              email: email});
    this.http.post('http://localhost:8082/payment/charge', {
      items: items,
      quantities: quantities
      },
     {headers: headers})
      .subscribe(resp => {
        console.log(resp);
        console.log(items);
        this.userService.currentUser.subscribe(user => this.user = user);
        this.user.cart.items = [];
        this.user.cart.quantities = [];
        this.userService.changeUser(this.user)
      },error => console.log(error))
  }

  get cardNumber() {
    return this.cardForm.get('cardNumber')
  }

  get cardExpMonth() {
    return this.cardForm.get('cardExpMonth')
  }
  get cardExpYear() {
    return this.cardForm.get('cardExpYear')
  }
  get cardCvc() {
    return this.cardForm.get('cardCvc')
  }
}
