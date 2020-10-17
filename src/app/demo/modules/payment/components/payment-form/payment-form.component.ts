import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {log} from 'util';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UserService} from '../../../user/services/user.service';
import {User} from '../../../auth/models/UserModel';

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
    let form = document.getElementsByTagName("form")[0];
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber.value,
      exp_month: form.cardExpMonth.value,
      exp_year: form.cardExpYear.value,
      cvc: form.cardCvc.value
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        this.chargeCard(token);
      } else {
        console.log(response.error);
      }
    });
  }

  chargeCard(token: string) {
    const headers = new HttpHeaders({'token': token, 'amount': this.data.amount.toString()});
    this.http.post('http://localhost:8082/payment/charge', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
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
